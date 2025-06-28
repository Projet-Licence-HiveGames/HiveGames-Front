import React from "react";
import { Link } from "react-router-dom";
import {
  featureIcons,
  TranslationFeatureLabelType,
} from "@constants/FeaturesDict";

import { GameFeature } from "@customTypes/Game";

import { TLabel } from "../../ui/TranslationLabel/TLabel.tsx";

import "./GameFeatures.css";

interface GameFeaturesProps {
  features: GameFeature[];
}

export const GameFeatures: React.FC<GameFeaturesProps> = ({ features }) => {
  return (
    <div className="game-features-container">
      <div className="game-features__title">
        <TLabel baliseType={"h2"} label="features" />
      </div>
      <div className="game-features__list">
        {features?.map((feature, index) => (
          <Link
            to={`/catalog?features=${feature.id}`}
            className="game-features__list-item"
            key={index}
          >
            <div className="game-features__list-item__icon">
              {featureIcons[feature.label as TranslationFeatureLabelType]}
            </div>
            <div className="game-features__list-item__title">
              <TLabel
                baliseType={"h3"}
                translationType={"feature"}
                label={feature.label as TranslationFeatureLabelType}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
