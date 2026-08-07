import { env } from "cloudflare:workers";

// Baidu Netdisk (百度网盘) open-platform client for serving per-lesson
// course transcripts ("文稿") that live in the instructor's own netdisk
// account, without exposing that account's credentials to the browser.
//
// Setup (one-time, done by the netdisk account owner — not automatable from
// here, Baidu requires a human to register the app and grant consent):
//   1. Register an app at https://pan.baidu.com/union/index (individual
//      developers are allowed). Baidu reviews new apps before the netdisk
//      file-access scope goes live — budget for review turnaround.
//   2. Complete the OAuth authorization-code flow once as the account that
//      owns the transcript files, to obtain a refresh_token. This project
//      never runs that flow itself: paste the resulting refresh_token into
//      Worker secrets, it is not something to script around.
//   3. Upload each lesson's transcript into one netdisk folder, named
//      `<lesson code>.<ext>` (e.g. `07.md`, `Bonus 01.pdf`) — the lesson
//      `code` values are defined in course-revit-fast-start-content.ts.
//   4. Set the four env vars below as Worker secrets/vars.
//
// Docs: https://pan.baidu.com/union/doc/ (endpoint shapes below match that
// doc as of writing; Baidu has changed these before, so re-check if calls
// start failing after a Baidu-side change).
const TOKEN_URL = "https://openapi.baidu.com/oauth/2.0/token";
const LIST_URL = "https://pan.baidu.com/rest/2.0/xpan/file";
const META_URL = "https://pan.baidu.com/rest/2.0/xpan/multimedia";

type BaiduBindings = {
  BAIDU_NETDISK_APP_KEY?: string;
  BAIDU_NETDISK_SECRET_KEY?: string;
  BAIDU_NETDISK_REFRESH_TOKEN?: string;
  BAIDU_NETDISK_TRANSCRIPT_DIR?: string;
};

function bindings(): BaiduBindings {
  return env as unknown as BaiduBindings;
}

export function isBaiduNetdiskConfigured() {
  const b = bindings();
  return Boolean(
    b.BAIDU_NETDISK_APP_KEY && b.BAIDU_NETDISK_SECRET_KEY && b.BAIDU_NETDISK_REFRESH_TOKEN,
  );
}

function transcriptDir() {
  return bindings().BAIDU_NETDISK_TRANSCRIPT_DIR || "/apps/baybimai/transcripts";
}

// access_token is valid for 30 days; refresh_token for ~10 years. We just
// refresh on every cold start (and cache for the isolate's lifetime) rather
// than persisting to KV — request volume here is low (course page visits),
// so the extra round trip isn't worth the added moving part yet.
let cachedToken: { value: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now()) return cachedToken.value;

  const b = bindings();
  if (!b.BAIDU_NETDISK_APP_KEY || !b.BAIDU_NETDISK_SECRET_KEY || !b.BAIDU_NETDISK_REFRESH_TOKEN) {
    throw new Error("Baidu Netdisk is not configured.");
  }

  const url = new URL(TOKEN_URL);
  url.searchParams.set("grant_type", "refresh_token");
  url.searchParams.set("refresh_token", b.BAIDU_NETDISK_REFRESH_TOKEN);
  url.searchParams.set("client_id", b.BAIDU_NETDISK_APP_KEY);
  url.searchParams.set("client_secret", b.BAIDU_NETDISK_SECRET_KEY);

  const response = await fetch(url, { method: "GET" });
  const data = (await response.json()) as {
    access_token?: string;
    expires_in?: number;
    error_description?: string;
  };
  if (!response.ok || !data.access_token) {
    throw new Error(`Baidu token refresh failed: ${data.error_description || response.status}`);
  }

  cachedToken = {
    value: data.access_token,
    // Refresh a little early to avoid racing the real expiry.
    expiresAt: Date.now() + Math.max(0, (data.expires_in ?? 0) - 300) * 1000,
  };
  return cachedToken.value;
}

type NetdiskFile = { fs_id: number; server_filename: string; isdir: 0 | 1 };

// Lists the transcript folder once and returns filename -> fs_id, so callers
// can both build the "which lessons have a transcript" manifest and look up
// a single file's fs_id for download in one listing call.
async function listTranscriptFolder(): Promise<NetdiskFile[]> {
  const token = await getAccessToken();
  const url = new URL(LIST_URL);
  url.searchParams.set("method", "list");
  url.searchParams.set("access_token", token);
  url.searchParams.set("dir", transcriptDir());
  url.searchParams.set("num", "200");

  const response = await fetch(url);
  const data = (await response.json()) as { errno: number; list?: NetdiskFile[] };
  if (!response.ok || data.errno !== 0) {
    throw new Error(`Baidu list failed: errno ${data.errno}`);
  }
  return (data.list ?? []).filter((entry) => entry.isdir === 0);
}

function codeFromFilename(filename: string) {
  const dot = filename.lastIndexOf(".");
  return dot === -1 ? filename : filename.slice(0, dot);
}

// Returns the lesson codes that currently have a transcript file uploaded,
// so the UI only renders a working "文稿" link — never a dead one.
export async function listAvailableTranscriptCodes(): Promise<string[]> {
  const files = await listTranscriptFolder();
  return files.map((file) => codeFromFilename(file.server_filename));
}

// Streams a single lesson's transcript back to the caller. Baidu's dlink
// requires the access_token appended server-side and a `User-Agent:
// pan.baidu.com` header the browser can't set itself, so this proxies the
// bytes through the Worker rather than ever handing a raw dlink to the
// client (that would also leak the access_token in the URL).
export async function fetchTranscript(lessonCode: string) {
  const files = await listTranscriptFolder();
  const match = files.find((file) => codeFromFilename(file.server_filename) === lessonCode);
  if (!match) return null;

  const token = await getAccessToken();
  const metaUrl = new URL(META_URL);
  metaUrl.searchParams.set("method", "filemetas");
  metaUrl.searchParams.set("access_token", token);
  metaUrl.searchParams.set("fsids", JSON.stringify([match.fs_id]));
  metaUrl.searchParams.set("dlink", "1");

  const metaResponse = await fetch(metaUrl);
  const metaData = (await metaResponse.json()) as {
    errno: number;
    list?: { dlink?: string; filename?: string }[];
  };
  const dlink = metaData.list?.[0]?.dlink;
  if (!metaResponse.ok || metaData.errno !== 0 || !dlink) {
    throw new Error(`Baidu filemetas failed: errno ${metaData.errno}`);
  }

  const fileResponse = await fetch(`${dlink}&access_token=${token}`, {
    headers: { "User-Agent": "pan.baidu.com" },
  });
  if (!fileResponse.ok || !fileResponse.body) {
    throw new Error(`Baidu download failed: ${fileResponse.status}`);
  }

  return {
    body: fileResponse.body,
    filename: match.server_filename,
    contentType: fileResponse.headers.get("content-type") || "application/octet-stream",
  };
}
