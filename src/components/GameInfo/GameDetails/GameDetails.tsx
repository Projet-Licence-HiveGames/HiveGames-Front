import React from "react";

import { GameCategory, GameStudio } from "../../../types/Game.ts";
import { capitalizeFirstLetter } from "../../../utils/capitalizeFirstLetter.ts";
import Category from "../../CustomBloc/CategoryBloc/Category.tsx";
import { useWindowSize } from "../../../utils/useWindowSize.ts";

import "./GameDetails.css";

interface GameDetailsProps {
  title: string;
  studio: GameStudio[];
  release_date: string;
  categories: GameCategory[];
  description: string;
}

export const GameDetails: React.FC<GameDetailsProps> = ({
  title,
  studio,
  release_date,
  categories,
  description,
}) => {
  const { isLaptop, isDesktop } = useWindowSize();

  return (
    <div className="game-details">
      {(isLaptop || isDesktop) && <hr />}
      <div className="details-container">
        <div className="detail-item-description">
          <span className="detail-value">{description}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Titre :</span>
          <span className="detail-value">{capitalizeFirstLetter(title || "")}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Date de sortie :</span>
          <span className="detail-value">{release_date}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Studio :</span>
          {/* {studio.length > 0 && studio[0].logo_path && <img src={studio[0].logo_path} alt="studio" />} */}
          <span className="detail-value">
            {studio.map((s) => capitalizeFirstLetter(s.name)).join(", ")}
          </span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Genre :</span>
          <Category category={categories?.map((category) => category.label)} />
        </div>
      </div>
    </div>
  );
};
