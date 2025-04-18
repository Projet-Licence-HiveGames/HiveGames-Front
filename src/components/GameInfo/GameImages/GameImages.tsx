import React from "react";
import Flicking from "@egjs/react-flicking";

import { GameImage } from "../../../types/Game";

import "@egjs/react-flicking/dist/flicking.css";
import "./GameImages.css";

interface GameImagesProps {
  images?: GameImage[];
  thumbnail: GameImage;
}

export const GameImages: React.FC<GameImagesProps> = ({ 
  images,
  thumbnail,
 }) => {
  const slides = images?.filter(
    (i) => i.file_name.startsWith("slide") && i.file_url,
  );
  const _images = slides?.length
    ? slides
    : [thumbnail];

  return (
    <Flicking
      className="game-images"
      renderOnlyVisible={true}
      horizontal={true}
    >
      {_images.map((image, index) => (
        <div className="flicking-panel" key={index}>
          <img src={image?.file_url} alt={image?.alt} />
        </div>
      ))}
    </Flicking>
  );
};
