import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { privateApi } from "../../api/privateApi.ts";
import { GameDescription } from "../../components/GameInfo/GameDescription/GameDescription.tsx";
import { GameDetails } from "../../components/GameInfo/GameDetails/GameDetails.tsx";
import { GameImages } from "../../components/GameInfo/GameImages/GameImages.tsx";
import useWindowSize from "../../hooks/useWindowSize.ts";
import { Game } from "../../types/Game.ts";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter.ts";
import { getGameThumbnail } from "../../utils/gameUtils.ts";

import "./GameInfo.css";
export const GameInfo: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [gameData, setGameData] = useState<Game>();
  const { isMobile, isTablet } = useWindowSize();

  useEffect(() => {
    const fetchGame = async () => {
      await privateApi<Game>(`/games/${id}`, "GET")
        .then(setGameData)
        .catch(() => navigate("/404", { state: { error_status: 404 } }));
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
            {/* <img src={gameData?.images?.find(i=>i.file_name.startsWith('slide'))} alt={gameData?.name} /> */}
            <GameImages
              images={gameData?.images}
              thumbnail={getGameThumbnail(gameData)}
            />
          </div>
        )}
        {isTablet && (
          <div className="game-description">
            <p>{gameData?.description}</p>
          </div>
        )}
        <div className="game-info-container-right">
          {!isMobile ? (
            <GameDescription
              description={gameData?.description || ""}
              thumbnail={getGameThumbnail(gameData)}
            />
          ) : (
            <img
              src={getGameThumbnail(gameData)?.file_url}
              alt={gameData?.name}
            />
          )}
          <GameDetails
            studio={gameData?.studios || []}
            release_date={gameData?.release_date || ""}
            categories={gameData?.categories || []}
            description={gameData?.description || ""}
          />
        </div>
      </div>
    </div>
  );
};
