import { NextResponse, type NextRequest } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { cookies } from "next/headers";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

import { createTurnstileJwt } from "../../utils/jwtUtils";

export const runtime = "edge";

dayjs.extend(duration);

type TurnstileVerifyParameters = {
  token: string;
};

type TurnstileResponse = {
  internalError?: number;
  success?: boolean;
  "error-codes"?: string[];
  challenge_ts?: string;
  hostname?: string;
};

export async function POST(request: NextRequest) {
  const turnstileVerifyParameters: TurnstileVerifyParameters =
    await request.json();
  if (!turnstileVerifyParameters) {
    return new Response("Missing required json field", { status: 400 });
  }
  const turnstileSecretKey = getRequestContext().env.TURNSTILE_SECRETKEY;
  if (!turnstileSecretKey) {
    return new Response("Failed to verify turnstile", {
      status: 500,
    });
  }

  // Turnstile injects a token in "cf-turnstile-response".
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(/, /)[0] : request.ip;
  const { token } = turnstileVerifyParameters;
  if (!token || !ip) {
    return new Response("Missing required json field(s)", { status: 400 });
  }

  // Validate the token by calling the
  // "/siteverify" API endpoint.
  let formData = new FormData();
  formData.append("secret", turnstileSecretKey);
  formData.append("response", token);
  formData.append("remoteip", ip);

  const url = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
  const result = await fetch(url, {
    body: formData,
    method: "POST",
  });

  const outcome: TurnstileResponse = await result.json();
  if (outcome.success) {
    const turnstileToken = await createTurnstileJwt(
      getRequestContext().env.JWT_SECRETKEY,
    );
    if (turnstileToken) {
      cookies().set("turnstile-token", turnstileToken, {
        maxAge: dayjs.duration({ minutes: 30 }).asSeconds(),
      });
      const response = new NextResponse("", { status: 200 });
      response.cookies.set("turnstile-token", turnstileToken);
      return response;
    } else {
      return new Response("Failed to generate turnstile token", {
        status: 500,
      });
    }
  }
  return new Response("Failed turnstile auth", { status: 401 });
}
