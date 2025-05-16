import { FC } from "react";
import classNames from "classnames";

import { GameReview } from "../../../types/Game";

import GameReviewItem from "./GameReviewItem";

import "./GameReviewSection.css";

interface GameReviewSectionProps {
  className?: string;
  reviews: GameReview[] | null;
}

const GameReviewSection: FC<GameReviewSectionProps> = ({
  className,
  reviews,
}) => {
  return (
    <div className={classNames("game-review-section-container", className)}>
      <div className="game-review-group-main">
        {reviews
          ?.filter((f) => !!f.commentary)
          .map((review) => <GameReviewItem key={review.id} review={review} />)}
      </div>
      <div className="game-review-group-rate">
        {reviews
          ?.filter((f) => !f.commentary)
          .map((review) => (
            <GameReviewItem key={review.id} review={review} RatingOnly />
          ))}
      </div>
    </div>
  );
};

export default GameReviewSection;
