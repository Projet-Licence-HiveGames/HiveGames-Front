import React, { useEffect, useState } from 'react';
import { privateApi } from '../../api/privateApi.ts';
import { Game } from "../../types/Game.ts";
import { useParams } from 'react-router-dom';
import "./GameInfo.css";
import { GameDescription } from "../../components/GameInfo/GameDescription/GameDescription.tsx";
import { GameDetails } from "../../components/GameInfo/GameDetails/GameDetails.tsx";
import { GameImages } from "../../components/GameInfo/GameImages/GameImages.tsx";
import useWindowSize from '../../utils/useWindowSize.ts';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter.ts';

interface GameInfoProps {
  game: Game;
}

export const GameInfo: React.FC<GameInfoProps> = () => {
  const { id } = useParams();
  const [gameData, setGameData] = useState<Game | null>(null);
  const { isMobile, isTablet } = useWindowSize();

  useEffect(() => {
    const fetchGame = async () => {
      const game = await privateApi<Game>(`/games/${id}`, "GET");
      setGameData(game);
    };

    fetchGame();
  }, [id]);

  return (
    <div className="game-info">
      <div className="game-info-title">
          <h2>{capitalizeFirstLetter(gameData?.name || "")}</h2>
        </div>
      <div className="game-info-container">
        {!isMobile && (
          <div className="game-info-container-left">
            <img src={gameData?.images?.[0]?.file_name} alt={gameData?.name} />
            <GameImages images={gameData?.images ? gameData.images.map(image => image) : []} />
          </div>
        )}
        {isTablet && <div className="game-description">
          <p>{gameData?.description}</p>
        </div>}
        <div className="game-info-container-right">
          {!isMobile ? (
            <GameDescription description={gameData?.description || ""} images={gameData?.images ? gameData.images.map(image => image) : []} />
          ) : (
            <img src={gameData?.images?.[0]?.file_name} alt={gameData?.name} />
          )
          }
          <GameDetails studio={gameData?.studios || []} release_date={gameData?.release_date || ""} categories={gameData?.categories || []} description={gameData?.description || ""} />
        </div>
      </div>

    </div>
  );
};
