import OActionType from "../enums/OActionType";

type ActionType = typeof OActionType[keyof typeof OActionType];

export default ActionType;