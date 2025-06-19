import { FC, useCallback, useEffect, useState } from "react";

import { useFetch } from "../../../api/privateApi.ts";
import { GameBaseType } from "../../../types/Game.ts";
import GameCard from "../../GameCard/GameCard.tsx";
import { Loader } from "../../ui/Loader/Loader.tsx";
import { TLabel } from "../../ui/TranslationLabel/TLabel.tsx";

import "./GameUnderPrice.css";

export const GameUnderPrice: FC = () => {
  const [gameData, setGameData] = useState<GameBaseType[]>([]);
  const [loading, setLoading] = useState(true);
  const [price, setPrice] = useState<number>(10);
  const fetchAPI = useFetch();

  const fetchData = useCallback(async () => {
    fetchAPI
      .post<GameBaseType[]>("/games/filter", { prices: { min: 0, max: price } })
      .then(setGameData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [price]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="game-under-price-container">
      <header className="game-under-price-header">
        <TLabel
          label="home.section.under_price.title"
          baliseType="h2"
          className="game-under-price-title"
          replaceValues={{
            price: `${price}€`,
          }}
        />
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
