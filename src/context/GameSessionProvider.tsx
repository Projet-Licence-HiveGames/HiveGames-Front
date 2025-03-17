import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

import { GameSession } from '../pages/GameSession/GameSession';
import { AuthContext } from './AuthProvider';
import { Game } from '../types/Game';

interface GameSessionContextProps {
  isOpen: boolean;
  game: Game | null;
  setIsOpen: (isOpen: boolean) => void;
  startGameSession: (gameId: number) => void;
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
  const [game, setGame] = useState<Game | null>(null);

  const { isAuthenticated } = useContext(AuthContext);

  const startGameSession = (gameId: number) => {
    setIsLoading(true);
    setIsOpen(true);
    // get game data from API with gameId
    const gameFromApi: Game = {
      id: 1,
      name: 'Cookie Clicker',
    };
    // get uuid pour gameSession
    setGame(gameFromApi);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const endGameSession = () => {
    // put end date to game session
    console.log('endGameSession', game, user?.id);
    setIsOpen(false);
    setGame(null);
  };

  const contextValue = useMemo(
    () => ({
      isOpen,
      game,
      setIsOpen,
      startGameSession,
      endGameSession,
    }),
    [isOpen,
    game,
    ]
  );
    
  return (
    <GameSessionContext.Provider value={contextValue}>
      {children}
      {!isAuthenticated && <GameSession game={game} isOpen={isOpen} isLoading={isLoading} onCloseGameSession={endGameSession} />}
    </GameSessionContext.Provider>
  );
};
