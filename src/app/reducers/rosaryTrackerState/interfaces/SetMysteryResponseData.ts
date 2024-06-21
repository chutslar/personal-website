import MysteryResponseData from "@/app/types/MysteryResponseData";
import OActionType from "../enums/OActionType";

export default interface SetMysteryResponseData {
  type: typeof OActionType.SetMysteryResponseData;

  mysteryResponseData: MysteryResponseData;
}
