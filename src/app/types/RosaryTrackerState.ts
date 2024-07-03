import MysteryResponseData from "./MysteryResponseData";

type RosaryTrackerState = {
  mysteryResponseData?: MysteryResponseData;
  date: Date;
  mysteryIndex: number;
  prayerIndex: number;
  isInteractive: boolean;
  hitDoneButton: boolean;
};

export default RosaryTrackerState;
