import { getDb } from "../../../../db";
import { newsFeedback } from "../../../../db/schema";

const signals = new Set(["useful", "more-examples", "more-sources"]);

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as Record<string, unknown>;
    const language = payload.language === "en" ? "en" : payload.language === "zh" ? "zh" : null;
    const issueDate = typeof payload.issueDate === "string" ? payload.issueDate : "";
    const signal = typeof payload.signal === "string" ? payload.signal : "";
    const note = typeof payload.note === "string" ? payload.note.trim() : "";

    if (!language || !/^\d{4}-\d{2}-\d{2}$/.test(issueDate) || !signals.has(signal)) {
      return Response.json({ error: "Invalid feedback." }, { status: 400 });
    }
    if (note.length > 500) {
      return Response.json({ error: "Feedback is too long." }, { status: 400 });
    }

    await getDb().insert(newsFeedback).values({
      language,
      issueDate,
      signal,
      note: note || null,
    });
    return Response.json({ ok: true }, { status: 201 });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return Response.json({ error: "Invalid request body." }, { status: 400 });
    }
    console.error("Unable to save News feedback", error);
    return Response.json({ error: "Feedback is unavailable." }, { status: 500 });
  }
}
