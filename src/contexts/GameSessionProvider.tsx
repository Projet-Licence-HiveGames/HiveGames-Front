import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useFetch } from "@api/privateApi";

import { GameBaseType } from "@customTypes/Game";

import { GameSession } from "@pages/GameSession/GameSession";

import { AuthContext } from "./AuthProvider";

interface GameSessionContextProps {
  isOpen: boolean;
  game: GameBaseType | null;
  setIsOpen: (isOpen: boolean) => void;
  startGameSession: (gameId: number, gameName: string) => void;
  endGameSession: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const GameSessionContext = createContext<GameSessionContextProps>({
  isOpen: false,
  game: null,
  setIsOpen: () => {},
  startGameSession: () => {},
  endGameSession: () => {},
});

export const GameSessionProvider = ({ children }: { children: ReactNode }) => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tempGameName, setTempGameName] = useState<string | null>(null);
  const [game, setGame] = useState<GameBaseType | null>(null);
  const fetchAPI = useFetch();

  const startGameSession = async (gameId: number, gameName: string) => {
    setTempGameName(gameName);
    setIsLoading(true);
    setIsOpen(true);
    // get game data from API with gameId
    let gameData = await fetchAPI
      .get<GameBaseType>(`/games/${gameId}`)
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
    console.log("endGameSession", game, user?.id); // eslint-disable-line
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
          game={game}
          isLoading={isLoading}
          isOpen={isOpen}
          onCloseGameSession={endGameSession}
          tempGameName={tempGameName}
        />
      )}
    </GameSessionContext.Provider>
  );
};
