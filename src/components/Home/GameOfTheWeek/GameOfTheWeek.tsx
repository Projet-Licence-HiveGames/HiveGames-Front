import React, { useEffect, useState } from "react";

import { privateApi } from "../../../api/privateApi.ts";
import { useAuth } from "../../../context/AuthProvider.tsx";
import { Game } from "../../../types/Game.ts";
import { HomeSkeleton } from "../../Skeleton/Home/HomeSkeleton.tsx";
import { TLabel } from "../../ui/TranslationLabel/TLabel.tsx";

import { GameImageHP } from "./GameImageHP/GameImageHP.tsx";

import "./GameOfTheWeek.css";

export const GameOfTheWeek: React.FC = () => {
  const [gameData, setGameData] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const fetchData = async () => {
    try {
      const response: Game[] = await privateApi("/games/week", "GET");
      setGameData(response);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={"game-of-the-week-container"}>
      <div className={"game-of-the-week-header"}>
        <div className={"game-of-the-week-title"}>
          <TLabel baliseType={"h2"} label="games_of_the_week" />
        </div>
        <div className={"game-of-the-week-image"}>
          {loading ? (
            <HomeSkeleton />
          ) : (
            <GameImageHP games={gameData} isAuthenticated={isAuthenticated} />
          )}
        </div>
      </div>
    </div>
  );
};
