import React from "react";

import {
  featureIcons,
  TranslationFeatureLabelType,
} from "../../../constants/FeaturesDict";
import { GameFeature } from "../../../types/Game";
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
          <div className="game-features__list-item" key={index}>
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
          </div>
        ))}
      </div>
    </div>
  );
};
