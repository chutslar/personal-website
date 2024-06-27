import type { NextRequest } from "next/server";
import verifyTurnstileToken from "./verifyTurnstileToken";

export const runtime = "edge";

type TurnstileVerifyParameters = {
  token: string;
};

export async function POST(request: NextRequest) {
  const turnstileVerifyParameters: TurnstileVerifyParameters =
    await request.json();
  if (!turnstileVerifyParameters) {
    return new Response("Missing required json field", { status: 400 });
  }
  const outcome = await verifyTurnstileToken(
    request,
    turnstileVerifyParameters.token,
  );
  if (outcome.success) {
    return new Response(JSON.stringify(outcome));
  }

  return new Response(JSON.stringify(outcome), {
    status: 403,
  });
}
