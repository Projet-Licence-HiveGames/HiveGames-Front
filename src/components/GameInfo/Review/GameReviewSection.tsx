import { FC } from "react";
import classNames from "classnames";

import { GameReview } from "../../../types/Game";
import { TLabel } from "../../ui/TranslationLabel/TLabel";

import GameReviewItem from "./GameReviewItem";
import ReviewEditor from "./ReviewEditor";

import "./GameReviewSection.css";

interface GameReviewSectionProps {
  className?: string;
  gameName: string;
  reviews: GameReview[] | null;
}

const GameReviewSection: FC<GameReviewSectionProps> = ({
  className,
  gameName,
  reviews,
}) => {
  const onlyRatings = reviews?.filter((f) => !f.commentary);
  return (
    <div className={classNames("game-review-section-container", className)}>
      <TLabel
        className="game-review-section-title"
        label="reviews"
        baliseType={"h2"}
      />
      <ReviewEditor gameName={gameName} />
      <div className="game-review-group-content">
        <div className="game-review-group-main">
          {reviews
            ?.filter((f) => !!f.commentary)
            .map((review) => (
              <GameReviewItem key={review.id} review={review} />
            ))}
        </div>
        {!!onlyRatings?.length && (
          <div className="game-review-group-rate">
            {onlyRatings.map((review) => (
              <GameReviewItem key={review.id} review={review} RatingOnly />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GameReviewSection;
