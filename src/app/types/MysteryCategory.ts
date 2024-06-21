import OMysteryCategory from "../enums/OMysteryCategory";

type MysteryCategory = (typeof OMysteryCategory)[keyof typeof OMysteryCategory]

export default MysteryCategory;