import {
  fetchTranscript,
  isBaiduNetdiskConfigured,
  listAvailableTranscriptCodes,
} from "../../../lib/baidu-netdisk";

// No `code` param: return which lessons currently have a transcript, so the
// syllabus page can render a "文稿" link only where one will actually work.
// With `code`: stream that lesson's transcript file back as a download.
export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  if (!isBaiduNetdiskConfigured()) {
    return Response.json({ available: false, codes: [] });
  }

  if (!code) {
    try {
      const codes = await listAvailableTranscriptCodes();
      return Response.json({ available: true, codes });
    } catch (error) {
      console.error("Unable to list course transcripts", error);
      return Response.json({ available: true, codes: [] });
    }
  }

  try {
    const file = await fetchTranscript(code);
    if (!file) {
      return Response.json({ error: "No transcript for this lesson yet." }, { status: 404 });
    }
    return new Response(file.body, {
      headers: {
        "Content-Type": file.contentType,
        "Content-Disposition": `attachment; filename="${encodeURIComponent(file.filename)}"`,
        "Cache-Control": "private, max-age=300",
      },
    });
  } catch (error) {
    console.error("Unable to fetch course transcript", error);
    return Response.json({ error: "Transcript is temporarily unavailable." }, { status: 502 });
  }
}
