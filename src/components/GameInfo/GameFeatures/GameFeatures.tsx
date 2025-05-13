import React from "react";

import {
  featureIcons,
  translateFeature,
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
              {featureIcons[feature.label as keyof typeof featureIcons]}
            </div>
            <div className="game-features__list-item__title">
              <h3>
                {translateFeature(feature.label as keyof typeof featureIcons)}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
