import React from "react";
import ReactMarkdown from "react-markdown";

import { GameImage } from "@customTypes/Game";

import image from "@assets/images/defaultGameThumbnail.png";

import "./GameShortDescription.css";

interface GameDescriptionProps {
  description: string;
  thumbnail: GameImage;
}

export const GameShortDescription: React.FC<GameDescriptionProps> = ({
  description,
  thumbnail,
}) => {
  return (
    <div className="game-short-description-container">
      <div className="game-short-description-image">
        <img
          src={thumbnail?.file_url ?? image}
          srcSet={`${thumbnail?.file_url} 1x, ${thumbnail?.file_url} 2x`}
          alt={thumbnail?.alt}
        />
      </div>
      <div className="game-short-description">
        <ReactMarkdown
          allowedElements={["p", "strong", "em", "ul", "ol", "li", "br", "h3"]}
        >
          {description}
        </ReactMarkdown>
      </div>
    </div>
  );
};
