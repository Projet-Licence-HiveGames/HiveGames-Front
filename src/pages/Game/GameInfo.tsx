import React, { useEffect, useState } from 'react';
import { privateApi } from '../../api/privateApi.ts';
import { Game } from "../../types/Game.ts";
import { useParams } from 'react-router-dom';


export const GameInfo: React.FC = () => {
  const { id } = useParams();
  const [gameData, setGameData] = useState<Game | null>(null);
  
  useEffect(() => {
    const fetchGame = async () => {
      const game = await privateApi<Game>(`/games/${id}`, "POST", {id});
      setGameData(game);
    };

    fetchGame();
  }, [id]);
  console.log(gameData);
  
  return (
  <div>

  </div>
  );
};
