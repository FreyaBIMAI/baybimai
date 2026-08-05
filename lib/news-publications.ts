import { env } from "cloudflare:workers";
import type { NewsLang } from "../app/news/news-content";

export type PublishedSignal = {
  company: string;
  date: string;
  title: string;
  copy: string;
  href: string;
};

export type PublishedNews = {
  issueDate: string;
  headline: string;
  summary: string;
  signals: PublishedSignal[];
};

type NewsBindings = {
  DB?: D1Database;
  NEWS_REFRESH_URL?: string;
  NEWS_REFRESH_TOKEN?: string;
  NEWS_DISTRIBUTION_URL?: string;
  NEWS_DISTRIBUTION_TOKEN?: string;
};

type RefreshPayload = {
  zh?: unknown;
  en?: unknown;
};

function bindings(): NewsBindings {
  return env as unknown as NewsBindings;
}

function isSignal(value: unknown): value is PublishedSignal {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Record<string, unknown>;
  return ["company", "date", "title", "copy", "href"].every(
    (key) => typeof candidate[key] === "string" && candidate[key].trim().length > 0,
  );
}

function isPublishedNews(value: unknown): value is PublishedNews {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.issueDate === "string" &&
    /^\d{4}-\d{2}-\d{2}$/.test(candidate.issueDate) &&
    typeof candidate.headline === "string" &&
    candidate.headline.trim().length > 0 &&
    typeof candidate.summary === "string" &&
    candidate.summary.trim().length > 0 &&
    Array.isArray(candidate.signals) &&
    candidate.signals.length >= 1 &&
    candidate.signals.length <= 5 &&
    candidate.signals.every(isSignal)
  );
}

function parseSignals(value: string): PublishedSignal[] | null {
  try {
    const signals = JSON.parse(value) as unknown;
    return Array.isArray(signals) && signals.every(isSignal) ? signals : null;
  } catch {
    return null;
  }
}

export async function getLatestPublishedNews(
  lang: NewsLang,
): Promise<PublishedNews | null> {
  const db = bindings().DB;
  if (!db) return null;

  try {
    const result = await db
      .prepare(
        "SELECT issue_date, headline, summary, signals FROM news_publications WHERE language = ? ORDER BY issue_date DESC LIMIT 1",
      )
      .bind(lang)
      .first<{
        issue_date: string;
        headline: string;
        summary: string;
        signals: string;
      }>();
    if (!result) return null;

    const signals = parseSignals(result.signals);
    if (!signals?.length) return null;

    return {
      issueDate: result.issue_date,
      headline: result.headline,
      summary: result.summary,
      signals,
    };
  } catch (error) {
    // A new deployment can render safely before its D1 migration is applied.
    console.warn("Unable to read latest News publication", error);
    return null;
  }
}

export async function refreshDailyNews(
  scheduledTime: number,
  override?: NewsBindings,
): Promise<void> {
  const current = override ?? bindings();
  if (!current.DB || !current.NEWS_REFRESH_URL) {
    console.info("News refresh skipped: NEWS_REFRESH_URL or D1 is not configured.");
    return;
  }

  const response = await fetch(current.NEWS_REFRESH_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(current.NEWS_REFRESH_TOKEN
        ? { Authorization: `Bearer ${current.NEWS_REFRESH_TOKEN}` }
        : {}),
    },
    body: JSON.stringify({
      scheduledAt: new Date(scheduledTime).toISOString(),
      requiredLanguages: ["zh", "en"],
      requiredSignals: 3,
    }),
  });

  if (!response.ok) {
    throw new Error(`News refresh endpoint returned ${response.status}.`);
  }

  const payload = (await response.json()) as RefreshPayload;
  const publications: Array<[NewsLang, PublishedNews]> = (
    [["zh", payload.zh], ["en", payload.en]] as const
  ).flatMap(([lang, candidate]) =>
    isPublishedNews(candidate) ? [[lang, candidate]] : [],
  );

  if (publications.length !== 2) {
    throw new Error("News refresh endpoint returned an incomplete publication payload.");
  }

  await current.DB.batch(
    publications.map(([language, publication]) =>
      current.DB!.prepare(
        `INSERT INTO news_publications (language, issue_date, headline, summary, signals, updated_at)
         VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
         ON CONFLICT(language, issue_date) DO UPDATE SET
           headline = excluded.headline,
           summary = excluded.summary,
           signals = excluded.signals,
           updated_at = CURRENT_TIMESTAMP`,
      ).bind(
        language,
        publication.issueDate,
        publication.headline.trim(),
        publication.summary.trim(),
        JSON.stringify(publication.signals),
      ),
    ),
  );

  await distributeDailyNews(current, publications);
}

// Best-effort fan-out to an external CRM/email tool once one is connected.
// Never configured today, so this safely no-ops; a failure here must never
// undo the publication that already landed in D1 above.
async function distributeDailyNews(
  current: NewsBindings,
  publications: Array<[NewsLang, PublishedNews]>,
): Promise<void> {
  if (!current.NEWS_DISTRIBUTION_URL) return;

  try {
    const response = await fetch(current.NEWS_DISTRIBUTION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(current.NEWS_DISTRIBUTION_TOKEN
          ? { Authorization: `Bearer ${current.NEWS_DISTRIBUTION_TOKEN}` }
          : {}),
      },
      body: JSON.stringify({
        publications: publications.map(([language, publication]) => ({
          language,
          ...publication,
        })),
      }),
    });
    if (!response.ok) {
      console.warn(`News distribution endpoint returned ${response.status}.`);
    }
  } catch (error) {
    console.warn("Unable to reach News distribution endpoint", error);
  }
}
