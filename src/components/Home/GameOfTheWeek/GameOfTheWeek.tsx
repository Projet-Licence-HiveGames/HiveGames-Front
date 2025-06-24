import React, { useCallback, useEffect, useState } from "react";

import { useFetch } from "../../../api/privateApi.ts";
import { useAuth } from "../../../context/AuthProvider.tsx";
import { findGameCollection, GameBaseType } from "../../../types/Game.ts";
import { HomeSkeleton } from "../../Skeleton/Home/HomeSkeleton.tsx";
import { TLabel } from "../../ui/TranslationLabel/TLabel.tsx";

import { GameImageHP } from "./GameImageHP/GameImageHP.tsx";

import "./GameOfTheWeek.css";

export const GameOfTheWeek: React.FC = () => {
  const [gameData, setGameData] = useState<GameBaseType[]>([]);
  const { isAuthenticated, user } = useAuth();
  const fetchAPI = useFetch();
  const fetchData = useCallback(async () => {
    try {
      const data = await fetchAPI.get<GameBaseType[]>("/games/week");
      setGameData(
        data.map((game) => {
          const collection = findGameCollection(game.id, user);
          return {
            ...game,
            is_wished: collection?.is_wished || false,
            is_owned: collection?.is_owned || false,
            be_notified: collection?.be_notified || false,
          };
        }),
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [fetchAPI]);

  useEffect(() => {
    fetchData();
  }, [user]);

  return (
    <div className={"game-of-the-week-container"}>
      <div className={"game-of-the-week-header"}>
        <div className={"game-of-the-week-title"}>
          <TLabel baliseType={"h2"} label="games_of_the_week" />
        </div>
        <div className={"game-of-the-week-image"}>
          {gameData.length === 0 ? (
            <HomeSkeleton />
          ) : (
            <GameImageHP games={gameData} />
          )}
        </div>
      </div>
    </div>
  );
};
