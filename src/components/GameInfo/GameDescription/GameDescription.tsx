import React from "react";
import { GameImage } from "../../../types/Game";
import image from "@assets/images/image_49.png";
import "./GameDescription.css";

interface GameDescriptionProps {
  description: string;
  thumbnail?: GameImage;
}

export const GameDescription: React.FC<GameDescriptionProps> = ({
  description,
  thumbnail,
}) => {
  return (
    <div className="game-description-container">
      <div className="game-images">
        <img src={thumbnail?.file_url ?? image} alt={thumbnail?.alt} />
      </div>
      <div className="game-description">
        <p>{description}</p>
      </div>
    </div>
  );
};
