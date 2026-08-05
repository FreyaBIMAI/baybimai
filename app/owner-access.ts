import { env } from "cloudflare:workers";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { chatGPTSignInPath } from "./chatgpt-auth";

type OwnerBindings = {
  OWNER_EMAIL?: string;
};

const CHATGPT_EMAIL_HEADER = "oai-authenticated-user-email";
const CLOUDFLARE_ACCESS_EMAIL_HEADER =
  "cf-access-authenticated-user-email";

function ownerEmail() {
  return (env as unknown as OwnerBindings).OWNER_EMAIL?.trim().toLowerCase();
}

function requestHost(requestHeaders: Awaited<ReturnType<typeof headers>>) {
  const value =
    requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "";
  return value.split(",")[0].trim().split(":")[0].toLowerCase();
}

export async function requireOwner(returnTo: string) {
  const expectedEmail = ownerEmail();
  if (!expectedEmail) notFound();

  const requestHeaders = await headers();
  const host = requestHost(requestHeaders);
  const isSitesHost = host.endsWith(".chatgpt.site");
  const isCanonicalHost =
    host === "baybimai.org" || host === "www.baybimai.org";

  const authenticatedEmail = isSitesHost
    ? requestHeaders.get(CHATGPT_EMAIL_HEADER)
    : isCanonicalHost
      ? requestHeaders.get(CLOUDFLARE_ACCESS_EMAIL_HEADER) ??
        requestHeaders.get(CHATGPT_EMAIL_HEADER)
      : null;

  if (authenticatedEmail?.trim().toLowerCase() === expectedEmail) {
    return { email: expectedEmail };
  }

  if (!authenticatedEmail && isSitesHost) {
    redirect(chatGPTSignInPath(returnTo));
  }

  notFound();
}
