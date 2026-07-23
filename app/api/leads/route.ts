import { getDb } from "../../../db";
import { leads } from "../../../db/schema";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const payload: unknown = await request.json();

    if (!payload || typeof payload !== "object") {
      return Response.json({ error: "请求内容格式不正确。" }, { status: 400 });
    }

    const fields = payload as Record<string, unknown>;
    const name = typeof fields.name === "string" ? fields.name.trim() : "";
    const email =
      typeof fields.email === "string"
        ? fields.email.trim().toLowerCase()
        : "";

    // Honeypot: bot submissions are accepted without entering the database.
    if (typeof fields.website === "string" && fields.website) {
      return Response.json({ ok: true }, { status: 201 });
    }

    if (!name || name.length > 80) {
      return Response.json({ error: "请输入姓名。" }, { status: 400 });
    }

    if (!emailPattern.test(email) || email.length > 160) {
      return Response.json({ error: "请输入有效的邮件地址。" }, { status: 400 });
    }

    await getDb().insert(leads).values({ name, email });

    return Response.json({ ok: true }, { status: 201 });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return Response.json({ error: "请求内容格式不正确。" }, { status: 400 });
    }

    return Response.json(
      { error: "暂时无法提交，请稍后再试。" },
      { status: 500 },
    );
  }
}
