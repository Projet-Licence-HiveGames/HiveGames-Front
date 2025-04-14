import React from "react";
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import "./GameImages.css";

interface ImageType {
  file_name: string;
  alt: string;
}

interface GameImagesProps {
  images: ImageType[];
}

export const GameImages: React.FC<GameImagesProps> = ({ images }) => {
  console.log(images);
  return (
    <Flicking className="game-images" renderOnlyVisible={true} horizontal={true}>
      {images.map((image, index) => (
        <div className="flicking-panel" key={index}>
          <img src={image.file_name} alt={image.alt} />
        </div>
      ))}
    </Flicking>
  );
};
