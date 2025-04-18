import React from "react";
import Flicking from "@egjs/react-flicking";
import { GameImage } from "../../../types/Game";
import image from "@assets/images/image_49.png";

import "@egjs/react-flicking/dist/flicking.css";
import "./GameImages.css";

interface GameImagesProps {
  images?: GameImage[];
}

export const GameImages: React.FC<GameImagesProps> = ({ images }) => {
  const slides = images?.filter(i => i.file_name.startsWith('slide') && i.file_url)
  const _images = slides?.length ?
    slides :
    [images?.find(i => i.file_name.startsWith('thumbnail') && i.file_url) ?? {
      id: 0,
      file_name: "thumbnail",
      alt: "Image 1",
      file_url: image
    } as GameImage];

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
      )
      )}
    </Flicking>
  );
};
