import { FC, useState } from "react";
import { Textarea } from "@mui/joy";
import classNames from "classnames";

import { capitalizeFirstLetter } from "../../../utils/capitalizeFirstLetter";
import { TLabel, TText } from "../../ui/TranslationLabel/TLabel";

import "./ReviewEditor.css";

const MAX_COMMENTARY_LENGTH = 516;

interface ReviewEditorProps {
  gameName: string;
}

const ReviewEditor: FC<ReviewEditorProps> = ({ gameName }) => {
  const [textCommentary, setTextCommentary] = useState<string>("");

  return (
    <div className="review-editor-container">
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
      <div className="review-editor-content">
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
            maxRows={7}
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
        <div className="editor-rating"></div>
      </div>
    </div>
  );
};

export default ReviewEditor;
