import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { decode } from "js-base64";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

import { createUser, getUserExists } from "../../database/databaseMethods";
import { createLoginJWT, verifyTurnstileJWT } from "../../utils/jwtUtils";

export const runtime = "edge";

dayjs.extend(duration);

type CreateUserParameters = {
  user: string;
  password: string;
};

export async function POST(request: NextRequest) {
  const turnstileToken = request.cookies.get("turnstile-token");
  if (!turnstileToken?.value) {
    return new Response("Missing access token cookie", { status: 401 });
  }
  const passedTurnstile = await verifyTurnstileJWT(
    getRequestContext().env.JWT_SECRETKEY,
    turnstileToken.value,
  );
  if (!passedTurnstile) {
    return new Response("Missing turnstile verification token", {
      status: 401,
    });
  }

  const createUserParameters: CreateUserParameters = await request.json();
  if (!createUserParameters) {
    return new Response("Missing required json fields", {
      status: 400,
    });
  }
  const { user, password } = createUserParameters;
  if (!user || !password) {
    return new Response("Missing required json field(s)", {
      status: 400,
    });
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
      (await cookies()).set("access-token", accessToken, {
        maxAge: dayjs.duration({ days: 1 }).asSeconds(),
      });
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
