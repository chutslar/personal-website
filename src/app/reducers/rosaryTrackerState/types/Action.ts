import ToggleInteractive from "../interfaces/EnableInteractive";
import HitDoneButton from "../interfaces/HitDoneButton";
import NextMystery from "../interfaces/NextMystery";
import NextPrayer from "../interfaces/NextPrayer";
import PreviousMystery from "../interfaces/PreviousMystery";
import PreviousPrayer from "../interfaces/PreviousPrayer";
import ReverseDoneButton from "../interfaces/ReverseDoneButton";
import SetMysteryResponseData from "../interfaces/SetMysteryResponseData";

type Action =
  | ToggleInteractive
  | HitDoneButton
  | ReverseDoneButton
  | NextMystery
  | NextPrayer
  | SetMysteryResponseData
  | PreviousMystery
  | PreviousPrayer;

export default Action;
