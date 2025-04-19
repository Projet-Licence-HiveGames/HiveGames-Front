import React from "react";

import { GameImage } from "../../../types/Game";

import image from "@assets/images/defaultGameThumbnail.png";

import "./GameDescription.css";

interface GameDescriptionProps {
  description: string;
  thumbnail: GameImage;
}

export const GameDescription: React.FC<GameDescriptionProps> = ({
  description,
  thumbnail,
}) => {
  return (
    <div className="game-description-container">
      <div className="game-description-image">
        <img 
          src={thumbnail?.file_url ?? image}
          srcSet={`${thumbnail?.file_url} 1x, ${thumbnail?.file_url} 2x`}
          alt={thumbnail?.alt} />
      </div>
      <div className="game-description">
        <p>{description}</p>
      </div>
    </div>
  );
};
