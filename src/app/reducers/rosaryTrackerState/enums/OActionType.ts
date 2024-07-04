const OActionType = {
  NextMystery: "NextMystery",
  PreviousMystery: "PreviousMystery",
  NextPrayer: "NextPrayer",
  PreviousPrayer: "PreviousPrayer",
  ToggleInteractive: "ToggleInteractive",
  HitDoneButton: "HitDoneButton",
  ReverseDoneButton: "ReverseDoneButton",
  SetMysteryResponseData: "SetMysteryResponseData",
  SetPausedMysteryIndex: "SetPausedMysteryIndex",
} as const;

export default OActionType;
