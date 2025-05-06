import React, { useEffect, useState } from 'react';
import { TLabel } from "../../ui/TranslationLabel/TLabel.tsx";

import "./GameOfTheWeek.css";
import { privateApi } from "../../../api/privateApi.ts";
import { Game } from "../../../types/Game.ts";
import { GameImageHP } from './GameImageHP/GameImageHP.tsx';
import { useAuth } from "../../../context/AuthProvider.tsx";


export const GameOfTheWeek: React.FC = () => {
  const [gameData, setGameData] = useState<Game[]>([]);
  const {isAuthenticated} = useAuth();
  const fetchData = async () => {
    try {
      const response: Game[] = await privateApi("/games/week", "GET");
      setGameData(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
console.log(gameData);
  return (
    <div className={"game-of-the-week-container"}>

      <div className={"game-of-the-week-header"}>
        <div className={"game-of-the-week-title"}>
          <TLabel
            baliseType={"h2"}
            label="games_of_the_week"/>
        </div>
        <div className={"game-of-the-week-image"}>
          <GameImageHP games={gameData} isAuthenticated={isAuthenticated}/>
          {/*<img src="https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg?t=1697038822"*/}
          {/*     alt="Game of the Week"/>*/}
        </div>
      </div>
    </div>
  );
};