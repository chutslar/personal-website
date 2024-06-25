export async function makeLoginRequest(userName: string, token: string): Promise<Response> {
  return await fetch(`/api/login?user=${userName}`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({token}),
  });
}

export async function makeCreateUserRequest(userName: string, token: string): Promise<Response> {
  return await fetch(`/api/createUser?user=${userName}`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({token}),
  });
}
