import type { ReadonlyDeep } from "type-fest";
import type RosaryTrackerState from "../types/RosaryTrackerState";
import type Mystery from "../types/Mystery";
import { fullRosary } from "./Prayers";

export function getMystery(
  state: ReadonlyDeep<RosaryTrackerState>,
): ReadonlyDeep<Mystery> | undefined {
  return getMysteryForIndex(state, state.mysteryIndex);
}

export function getMysteryForIndex(
  state: ReadonlyDeep<RosaryTrackerState>,
  mysteryIndex: number,
): ReadonlyDeep<Mystery> | undefined {
  return state.mysteryResponseData?.mysteries[mysteryIndex];
}

export function isLastMystery(
  state: ReadonlyDeep<RosaryTrackerState>,
): boolean {
  return isLastMysteryIndex(state.mysteryIndex);
}

export function isLastMysteryIndex(mysteryIndex: number): boolean {
  return mysteryIndex >= fullRosary.length - 1;
}

export function isLastPrayer(state: ReadonlyDeep<RosaryTrackerState>): boolean {
  return state.prayerIndex >= fullRosary[state.mysteryIndex].length - 1;
}
