import {
  createSpeech,
  isElevenLabsVoiceId,
  MARK_VOICE_ID,
} from "../../../lib/elevenlabs";

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

    return createSpeech(request, text, voiceId);
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
