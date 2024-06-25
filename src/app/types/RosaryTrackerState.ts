import Mystery from "./Mystery";
import MysteryResponseData from "./MysteryResponseData";
import PrayerRecord from "./PrayerRecord";

type RosaryTrackerState = {
  mysteryResponseData?: MysteryResponseData;
  date: Date;
  mysteryIndex: number;
  prayerIndex: number;
  isInteractive: boolean;
  hitDoneButton: boolean;
};

export default RosaryTrackerState;
