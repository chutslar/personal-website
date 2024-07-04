import ToggleInteractive from "../interfaces/EnableInteractive";
import HitDoneButton from "../interfaces/HitDoneButton";
import NextMystery from "../interfaces/NextMystery";
import NextPrayer from "../interfaces/NextPrayer";
import PreviousMystery from "../interfaces/PreviousMystery";
import PreviousPrayer from "../interfaces/PreviousPrayer";
import ReverseDoneButton from "../interfaces/ReverseDoneButton";
import SetMysteryResponseData from "../interfaces/SetMysteryResponseData";
import SetPausedMysteryIndex from "../interfaces/SetPausedMysteryIndex";

type Action =
  | ToggleInteractive
  | HitDoneButton
  | ReverseDoneButton
  | NextMystery
  | NextPrayer
  | SetMysteryResponseData
  | SetPausedMysteryIndex
  | PreviousMystery
  | PreviousPrayer;

export default Action;
