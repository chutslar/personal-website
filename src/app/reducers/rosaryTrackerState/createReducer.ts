import RosaryTrackerState from "../../types/RosaryTrackerState";
import OActionType from "./enums/OActionType";
import RosaryTrackerStateReducer from "./types/RosaryTrackerStateReducer";
import { fullRosary } from "../../utils/Prayers";
import Action from "./types/Action";
import { ReadonlyDeep } from "type-fest";

export default function createReducer(): RosaryTrackerStateReducer {
  const reducer = (
    state: ReadonlyDeep<RosaryTrackerState>,
    action: Action,
  ): ReadonlyDeep<RosaryTrackerState> => {
    switch (action.type) {
      case OActionType.NextMystery: {
        if (state.mysteryIndex < fullRosary.length - 1) {
          return {
            ...state,
            mysteryIndex: state.mysteryIndex + 1,
            prayerIndex: 0,
          };
        } else {
          // Cannot increment mystery index if we're already at the last mystery
          return state;
        }
      }
      case OActionType.PreviousMystery: {
        if (state.mysteryIndex > 0) {
          return {
            ...state,
            mysteryIndex: state.mysteryIndex - 1,
            prayerIndex: fullRosary[state.mysteryIndex - 1].length - 1,
          };
        } else {
          // Cannot decrement mystery index if we're already at the first mystery
          return state;
        }
      }
      case OActionType.NextPrayer: {
        if (state.prayerIndex < fullRosary[state.mysteryIndex].length - 1) {
          return {
            ...state,
            prayerIndex: state.prayerIndex + 1,
          };
        } else {
          // If this is the final prayer, try to advance to the next mystery
          return reducer(state, { type: OActionType.NextMystery });
        }
      }
      case OActionType.PreviousPrayer: {
        if (state.prayerIndex > 0) {
          return {
            ...state,
            prayerIndex: state.prayerIndex - 1,
          };
        } else {
          // If this is the first prayer, try to go back to the previous mystery
          return reducer(state, { type: OActionType.PreviousMystery });
        }
      }
      case OActionType.ToggleInteractive: {
        return {
          ...state,
          isInteractive: !state.isInteractive,
        };
      }
      case OActionType.HitDoneButton: {
        return {
          ...state,
          hitDoneButton: true,
        };
      }
      case OActionType.ReverseDoneButton: {
        return {
          ...state,
          hitDoneButton: false,
        };
      }
      case OActionType.SetMysteryResponseData: {
        const { mysteryResponseData } = action;
        return {
          ...state,
          mysteryResponseData,
          prayerIndex: 0,
          mysteryIndex: 0,
        };
      }
      default:
        return state;
    }
  };
  return (
    state: ReadonlyDeep<RosaryTrackerState>,
    action: Action,
  ): ReadonlyDeep<RosaryTrackerState> => {
    const newState = reducer(state, action);
    return newState;
  };
}
