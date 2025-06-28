import { GameImage } from "@customTypes/Game";

import defaultGameThumbnailImage from "@assets/images/defaultGameThumbnail.png";

export const getGameImage = (
  images?: GameImage[],
  targetImage: "thumbnail" | "header" = "thumbnail",
) => {
  const defaultGameThumbnail = {
    id: 0,
    file_name: targetImage,
    alt: targetImage,
    file_url: defaultGameThumbnailImage,
  } as GameImage;
  if (!images?.length) return defaultGameThumbnail;
  return (
    images?.find((i) => i.file_name.startsWith(targetImage) && i.file_url) ??
    defaultGameThumbnail
  );
};
