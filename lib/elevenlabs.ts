import { env } from "cloudflare:workers";

export const MARK_VOICE_ID = "UgBBYS2sOqTuMpoF3BR0";
export const ADAM_VOICE_ID = "zKTOd8cxZlIf5EKC5Giv";
export const HOPE_VOICE_ID = "uYXf8XasLslADfZ2MB4u";

// Mark stays available server-side for future course narration, but is not
// exposed in the current news or Founder Daily voice selectors.
export const ELEVENLABS_VOICE_IDS = [
  ADAM_VOICE_ID,
  HOPE_VOICE_ID,
  MARK_VOICE_ID,
] as const;
export type ElevenLabsVoiceId = (typeof ELEVENLABS_VOICE_IDS)[number];

const ELEVENLABS_MODEL_ID = "eleven_multilingual_v2";
const MAX_TEXT_LENGTH = 9_500;

type ElevenLabsBindings = {
  ELEVENLABS_API_KEY?: string;
  SITE_URL?: string;
};

function bindings(): ElevenLabsBindings {
  return env as unknown as ElevenLabsBindings;
}

function allowedOrigins(request: Request) {
  const current = bindings();
  const requestOrigin = new URL(request.url).origin;
  const configuredOrigin = current.SITE_URL
    ? new URL(current.SITE_URL).origin
    : "https://baybimai.org";

  return new Set([
    requestOrigin,
    configuredOrigin,
    "https://baybimai.org",
    "https://www.baybimai.org",
  ]);
}

function cacheKey(request: Request, text: string, voiceId: ElevenLabsVoiceId) {
  return crypto.subtle
    .digest("SHA-256", new TextEncoder().encode(`${ELEVENLABS_MODEL_ID}:${voiceId}:${text}`))
    .then((digest) => {
      const hash = Array.from(new Uint8Array(digest), (byte) =>
        byte.toString(16).padStart(2, "0"),
      ).join("");
      return new Request(`${new URL(request.url).origin}/api/tts/cache/${hash}`);
    });
}

function defaultCache(): Cache | null {
  if (typeof caches === "undefined") return null;
  return (caches as CacheStorage & { default?: Cache }).default ?? null;
}

export function isElevenLabsVoiceId(value: string): value is ElevenLabsVoiceId {
  return ELEVENLABS_VOICE_IDS.some((voiceId) => voiceId === value);
}

export async function createSpeech(
  request: Request,
  text: string,
  voiceId: ElevenLabsVoiceId,
) {
  const origin = request.headers.get("origin");
  if (origin && !allowedOrigins(request).has(origin)) {
    return Response.json({ error: "Origin not allowed." }, { status: 403 });
  }

  const normalizedText = text.replace(/\s+/g, " ").trim();
  if (!normalizedText || normalizedText.length > MAX_TEXT_LENGTH) {
    return Response.json(
      { error: `Text must contain between 1 and ${MAX_TEXT_LENGTH} characters.` },
      { status: 400 },
    );
  }

  const apiKey = bindings().ELEVENLABS_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "ElevenLabs voice is not configured." },
      { status: 503 },
    );
  }

  const cache = defaultCache();
  const key = await cacheKey(request, normalizedText, voiceId);
  const cached = await cache?.match(key);
  if (cached) return cached;

  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
    {
      method: "POST",
      headers: {
        Accept: "audio/mpeg",
        "Content-Type": "application/json",
        "xi-api-key": apiKey,
      },
      body: JSON.stringify({
        text: normalizedText,
        model_id: ELEVENLABS_MODEL_ID,
        voice_settings: {
          stability: 0.55,
          similarity_boost: 0.82,
          style: 0.05,
          use_speaker_boost: true,
          speed: 1,
        },
      }),
    },
  );

  if (!response.ok || !response.body) {
    const detail = await response.text();
    console.error("ElevenLabs speech generation failed", response.status, detail);
    return Response.json(
      { error: "The selected voice is temporarily unavailable." },
      { status: 502 },
    );
  }

  const audio = new Response(response.body, {
    headers: {
      "Content-Type": response.headers.get("content-type") || "audio/mpeg",
      "Cache-Control": "public, max-age=86400, s-maxage=2592000, immutable",
      "X-BAYBIMAI-Voice": voiceId,
    },
  });

  if (cache) await cache.put(key, audio.clone());
  return audio;
}
