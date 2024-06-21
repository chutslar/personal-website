import DisableInteractive from "../interfaces/DisableInteractive";
import EnableInteractive from "../interfaces/EnableInteractive";
import HitDoneButton from "../interfaces/HitDoneButton";
import NextMystery from "../interfaces/NextMystery";
import NextPrayer from "../interfaces/NextPrayer";
import PreviousMystery from "../interfaces/PreviousMystery";
import PreviousPrayer from "../interfaces/PreviousPrayer";
import SetMysteryResponseData from "../interfaces/SetMysteryResponseData";

type Action = DisableInteractive |
  EnableInteractive |
  HitDoneButton |
  NextMystery |
  NextPrayer |
  SetMysteryResponseData |
  PreviousMystery |
  PreviousPrayer;

export default Action;