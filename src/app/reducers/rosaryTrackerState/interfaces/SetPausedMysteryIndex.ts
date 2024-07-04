import OActionType from "../enums/OActionType";

export default interface SetPausedMysteryIndex {
  type: typeof OActionType.SetPausedMysteryIndex;

  pausedMysteryIndex: number | undefined;
}
