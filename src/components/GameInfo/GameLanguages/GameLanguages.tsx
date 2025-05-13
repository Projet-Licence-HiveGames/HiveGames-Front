import React from "react";
import { CheckRounded, CloseRounded } from "@mui/icons-material";

import { translateLanguage } from "../../../constants/LanguagesDict.tsx";
import { GameLanguage } from "../../../types/Game";
import { TLabel } from "../../ui/TranslationLabel/TLabel.tsx";

import "./GameLanguages.css";

interface GameLanguagesProps {
  languages: GameLanguage[];
}

export const GameLanguages: React.FC<GameLanguagesProps> = ({ languages }) => {
  const [showAll, setShowAll] = React.useState(false);

  return (
    <div className="game-languages-container">
      <div className="game-languages__title">
        <TLabel baliseType={"h2"} label="languages" />
      </div>
      <div className="game-languages__list">
        <table>
          <thead>
            <tr>
              <th />
              <th>
                <TLabel baliseType={"span"} label="interfaces" />
              </th>
              <th>
                <TLabel baliseType={"span"} label="subtitles" />
              </th>
              <th>
                <TLabel baliseType={"span"} label="audio" />
              </th>
            </tr>
          </thead>
          <tbody>
            {languages
              ?.slice(0, showAll ? languages.length : 6)
              .map((language, index) => (
                <tr key={index}>
                  <td>
                    {translateLanguage(
                      language.label as keyof typeof translateLanguage,
                    )}
                  </td>
                  <td>
                    {language.has_interface ? (
                      <CheckRounded />
                    ) : (
                      <CloseRounded />
                    )}
                  </td>
                  <td>
                    {language.has_subtitles ? (
                      <CheckRounded />
                    ) : (
                      <CloseRounded />
                    )}
                  </td>
                  <td>
                    {language.has_voice_over ? (
                      <CheckRounded />
                    ) : (
                      <CloseRounded />
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {!showAll && languages?.length > 6 && (
          <div
            className={"languages-see-more"}
            onClick={() => setShowAll(true)}
          >
            <TLabel
              baliseType={"span"}
              className={"languages-see-more__label"}
              label={"see_more"}
            />
          </div>
        )}
      </div>
    </div>
  );
};
