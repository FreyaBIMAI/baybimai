import {
  createSpeech,
  isElevenLabsVoiceId,
  isElevenLabsConfigured,
  MARK_VOICE_ID,
} from "../../../lib/elevenlabs";

// The browser reader checks this once after mount. If studio speech has not
// been configured, it can start the native browser voice inside the user's
// click gesture instead of waiting for a failed network request (which Safari
// and some mobile browsers may block from starting audio afterwards).
export function GET() {
  return Response.json({ available: isElevenLabsConfigured() });
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as { text?: unknown; voiceId?: unknown };
    const text = typeof payload.text === "string" ? payload.text : "";
    const voiceId = typeof payload.voiceId === "string"
      ? payload.voiceId
      : MARK_VOICE_ID;

    if (!isElevenLabsVoiceId(voiceId)) {
      return Response.json({ error: "Voice is not available." }, { status: 400 });
    }

    // Must be awaited, not just returned: a bare `return createSpeech(...)`
    // hands back the promise without letting this try/catch observe a
    // rejection, so any internal failure would crash the Worker with a raw
    // platform error page instead of the JSON response below.
    return await createSpeech(request, text, voiceId);
  } catch (error) {
    if (error instanceof SyntaxError) {
      return Response.json({ error: "Invalid request body." }, { status: 400 });
    }

    console.error("Unable to create ElevenLabs speech", error);
    return Response.json(
      { error: "The selected voice is temporarily unavailable." },
      { status: 500 },
    );
  }
}
