import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";
import { getRequestContext } from "@cloudflare/next-on-pages";
import verifyTurnstileToken from "../turnstile-verify/verifyTurnstileToken";
import { decode } from "js-base64";

import { createUser, getUserExists } from "../../database/databaseMethods";
import { createLoginJWT } from "../../utils/jwtUtils";

export const runtime = "edge";

type CreateUserParameters = {
  user: string;
  password: string;
  token: string;
};

export async function POST(request: NextRequest) {
  const createUserParameters: CreateUserParameters = await request.json();
  if (!createUserParameters) {
    return new Response("Missing required json fields", {
      status: 400,
    });
  }
  const { user, password, token } = createUserParameters;
  if (!user || !password || !token) {
    return new Response("Missing required json field(s)", {
      status: 400,
    });
  }
  const outcome = await verifyTurnstileToken(request, token);
  if (!outcome.success) {
    return new Response(
      `Failed turnstile verification: ${JSON.stringify(outcome)}`,
      {
        status: 401,
      },
    );
  }

  const db = getRequestContext().env.DB;
  if (await getUserExists(db, user)) {
    return new Response("User with that name already exists", {
      status: 403,
    });
  }

  const b64decodedPassword = decode(password);

  const createSuccess = await createUser(db, user, b64decodedPassword);
  if (createSuccess) {
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
  return new Response("Failed to create user account", {
    status: 500,
  });
}
