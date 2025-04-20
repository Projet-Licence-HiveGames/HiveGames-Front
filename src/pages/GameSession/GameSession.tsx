import { FC, useContext, useEffect } from "react";
import { MaterialSymbol } from "react-material-symbols";
import CircularProgress from "@mui/joy/CircularProgress";
import classNames from "classnames";

import { AuthContext } from "../../context/AuthProvider";
import { Game } from "../../types/Game";

import "./GameSession.css";

interface GameSessionProps {
  tempGameName: string | null;
  game: Game | null;
  isOpen: boolean;
  isLoading: boolean;
  onCloseGameSession: () => void;
}

export const GameSession: FC<GameSessionProps> = ({
  tempGameName,
  game,
  isOpen,
  isLoading = false,
  onCloseGameSession,
}) => {
  const { user } = useContext(AuthContext);
  useEffect(() => {
    if (user && game) {
      setupConnection();
    }
  }, [game, user]);

  const setupConnection = () => {
    console.log("setupConnection", game, user?.id); // eslint-disable-line
  };

  const handleGameSessionClose = () => {
    setTimeout(() => {
      onCloseGameSession();
    }, 500);
  };

  return (
    <div
      className={classNames("game-session-container", {
        "game-session-container--open":
          isOpen && ((!isLoading && game) || isLoading),
      })}
    >
      {isLoading ? (
        <div className="game-session-loading">
          <span className="game-session-loading-title">
            <MaterialSymbol icon="gamepad" /> {game?.name ?? tempGameName}
          </span>
          <span>
            {game
              ? "Lancement en cours..."
              : "Récupération des informations du jeu..."}
          </span>
          <CircularProgress variant="soft" size="md" />
        </div>
      ) : (
        <div className="game-session-overlay">
          {/* <iframe src='https://hivegames-cloudgaming.com/session/128a8b2e-b647-4d1e-8792-70e8154df585' title='Game title' width={'100%'} height={'100%'} /> */}
          <iframe
            src="https://projet-licence-hivegames.github.io/Cookie-Clicker-Source-Code/"
            title="Cookie Clicker"
            width={"100%"}
            height={"100%"}
          />
          <MaterialSymbol
            icon="close"
            onClick={handleGameSessionClose}
            className="game-session-close"
          />
        </div>
      )}
    </div>
  );
};
