import React from "react";
import { Link } from "react-router-dom";
import { CheckRounded, CloseRounded } from "@mui/icons-material";

import { TranslationLanguageLabelType } from "../../../constants/LanguagesDict.tsx";
import { GameLanguageDetails } from "../../../types/Game";
import { TLabel } from "../../ui/TranslationLabel/TLabel.tsx";

import "./GameLanguages.css";

interface GameLanguagesProps {
  languages: GameLanguageDetails[];
}

export const GameLanguages: React.FC<GameLanguagesProps> = ({ languages }) => {
  const [showAll, setShowAll] = React.useState(false);

  const checkmarkCell = (checked: boolean = false) => {
    return <td>{checked ? <CheckRounded /> : <CloseRounded />}</td>;
  };

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
                <TLabel label="interfaces" />
              </th>
              <th>
                <TLabel label="subtitles" />
              </th>
              <th>
                <TLabel label="audio" />
              </th>
            </tr>
          </thead>
          <tbody>
            {languages
              ?.slice(0, showAll ? languages.length : 6)
              .map((language, index) => (
                <tr key={index}>
                  <td>
                    <Link
                      to={`/catalog?languages=${language.id}`}
                      className="game-languages-item-name"
                    >
                      <TLabel
                        label={language.label as TranslationLanguageLabelType}
                        translationType={"language"}
                      />
                    </Link>
                  </td>
                  {checkmarkCell(language.has_interface)}
                  {checkmarkCell(language.has_subtitles)}
                  {checkmarkCell(language.has_voice_over)}
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
              className={"languages-see-more__label"}
              label={"see_more"}
            />
          </div>
        )}
      </div>
    </div>
  );
};
