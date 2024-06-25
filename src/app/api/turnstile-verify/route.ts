import type { NextRequest } from 'next/server'
import { getRequestContext } from '@cloudflare/next-on-pages'
import verifyTurnstileToken from './verifyTurnstileToken';

export const runtime = 'edge'

export async function POST(request: NextRequest) {
  const outcome = await verifyTurnstileToken(request);
	if (outcome.success) {
		return new Response(JSON.stringify(outcome));
	}

  return new Response(JSON.stringify(outcome), {
    status: 403,
  });
}