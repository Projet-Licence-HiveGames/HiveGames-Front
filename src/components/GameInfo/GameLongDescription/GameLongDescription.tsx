import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import "./GameLongDescription.css";

interface GameDescriptionProps {
  description: string;
}

export const GameLongDescription: React.FC<GameDescriptionProps> = ({
  description,
}) => {
  return (
    <div className="game-long-description-container">
      <div className="game-long-description">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{description}</ReactMarkdown>
      </div>
    </div>
  );
};
