import React from "react";
import { GameCategory, GameStudio } from "../../../types/Game.ts";
import "./GameDetails.css";
import Category from "../../CustomBloc/CategoryBloc/Category.tsx";

interface GameDetailsProps {
  studio: GameStudio[];
  release_date: string;
  categories: GameCategory[];
}

export const GameDetails: React.FC<GameDetailsProps> = ({ studio, release_date, categories }) => {
    const capitalizeFirstLetter = (string: string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

  return (
    <div className="game-details">
      <h2>Détails du jeu</h2>
      <div className="details-container">
        <div className="detail-item">
          <span className="detail-label">Studio</span>
          <span className="detail-value">{studio?.map((studio) => capitalizeFirstLetter(studio.name)).join(", ")}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Date de sortie</span>
          <span className="detail-value">{release_date}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Genre</span>
          <Category category={categories?.map((category) => category.label)} />
        </div>
      </div>
    </div>
  );
}; 