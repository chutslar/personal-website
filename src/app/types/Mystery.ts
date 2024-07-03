import ImageRecord from "./ImageRecord";
import MysteryName from "./MysteryName";

export type Message = {
  text: string;
  source: string;
};

type Mystery = {
  name: MysteryName;
  image: ImageRecord;
  messages: Message[];
};

export function mystery(
  name: MysteryName,
  image: ImageRecord,
  messages: Message[],
): Mystery {
  return {
    name,
    image,
    messages,
  };
}

export default Mystery;
