import type { NextRequest } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

import {
  getUserData,
  getUserExists,
  updateUserData,
} from "../../../database/databaseMethods";
import UserData from "../../../types/UserData";
import OMysteryCategory from "../../../enums/OMysteryCategory";
import { verifyLoginJWT } from "../../../utils/jwtUtils";

export const runtime = "edge";

dayjs.extend(utc);
dayjs.extend(timezone);

export async function POST(request: NextRequest) {
  const accessToken = request.cookies.get("access-token");
  if (!accessToken?.value) {
    return new Response("Missing access token cookie", { status: 401 });
  }
  const userName = await verifyLoginJWT(
    getRequestContext().env.JWT_SECRETKEY,
    accessToken.value,
  );
  if (!userName) {
    return new Response("Invalid access token cookie", { status: 401 });
  }

  const category = request.nextUrl.searchParams.get("category");
  const mysteryIndexString = request.nextUrl.searchParams.get("mysteryIndex");
  if (!category || !mysteryIndexString) {
    return new Response("Missing required param(s)", { status: 400 });
  }
  const mysteryIndex = parseInt(mysteryIndexString, 10);
  if (mysteryIndex < 0 || mysteryIndex > 6) {
    return new Response("Invalid mystery index", { status: 400 });
  }

  const db = getRequestContext().env.DB;
  if (!(await getUserExists(db, userName))) {
    return new Response("No such user exists", {
      status: 404,
    });
  }

  let updates: Partial<UserData> = {};
  switch (category) {
    case OMysteryCategory.Glorious: {
      updates.pausedGloriousMysteryIndex = mysteryIndex;
      break;
    }
    case OMysteryCategory.Joyful: {
      updates.pausedJoyfulMysteryIndex = mysteryIndex;
      break;
    }
    case OMysteryCategory.Luminous: {
      updates.pausedLuminousMysteryIndex = mysteryIndex;
      break;
    }
    case OMysteryCategory.Sorrowful: {
      updates.pausedSorrowfulMysteryIndex = mysteryIndex;
      break;
    }
    default: {
      return new Response("Invalid category", {
        status: 400,
      });
    }
  }

  const success = await updateUserData(db, userName, updates);
  if (success) {
    return new Response("OK");
  }
  return new Response("Failed to update data", {
    status: 500,
  });
}
