import { Game, GameDlc, GameImage } from "../types/Game";

import defaultGameThumbnailImage from "@assets/images/defaultGameThumbnail.png";

export const getGameThumbnail = (images?: GameImage[]) => {
  const defaultGameThumbnail = {
    id: 0,
    file_name: "thumbnail",
    alt: "Thumbnail de jeu",
    file_url: defaultGameThumbnailImage,
  } as GameImage;
  if (!images) return defaultGameThumbnail;
  return (
    images?.find((i) => i.file_name.startsWith("thumbnail") && i.file_url) ??
    defaultGameThumbnail
  );
};

export const getGameHeader = (game?: Game) => {
  const defaultGameHeader = {
    id: 0,
    file_name: "header",
    alt: "Header de jeu",
    file_url: defaultGameThumbnailImage,
  } as GameImage;
  if (!game) return defaultGameHeader;
  return (
    game.images?.find((i) => i.file_name.startsWith("header") && i.file_url) ??
    defaultGameHeader
  );
};
