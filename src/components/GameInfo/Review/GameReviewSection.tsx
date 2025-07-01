import { FC, useCallback, useEffect, useState } from "react";
import { useFetch } from "@api/privateApi";
import { useGamesApi } from "@api/services/gamesApi";
import classNames from "classnames";

import { GameReview } from "@customTypes/Game";

import { Loader } from "@components/ui/Loader/Loader";

import { TLabel } from "../../ui/TranslationLabel/TLabel";

import GameReviewItem from "./GameReviewItem";
import ReviewEditor from "./ReviewEditor";

import "./GameReviewSection.css";

interface GameReviewSectionProps {
  className?: string;
  game: { id: number; name: string };
}

const GameReviewSection: FC<GameReviewSectionProps> = ({ className, game }) => {
  const fetchAPI = useFetch();
  const { fetchGameReviews } = useGamesApi();

  const [reviews, setReviews] = useState<GameReview[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchGameReviews(game.id)
      .then(setReviews)
      .finally(() => setIsLoading(false));
  }, []);

  const addNewUserReview = useCallback(
    (review: GameReview) => {
      setReviews((prev) => {
        if (!prev) return prev;
        return [review, ...(prev || [])];
      });
    },
    [setReviews],
  );

  const onlyRatings = reviews?.filter((f) => !f.commentary);
  return (
    <div className={classNames("game-review-section-container", className)}>
      <TLabel
        className="game-review-section-title"
        label="reviews"
        baliseType={"h2"}
      />
      <ReviewEditor game={game} updateReviewList={addNewUserReview} />
      <div className="game-review-group-content">
        {isLoading ? (
          <Loader />
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default GameReviewSection;
