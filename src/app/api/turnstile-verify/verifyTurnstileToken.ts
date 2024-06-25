import { getRequestContext } from "@cloudflare/next-on-pages";
import { NextRequest } from "next/server";

export type TurnstileResponse = {
  internalError?: number,
  success?: boolean;
  "error-codes"?: string[];
  "challenge_ts"?: string;
  hostname?: string;
}

export default async function verifyTurnstileToken(request: NextRequest): Promise<TurnstileResponse> {
  const turnstileSecretKey = getRequestContext().env.TURNSTILE_SECRETKEY;

  if (!turnstileSecretKey) {
    return {
      internalError: 500,
    }
  }

	// Turnstile injects a token in "cf-turnstile-response".
	const {token} = (await request.json() as any);
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(/, /)[0] : request.ip

  if (!token || !ip) {
    return {
      internalError: 400
    };
  }

	// Validate the token by calling the
	// "/siteverify" API endpoint.
	let formData = new FormData();
	formData.append('secret', turnstileSecretKey);
	formData.append('response', token);
	formData.append('remoteip', ip);

	const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
	const result = await fetch(url, {
		body: formData,
		method: 'POST',
	});

	const outcome: TurnstileResponse = await result.json();
  return outcome;
}