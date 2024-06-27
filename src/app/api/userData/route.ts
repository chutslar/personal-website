import type { NextRequest } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";

import { getUserData, getUserExists } from "../../database/databaseMethods";
import { verifyLoginJWT } from "../../utils/jwtUtils";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get("access-token");
  if (!accessToken?.value) {
    return new Response("Missing access token cookie", { status: 401 });
  }
  const userName = await verifyLoginJWT(
    getRequestContext().env.JWT_SECRETKEY,
    accessToken.value,
  );
  if (!userName) {
    return new Response("Invalid access token cookie", { status: 401 });
  }

  const db = getRequestContext().env.DB;
  if (!(await getUserExists(db, userName))) {
    return new Response("No such user exists", {
      status: 404,
    });
  }

  const userData = await getUserData(db, userName);
  if (userData) {
    return new Response(JSON.stringify(userData));
  }
  return new Response(null, { status: 204 });
}
