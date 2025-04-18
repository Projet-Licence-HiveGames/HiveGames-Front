import React from "react";

import "./GameDescription.css";

interface ImageType {
  file_name: string;
  alt?: string;
}

interface GameDescriptionProps {
  description: string;
  images: ImageType[];
}

export const GameDescription: React.FC<GameDescriptionProps> = ({
  description,
  images,
}) => {
  return (
    <div className="game-description-container">
      <div className="game-images">
        <img src={images[0]?.file_name} alt={images[0]?.alt} />
      </div>
      <div className="game-description">
        <p>{description}</p>
      </div>
    </div>
  );
};
