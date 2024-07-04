import { encode } from "js-base64";
import type MysteryCategory from "../../types/MysteryCategory";

export async function makeLoginRequest(
  user: string,
  password: string,
): Promise<Response> {
  return await fetch("/api/login", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user, password: encode(password) }),
  });
}

export async function makeCreateUserRequest(
  user: string,
  password: string,
): Promise<Response> {
  return await fetch("/api/createUser", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user, password: encode(password) }),
  });
}

export async function makeTurnstileVerifyRequest(
  token: string,
): Promise<Response> {
  return await fetch("/api/turnstile-verify", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  });
}

export async function makeRosaryCompletedRequest(
  timestamp: string,
  timezone: string,
  category: MysteryCategory,
): Promise<Response> {
  return await fetch(
    `/api/rosary/completed?&ts=${timestamp}&tz=${timezone}&category=${category}`,
    {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
    },
  );
}

export async function makeUserDataRequest(): Promise<Response> {
  return await fetch("/api/userData");
}

export async function makeRosaryPauseRequest(
  category: string,
  mysteryIndex: number,
): Promise<Response> {
  return await fetch(
    `/api/rosary/pause?category=${category}&mysteryIndex=${mysteryIndex}`,
    {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
    },
  );
}
