import React, { useCallback, useEffect } from "react";

import { useFetch } from "../../../api/privateApi.ts";
import { Game } from "../../../types/Game.ts";
import GameCard from "../../GameCard/GameCard.tsx";

import "./GameUnderPrice.css";

export const GameUnderPrice: React.FC = () => {
  const [gameData, setGameData] = React.useState<Game[]>([]);
  const [loading, setLoading] = React.useState(true);
  const fetchAPI = useFetch();

  const fetchData = useCallback(async () => {
    try {
      const response: Game[] = await fetchAPI.post("/games", {
        prices: { min: 0, max: 10 },
      });
      setGameData(response);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={"game-under-price-container"}>
      <div className={"game-under-price-header"}>
        <div className={"game-under-price-title"}>
          <h2>Jeux à moins de 10 €</h2>
        </div>
      </div>
      <div className={"game-under-price-body"}>
        {gameData.map((game, index) => (
          <GameCard key={game.id} game={game} isAuthenticated={false} />
        ))}
      </div>
    </div>
  );
};
