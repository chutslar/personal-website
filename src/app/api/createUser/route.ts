import type { NextRequest } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";
import verifyTurnstileToken from "../turnstile-verify/verifyTurnstileToken";
import { createUser, getUserExists } from "@/app/database/databaseMethods";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  const userName = request.nextUrl.searchParams.get("user");
  if (!userName) {
    return new Response("user param required", {
      status: 400,
    });
  }
  const outcome = await verifyTurnstileToken(request);
  if (!outcome.success) {
    return new Response(
      `Failed turnstile verification: ${JSON.stringify(outcome)}`,
      {
        status: 401,
      },
    );
  }

  const db = getRequestContext().env.DB;
  if (await getUserExists(db, userName)) {
    return new Response("User with that name already exists", {
      status: 403,
    });
  }

  const createSuccess = await createUser(db, userName);
  if (createSuccess) {
    return new Response(userName);
  }
  return new Response("Failed to create user account", {
    status: 500,
  });
}
