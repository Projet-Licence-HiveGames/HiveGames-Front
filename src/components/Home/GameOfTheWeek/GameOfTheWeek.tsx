import { FC, useCallback, useEffect, useState } from "react";
import { useGamesApi } from "@api/services/gamesApi.ts";

import { useAuth } from "@context/AuthProvider.tsx";
import { GameBaseType } from "@customTypes/Game.ts";

import { HomeSkeleton } from "@components/Skeleton/Home/HomeSkeleton.tsx";
import { TLabel } from "@components/ui/TranslationLabel/TLabel.tsx";

import { GameImageHP } from "./GameImageHP/GameImageHP.tsx";

import "./GameOfTheWeek.css";

export const GameOfTheWeek: FC = () => {
  const [gameData, setGameData] = useState<GameBaseType[]>([]);
  const { user } = useAuth();
  const { fetchWeeklyGames } = useGamesApi();
  const fetchData = useCallback(async () => {
    try {
      fetchWeeklyGames().then(setGameData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

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
