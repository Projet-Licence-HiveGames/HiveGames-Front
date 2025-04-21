import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { Game } from "../../../types/Game";
import { TLabel } from "../../ui/TranslationLabel/TLabel.tsx";
import { translateLanguage } from "../../../constants/LanguagesDict.tsx";

import './GameLanguages.css';

interface GameLanguagesProps {
    game: Game['languages'];
}

export const GameLanguages = ({ game }: GameLanguagesProps) => {
    return (
        <div className='game-languages-container'>
            <div className='game-languages__title'>
                <TLabel
                    baliseType={"h2"}
                    label="languages"
                />
            </div>
            <div className='game-languages__list'>
                <table>
                    <thead>
                    <tr>
                        <th/>
                        <th>Interface</th>
                        <th>Subtitles</th>
                        <th>Audio</th>
                    </tr>
                    </thead>
                    <tbody>
                    {game?.map((language, index) => (
                        <tr key={index}>
                            <td>{translateLanguage(language.label as keyof typeof translateLanguage)}</td>
                            <td>{!!language.has_interface && <CheckRoundedIcon/>}</td>
                            <td>{!!language.has_subtitles && <CheckRoundedIcon/>}</td>
                            <td>{!!language.has_voice_over && <CheckRoundedIcon/>}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
