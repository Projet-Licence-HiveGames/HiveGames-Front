import { FC, useState } from "react";
import { Textarea } from "@mui/joy";
import { Rating } from "@mui/material";
import classNames from "classnames";

import { useOutsideClick } from "../../../hooks/useOutsideClick";
import { ReviewRatings } from "../../../types/Game";
import { capitalizeFirstLetter } from "../../../utils/capitalizeFirstLetter";
import { TranslationLabelType } from "../../../utils/translations";
import { TLabel, TText } from "../../ui/TranslationLabel/TLabel";

import "./ReviewEditor.css";

const MAX_COMMENTARY_LENGTH = 516;

interface ReviewEditorProps {
  gameName: string;
}

const ReviewEditor: FC<ReviewEditorProps> = ({ gameName }) => {
  const [textCommentary, setTextCommentary] = useState<string>("");
  const [ratingValues, setRatingValues] = useState<ReviewRatings>({
    gameplay_rate: null,
    graphics_rate: null,
    sound_design_rate: null,
    story_rate: null,
    translation_quality_rate: null,
    usability_rate: null,
    value_for_money_rate: null,
  });
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const ref = useOutsideClick<HTMLDivElement>(() => {
    if (
      isFocused &&
      textCommentary.length === 0 &&
      Object.values(ratingValues).every((value) => value === null)
    ) {
      setIsFocused(false);
    }
  });

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
                {capitalizeFirstLetter(gameName)}
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
                  value={value ?? 0}
                  onChange={(_, newValue) => {
                    setRatingValues((prev) => ({
                      ...prev,
                      [key]: newValue,
                    }));
                  }}
                  precision={0.5}
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
          onClick={() => {
            alert("Submit functionality not implemented yet.");
          }}
          disabled={
            textCommentary.length === 0 &&
            !Object.values(ratingValues).some((value) => value !== null)
          }
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
