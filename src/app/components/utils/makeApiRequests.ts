import type MysteryCategory from "../../types/MysteryCategory";

export async function makeLoginRequest(
  userName: string,
  token: string,
): Promise<Response> {
  return await fetch(`/api/login?user=${userName}`, {
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

export async function makeCreateUserRequest(
  userName: string,
  token: string,
): Promise<Response> {
  return await fetch(`/api/createUser?user=${userName}`, {
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
  userName: string,
  timestamp: string,
  timezone: string,
  category: MysteryCategory,
): Promise<Response> {
  return await fetch(
    `/api/rosary/completed?user=${userName}&ts=${timestamp}&tz=${timezone}&category=${category}`,
    {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
    },
  );
}
