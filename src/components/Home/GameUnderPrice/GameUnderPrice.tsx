import React, { useCallback, useEffect } from "react";

import { useFetch } from "../../../api/privateApi.ts";
import { Game } from "../../../types/Game.ts";
import GameCard from "../../GameCard/GameCard.tsx";
import { Loader } from "../../Loader/Loader.tsx";

import "./GameUnderPrice.css";

export const GameUnderPrice: React.FC = () => {
  const [gameData, setGameData] = React.useState<Game[]>([]);
  const [loading, setLoading] = React.useState(true);
  const fetchAPI = useFetch();

  const fetchData = useCallback(async () => {
    fetchAPI
      .post<Game[]>("/games/filter", { prices: { min: 0, max: 10 } })
      .then(setGameData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [fetchAPI]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="game-under-price-container">
      <header className="game-under-price-header">
        <h2 className="game-under-price-title">Jeux à moins de 10 €</h2>
      </header>
      {loading ? (
        <Loader />
      ) : (
        <div className="game-under-price-body">
          {gameData.map((game) => (
            <GameCard key={game.id} game={game} isAuthenticated={false} />
          ))}
        </div>
      )}
    </div>
  );
};
