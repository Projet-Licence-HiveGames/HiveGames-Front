import { FC } from "react";
import { Rating } from "@mui/material";
import classNames from "classnames";

import { GameReview } from "@customTypes/Game";
import { TranslationLabelType } from "@utils/translations";

import ImageWithLoader from "../../ui/Image/ImageWithLoader";
import { TLabel } from "../../ui/TranslationLabel/TLabel";

import defaultGameThumbnailImage from "@assets/images/defaultGameThumbnail.png";

import "./GameReviewItem.css";

interface GameReviewProps {
  className?: string;
  review: GameReview;
  RatingOnly?: boolean;
}

const GameReviewItem: FC<GameReviewProps> = ({
  className,
  review,
  RatingOnly,
}) => {
  const hasRating =
    !!review.gameplay_rate ||
    !!review.graphics_rate ||
    !!review.sound_design_rate ||
    !!review.story_rate ||
    !!review.translation_quality_rate ||
    !!review.usability_rate ||
    !!review.value_for_money_rate;

  const reviewRatingKeys = [
    "gameplay_rate",
    "graphics_rate",
    "sound_design_rate",
    "story_rate",
    "translation_quality_rate",
    "usability_rate",
    "value_for_money_rate",
  ] as const;

  return (
    <div className={classNames("game-review-container", className)}>
      <div className="game-review-header">
        <div className="game-review-user-info">
          <ImageWithLoader
            alt={review.user.pseudo}
            className="game-review-content-user-avatar"
            loaderSrc={defaultGameThumbnailImage}
            src={review.user.avatar_path ?? defaultGameThumbnailImage}
          />
          <span className="game-review-content-username">
            {review.user.pseudo}
          </span>
        </div>
        <span className="game-review-date regular-12">
          {new Date(review.created_at).toLocaleDateString()}
        </span>
      </div>
      <div
        className={classNames("game-review-content", {
          "game-review-content-rate-only": RatingOnly,
        })}
      >
        {review.commentary && !RatingOnly && (
          <span className="game-review-commentary">{review.commentary}</span>
        )}
        {hasRating && (
          <div className="game-review-content-rating">
            <div className="game-review-content-rating-title">
              <TLabel label="review.rating" />
            </div>
            <div className="game-review-content-rating-values">
              {reviewRatingKeys.map((key) => (
                <span className="game-review-content-rating-label" key={key}>
                  <TLabel label={`review.${key}` as TranslationLabelType} />
                  <Rating precision={1} readOnly value={review[key]} />
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameReviewItem;
