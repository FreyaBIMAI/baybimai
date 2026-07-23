import { env } from "cloudflare:workers";
import { getDb } from "../../../db";
import { leads } from "../../../db/schema";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type SupabaseConfig = {
  url: string;
  key: string;
};

function getSupabaseConfig(): SupabaseConfig | null {
  const bindings = env as unknown as Record<string, string | undefined>;
  const url = bindings.SUPABASE_URL ?? process.env.SUPABASE_URL;
  const key = bindings.SUPABASE_KEY ?? process.env.SUPABASE_KEY;

  if (!url || !key || url === "..." || key === "...") {
    return null;
  }

  return {
    url: url.replace(/\/+$/, ""),
    key,
  };
}

async function insertIntoSupabase(
  config: SupabaseConfig,
  lead: { name: string; email: string },
) {
  const headers: Record<string, string> = {
    apikey: config.key,
    "Content-Type": "application/json",
    Prefer: "return=minimal",
  };

  // Legacy service_role keys are JWTs and also use a Bearer header.
  // New sb_secret_* keys must only be sent through the apikey header.
  if (config.key.startsWith("eyJ")) {
    headers.Authorization = `Bearer ${config.key}`;
  }

  const response = await fetch(`${config.url}/rest/v1/leads`, {
    method: "POST",
    headers,
    body: JSON.stringify(lead),
  });

  if (!response.ok) {
    throw new Error(`Supabase insert failed with status ${response.status}`);
  }
}

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

    const supabase = getSupabaseConfig();

    if (supabase) {
      await insertIntoSupabase(supabase, { name, email });
    } else {
      // Keep the current production form working until Supabase is configured.
      await getDb().insert(leads).values({ name, email });
    }

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
