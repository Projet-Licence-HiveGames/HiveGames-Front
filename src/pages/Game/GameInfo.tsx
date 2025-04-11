import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { privateApi } from "../../api/privateApi.ts";
import { GameBuyCard } from "../../components/GameInfo/GameBuyCard/GameBuyCard.tsx";
import { GameFeatures } from "../../components/GameInfo/GameFeatures/GameFeatures.tsx";
import { GameLanguages } from "../../components/GameInfo/GameLanguages/GameLanguages.tsx";
import { GameDescription } from "../../components/GameInfo/GameDescription/GameDescription.tsx";
import { GameDetails } from "../../components/GameInfo/GameDetails/GameDetails.tsx";
import { GameImages } from "../../components/GameInfo/GameImages/GameImages.tsx";
import { Loader } from "../../components/Loader/Loader.tsx";
import { Game } from "../../types/Game.ts";
import { getGameThumbnail } from "../../utils/gameUtils.ts";
import { useWindowSize } from "../../hooks/useWindowSize.ts";

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

  if (!gameData) {
    return <Loader />;
  }

  return (
    <div className="game-info">
      <div className="game-info__container">
        {!isMobile && (
          <div className="game-info__left">
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
        <div className="game-info__right">
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
            title={gameData?.name || ""}
            studio={gameData?.studios || []}
            release_date={gameData?.release_date || ""}
            categories={gameData?.categories || []}
            description={gameData?.description || ""}
          />
        </div>
      </div>
      <div className='game-info__content'>
        <div className='game-buy-card'>
          <GameBuyCard name={gameData?.name || ""} oldPrice={gameData?.oldPrice || 0} price={gameData?.price || 0} />
        </div>
        <div className='game-details'>
          <div className='game-features-languages'>
            <div className='game-features'>
              <GameFeatures game={gameData?.features || []} />
            </div>
            <div className='game-languages'>
              <GameLanguages game={gameData?.languages || []} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
