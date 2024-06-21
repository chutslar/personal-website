import OMysteryName from "../enums/OMysteryName";

type MysteryName = (typeof OMysteryName)[keyof typeof OMysteryName];

export default MysteryName;
