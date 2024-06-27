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

  const timestamp = request.nextUrl.searchParams.get("ts");
  const timezone = request.nextUrl.searchParams.get("tz");
  const category = request.nextUrl.searchParams.get("category");
  if (!timestamp || !timezone) {
    return new Response("Request missing required param", {
      status: 400,
    });
  }
  if (!Intl.supportedValuesOf("timeZone").includes(timezone)) {
    return new Response("Invalid timezone", {
      status: 400,
    });
  }
  const completedDateUTC = dayjs.utc(timestamp);
  const completedDateUserLocalTime = completedDateUTC.tz(timezone);
  if (Math.abs(completedDateUTC.diff(dayjs.utc(), "hour")) > 1) {
    // The UTC time of the user should be pretty similar to the server's
    // current UTC time. Reject if it's more than an hour off.
    return new Response("Timestamp too far in the past/future", {
      status: 400,
    });
  }

  const db = getRequestContext().env.DB;
  if (!(await getUserExists(db, userName))) {
    return new Response("No such user exists", {
      status: 404,
    });
  }
  const existingData: UserData = (await getUserData(db, userName)) || {};
  let updates: Partial<UserData> = {
    lastRosaryDate: timestamp,
    totalRosaries: (existingData.totalRosaries || 0) + 1,
    currentStreak: 1,
  };

  // Fill in the first rosary date if this is the first rosary
  if (!existingData.firstRosaryDate) {
    updates.firstRosaryDate = timestamp;
  }
  // Calculate the updated streak
  if (existingData.lastRosaryDate && existingData.currentStreak) {
    const daysBetweenCurrentAndLastRosary = completedDateUserLocalTime
      .startOf("day")
      .diff(
        dayjs.utc(existingData.lastRosaryDate).tz(timezone).startOf("day"),
        "day",
      );
    if (daysBetweenCurrentAndLastRosary == 0) {
      // Did rosary in same day, don't increment streak
      updates.currentStreak = existingData.currentStreak;
    } else if (daysBetweenCurrentAndLastRosary == 1) {
      // Did rosary yesterday, increment streak
      updates.currentStreak = existingData.currentStreak + 1;
    } else if (daysBetweenCurrentAndLastRosary > 1) {
      // Didn't do rosary yesterday, streak starts over from 1
      updates.currentStreak = 1;
    } else {
      // Should never happen, the last rosary date was after the current one
      return new Response(
        "Timestamp incorrect, occurred before last completed rosary",
        {
          status: 400,
        },
      );
    }
  }
  // If the user was previously paused on this mystery category,
  // clear the paused state so they start from the beginning next time.
  switch (category) {
    case OMysteryCategory.Glorious: {
      if ((existingData.pausedGloriousMysteryIndex || 0) > 0) {
        updates.pausedGloriousMysteryIndex = 0;
      }
      break;
    }
    case OMysteryCategory.Joyful: {
      if ((existingData.pausedJoyfulMysteryIndex || 0) > 0) {
        updates.pausedJoyfulMysteryIndex = 0;
      }
      break;
    }
    case OMysteryCategory.Luminous: {
      if ((existingData.pausedLuminousMysteryIndex || 0) > 0) {
        updates.pausedLuminousMysteryIndex = 0;
      }
      break;
    }
    case OMysteryCategory.Sorrowful: {
      if ((existingData.pausedSorrowfulMysteryIndex || 0) > 0) {
        updates.pausedSorrowfulMysteryIndex = 0;
      }
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
