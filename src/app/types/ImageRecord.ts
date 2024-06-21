import { StaticImageData } from "next/image"

type ImageRecord = {
  image: StaticImageData;
  caption: string;
};

export function imageRecord(image: StaticImageData, caption: string): ImageRecord {
  return {
    image,
    caption,
  };
}

export default ImageRecord;
