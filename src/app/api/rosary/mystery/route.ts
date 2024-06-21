import type { NextRequest } from 'next/server'
import { parseISO } from 'date-fns'
import { getMysteries, getMysteryCategory } from '@/app/utils/RosaryMysteries'
import MysteryResponseData from '@/app/types/MysteryResponseData'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const userDateString = request.nextUrl.searchParams.get("date");
  const userDate = userDateString ? parseISO(userDateString) : new Date();
  const category = getMysteryCategory(userDate);
  const mysteries = getMysteries(category);
  const mysteryResponseData : MysteryResponseData = {
    category,
    mysteries,
  };

  return new Response(JSON.stringify(mysteryResponseData));
}