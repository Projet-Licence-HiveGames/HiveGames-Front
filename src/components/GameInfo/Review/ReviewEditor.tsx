import { FC, useContext, useState } from "react";
import { toast } from "react-toastify";
import { Textarea } from "@mui/joy";
import { Rating } from "@mui/material";
import classNames from "classnames";

import { useFetch } from "../../../api/privateApi";
import { AuthContext } from "../../../context/AuthProvider";
import { useOutsideClick } from "../../../hooks/useOutsideClick";
import { GameReview, ReviewRatings } from "../../../types/Game";
import { capitalizeFirstLetter } from "../../../utils/capitalizeFirstLetter";
import { TranslationLabelType } from "../../../utils/translations";
import { TLabel, TText } from "../../ui/TranslationLabel/TLabel";

import "./ReviewEditor.css";

const MAX_COMMENTARY_LENGTH = 512;
const DEFAULT_RATING_VALUE: ReviewRatings = {
  gameplay_rate: null,
  graphics_rate: null,
  sound_design_rate: null,
  story_rate: null,
  translation_quality_rate: null,
  usability_rate: null,
  value_for_money_rate: null,
};

interface ReviewEditorProps {
  game: { id: number; name: string };
  updateReviewList: (review: GameReview) => void;
}

const ReviewEditor: FC<ReviewEditorProps> = ({ game, updateReviewList }) => {
  const fetchAPI = useFetch();
  const { isAuthenticated } = useContext(AuthContext);
  const [textCommentary, setTextCommentary] = useState<string>("");
  const [ratingValues, setRatingValues] =
    useState<ReviewRatings>(DEFAULT_RATING_VALUE);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const ref = useOutsideClick<HTMLDivElement>(() => {
    if (
      isFocused &&
      textCommentary.length === 0 &&
      Object.values(ratingValues).every((value) => value === null)
    ) {
      setIsFocused(false);
    }
  });

  const allRatingsFilled = Object.values(ratingValues).every(
    (value) => value !== null,
  );
  const noRatingsFilled = Object.values(ratingValues).every(
    (value) => value === null,
  );
  const hasText = textCommentary.trim().length > 0;

  const disableSubmit =
    !(
      (hasText && (allRatingsFilled || noRatingsFilled)) ||
      (!hasText && allRatingsFilled)
    ) || isSubmitting;

  const handleSubmit = () => {
    if (disableSubmit) return;
    if (!isAuthenticated) {
      toast.error(
        <TLabel
          label="error.not_authenticated"
          replaceValues={{
            action: <TText label="review.editor.submit_review" />,
          }}
        />,
      );
      return;
    }
    setIsSubmitting(true);
    fetchAPI
      .post<GameReview>(`/games/${game.id}/review`, {
        commentary: textCommentary,
        ...ratingValues,
      })
      .then((newReview) => {
        updateReviewList(newReview);
        setTextCommentary("");
        setRatingValues(DEFAULT_RATING_VALUE);
        setIsFocused(false);
        toast.success(<TLabel label="review.editor.submit.success" />);
      })
      .catch((response) => {
        if (response.status == 403) {
          toast.error(
            <TLabel label="review.editor.already_submitted_last_24h" />,
          );
        } else {
          toast.error(<TLabel label="error.something_went_wrong" />);
        }
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <div
      ref={ref}
      className="review-editor-container"
      onFocus={() => setIsFocused(true)}
    >
      <div className="review-editor-header">
        <TLabel
          className="review-editor-header_subtitle"
          label="review.editor.subtitle"
          replaceValues={{
            game_name: (
              <span className="review-editor-header_game-name">
                {capitalizeFirstLetter(game.name)}
              </span>
            ),
          }}
        />
      </div>
      <div
        className={classNames("review-editor-content", {
          "review-editor-content-focused": isFocused,
        })}
        onClick={() => setIsFocused(true)}
      >
        <div className="review-editor-commentary">
          <Textarea
            className="editor-textarea"
            placeholder={TText({
              label: "review.editor.commentary.placeholder",
            })}
            value={textCommentary}
            onChange={(e) =>
              e.target.value.length <= MAX_COMMENTARY_LENGTH &&
              setTextCommentary(e.target.value)
            }
            maxRows={10}
          />
          {textCommentary.length > 0 && (
            <span
              className={classNames("editor-textarea-length", {
                "editor-textarea-length-max":
                  textCommentary.length >= MAX_COMMENTARY_LENGTH,
              })}
            >
              {textCommentary.length} / {MAX_COMMENTARY_LENGTH}
            </span>
          )}
        </div>
        <div className="editor-rating">
          <TLabel className="editor-rating_title" label="review.rating" />
          <div className="editor-rating-values">
            {Object.entries(ratingValues).map(([key, value]) => (
              <div key={key} className="editor-rating-value">
                <TLabel
                  label={`review.${key}` as TranslationLabelType}
                  baliseType="span"
                />
                <Rating
                  className="editor-rating_star"
                  name={key}
                  value={value}
                  onChange={(_, newValue) => {
                    setRatingValues((prev) => ({
                      ...prev,
                      [key]: newValue,
                    }));
                  }}
                  precision={1}
                  size="medium"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {isFocused && (
        <button
          className="review-editor-submit-button"
          onClick={handleSubmit}
          disabled={disableSubmit}
        >
          <TLabel
            label="review.editor.submit"
            className="review-editor-submit-button_label"
          />
        </button>
      )}
    </div>
  );
};

export default ReviewEditor;
