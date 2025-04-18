import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import toast from "react-hot-toast";

import { useFetch } from "../api/privateApi";
import { GameSession } from "../pages/GameSession/GameSession";
import { Game } from "../types/Game";

import { AuthContext } from "./AuthProvider";

interface GameSessionContextProps {
  isOpen: boolean;
  game: Game | null;
  setIsOpen: (isOpen: boolean) => void;
  startGameSession: (gameId: number, gameName: string) => void;
  endGameSession: () => void;
}

export const GameSessionContext = createContext<GameSessionContextProps>({
  isOpen: false,
  game: null,
  setIsOpen: () => {},
  startGameSession: () => {},
  endGameSession: () => {},
});

export const GameSessionProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tempGameName, setTempGameName] = useState<string | null>(null);
  const [game, setGame] = useState<Game | null>(null);
  const fetchAPI = useFetch();

  const { isAuthenticated } = useContext(AuthContext);

  const startGameSession = async (gameId: number, gameName: string) => {
    setTempGameName(gameName);
    setIsLoading(true);
    setIsOpen(true);
    // get game data from API with gameId
    let gameData = await fetchAPI
      .get<Game>(`/games/${gameId}`)
      .catch(() => null);
    if (!gameData) {
      toast.error("Une erreur est survenue lors de la récupération du jeu.");
      setIsLoading(false);
      setIsOpen(false);
      return;
    }

    setGame(gameData);
    // get uuid pour gameSession
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const endGameSession = () => {
    // put end date to game session
    console.log("endGameSession", game, user?.id);
    setIsOpen(false);
    setGame(null);
  };

  const contextValue = useMemo(
    () => ({
      isOpen,
      tempGameName,
      game,
      setIsOpen,
      startGameSession,
      endGameSession,
    }),
    [isOpen, game, tempGameName],
  );

  return (
    <GameSessionContext.Provider value={contextValue}>
      {children}
      {isAuthenticated && (
        <GameSession
          tempGameName={tempGameName}
          game={game}
          isOpen={isOpen}
          isLoading={isLoading}
          onCloseGameSession={endGameSession}
        />
      )}
    </GameSessionContext.Provider>
  );
};
