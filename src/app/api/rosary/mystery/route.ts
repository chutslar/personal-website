import type { NextRequest } from 'next/server'
import { getMysteries } from '@/app/utils/rosaryMysteries'
import MysteryResponseData from '@/app/types/MysteryResponseData'
import MysteryCategory from '@/app/types/MysteryCategory'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const categoryString = request.nextUrl.searchParams.get("category");
  if (!categoryString) {
    return new Response("Request missing required param category", {
      status: 400,
    })
  }
  const category = categoryString as MysteryCategory
  const mysteries = getMysteries(category);
  const mysteryResponseData : MysteryResponseData = {
    category,
    mysteries,
  };

  return new Response(JSON.stringify(mysteryResponseData));
}