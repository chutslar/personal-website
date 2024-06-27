import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { decode } from "js-base64";

import { getUserExists, login } from "../../database/databaseMethods";
import LoginParameters from "../../types/LoginParameters";
import { createLoginJWT } from "../../utils/jwtUtils";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  const loginParameters: LoginParameters = await request.json();
  if (!loginParameters) {
    return new Response("Missing required json fields", {
      status: 400,
    });
  }
  const { user, password } = loginParameters;
  if (!user || !password) {
    return new Response("Missing required json field(s)", {
      status: 400,
    });
  }

  const db = getRequestContext().env.DB;
  if (!(await getUserExists(db, user))) {
    return new Response("No such user exists", {
      status: 404,
    });
  }

  const b64decodedPassword = decode(password);
  const loginSuccess = await login(db, user, b64decodedPassword);
  if (loginSuccess) {
    const accessToken = await createLoginJWT(
      getRequestContext().env.JWT_SECRETKEY,
      user,
    );
    if (accessToken) {
      cookies().set("access-token", accessToken);
      const response = new NextResponse("", { status: 200 });
      response.cookies.set("access-token", accessToken);
      return response;
    } else {
      return new Response("Failed to generate login token", { status: 500 });
    }
  }
  return new Response("Incorrect password", {
    status: 403,
  });
}
