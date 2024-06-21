import Mystery from "./Mystery";
import MysteryCategory from "./MysteryCategory"

type MysteryResponseData = {
  category: MysteryCategory;
  mysteries: Mystery[];
};

export default MysteryResponseData;