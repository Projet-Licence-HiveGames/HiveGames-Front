import { FC } from "react";
import { Rating } from "@mui/material";
import classNames from "classnames";

import { GameReview } from "../../../types/Game";
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

  return (
    <div className={classNames("game-review-container", className)}>
      <div className="game-review-header">
        <div className="game-review-user-info">
          <ImageWithLoader
            className="game-review-content-user-avatar"
            src={review.user.avatar_path ?? defaultGameThumbnailImage}
            alt={review.user.pseudo}
            loaderSrc={defaultGameThumbnailImage}
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
              <span className="game-review-content-rating-label">
                <TLabel label="review.gameplay_rate" />
                <Rating precision={0.5} value={review.gameplay_rate} readOnly />
              </span>
              <span className="game-review-content-rating-label">
                <TLabel label="review.graphics_rate" />
                <Rating precision={0.5} value={review.graphics_rate} readOnly />
              </span>
              <span className="game-review-content-rating-label">
                <TLabel label="review.sound_design_rate" />
                <Rating
                  precision={0.5}
                  value={review.sound_design_rate}
                  readOnly
                />
              </span>
              <span className="game-review-content-rating-label">
                <TLabel label="review.story_rate" />
                <Rating precision={0.5} value={review.story_rate} readOnly />
              </span>
              <span className="game-review-content-rating-label">
                <TLabel label="review.translation_quality_rate" />
                <Rating
                  precision={0.5}
                  value={review.translation_quality_rate}
                  readOnly
                />
              </span>
              <span className="game-review-content-rating-label">
                <TLabel label="review.usability_rate" />
                <Rating
                  precision={0.5}
                  value={review.usability_rate}
                  readOnly
                />
              </span>
              <span className="game-review-content-rating-label">
                <TLabel label="review.value_for_money_rate" />
                <Rating
                  precision={0.5}
                  value={review.value_for_money_rate}
                  readOnly
                />
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameReviewItem;
