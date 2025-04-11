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
  return (
    <Flicking className="game-images" circular={true}>
      {images.map((image, index) => (
        <div className="image-panel" key={index}>
          <img src={image.file_name} alt={image.alt} />
        </div>
      ))}
    </Flicking>
  );
};
