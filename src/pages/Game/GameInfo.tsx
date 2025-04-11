import React, { useEffect, useState } from 'react';
import { privateApi } from '../../api/privateApi.ts';
import { Game } from "../../types/Game.ts";
import { useParams } from 'react-router-dom';
import "./GameInfo.css";
import { GameDescription } from "../../components/GameInfo/GameDescription/GameDescription.tsx";
import { GameDetails } from "../../components/GameInfo/GameDetails/GameDetails.tsx";
import { GameImages } from "../../components/GameInfo/GameImages/GameImages.tsx";

interface GameInfoProps {
  game: Game;
}

export const GameInfo: React.FC<GameInfoProps> = () => {
  const { id } = useParams();
  const [gameData, setGameData] = useState<Game | null>(null);

  useEffect(() => {
    const fetchGame = async () => {
      const game = await privateApi<Game>(`/games/${id}`, "GET");
      setGameData(game);
    };

    fetchGame();
  }, [id]);

  console.log(gameData);
  return (
    <div className="game-info">
      <div className="game-info-container">
        <GameImages images={gameData?.images || []} />
        <div className="game-info-container-right">
          <GameDescription description={gameData?.description || ""} image={gameData?.images || []} />
          <GameDetails studio={gameData?.studios || []} release_date={gameData?.release_date || ""} categories={gameData?.categories || []} />
        </div>
      </div>

    </div>
  );
};
