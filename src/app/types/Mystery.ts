import ImageRecord from "./ImageRecord";
import MysteryName from "./MysteryName";

type Mystery = {
  name: MysteryName;
  image: ImageRecord;
  messages: string[];
};

export function mystery(
  name: MysteryName,
  image: ImageRecord,
  messages: string[],
): Mystery {
  return {
    name,
    image,
    messages,
  };
}

export default Mystery;
