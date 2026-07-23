import { getDb } from "../../../db";
import { leads } from "../../../db/schema";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as {
      name?: string;
      email?: string;
      website?: string;
    };

    const name = payload.name?.trim() ?? "";
    const email = payload.email?.trim().toLowerCase() ?? "";

    // Quietly accept bot submissions without saving them.
    if (payload.website) {
      return Response.json({ ok: true }, { status: 201 });
    }

    if (!name || name.length > 80) {
      return Response.json({ error: "请输入姓名。" }, { status: 400 });
    }

    if (!emailPattern.test(email) || email.length > 160) {
      return Response.json({ error: "请输入有效的邮件地址。" }, { status: 400 });
    }

    const db = getDb();
    await db.insert(leads).values({ name, email });

    return Response.json({ ok: true }, { status: 201 });
  } catch {
    return Response.json(
      { error: "暂时无法提交，请稍后再试。" },
      { status: 500 },
    );
  }
}
