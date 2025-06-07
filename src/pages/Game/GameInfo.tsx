import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useFetch } from "../../api/privateApi.ts";
import { GameBuyCard } from "../../components/GameInfo/GameBuyCard/GameBuyCard.tsx";
import { GameDetails } from "../../components/GameInfo/GameDetails/GameDetails.tsx";
import { GameFeatures } from "../../components/GameInfo/GameFeatures/GameFeatures.tsx";
import { GameImages } from "../../components/GameInfo/GameImages/GameImages.tsx";
import { GameLanguages } from "../../components/GameInfo/GameLanguages/GameLanguages.tsx";
import { GameLongDescription } from "../../components/GameInfo/GameLongDescription/GameLongDescription.tsx";
import { GameShortDescription } from "../../components/GameInfo/GameShortDescription/GameShortDescription.tsx";
import GameReviewSection from "../../components/GameInfo/Review/GameReviewSection.tsx";
import { Loader } from "../../components/Loader/Loader.tsx";
import { useWindowSize } from "../../hooks/useWindowSize.ts";
import { Game, GameDlc, isGameDlc } from "../../types/Game.ts";
import { getGameImage } from "../../utils/gameUtils.ts";

import "./GameInfo.css";

export const GameInfo: React.FC = () => {
  const { id } = useParams();
  const fetchApi = useFetch();
  const navigate = useNavigate();
  const [gameData, setGameData] = useState<Game | GameDlc>();
  const { isMobile } = useWindowSize();

  const fetchGame = useCallback(async () => {
    await fetchApi
      .get<Game>(`/games/${id}`)
      .then(setGameData)
      .catch(() => navigate("/404", { state: { error_status: 404 } }));
  }, [id, navigate]);

  useEffect(() => {
    fetchGame();
  }, [fetchGame]);

  if (!gameData) {
    return <Loader />;
  }

  return (
    <div className="game-details-container">
      <div className="game-details__header">
        {!isMobile && (
          <div className="game-details__gallery">
            <GameImages
              images={gameData?.images}
              thumbnail={getGameImage(gameData.images)}
            />
          </div>
        )}
        <div className="game-details__overview">
          {!isMobile ? (
            <GameShortDescription
              description={gameData?.short_description || ""}
              thumbnail={getGameImage(gameData.images)}
            />
          ) : (
            <img
              src={getGameImage(gameData.images)?.file_url}
              alt={gameData?.name}
              className="game-details__thumbnail"
            />
          )}
          <GameDetails
            title={gameData?.name || ""}
            studio={gameData?.studios || []}
            release_date={gameData?.release_date || ""}
            categories={gameData?.categories || []}
            description={gameData?.short_description || ""}
          />
        </div>
      </div>
      <div className="game-details__main">
        <div className="game-details__primary">
          <div className="game-details__purchase">
            <GameBuyCard
              name={gameData?.name || ""}
              price={gameData?.price || 0}
              promotion={gameData?.promotion}
              isOwned={gameData?.is_owned || false}
            />
            {!isGameDlc(gameData) &&
              gameData.dlcs?.map((dlc) => (
                <GameBuyCard
                  key={dlc.id}
                  name={dlc.name}
                  price={dlc.price}
                  promotion={dlc.promotion}
                  isDlc={true}
                  gameBaseName={gameData.name}
                />
              ))}
          </div>
          <div className="game-details__description">
            <GameLongDescription
              description={gameData?.long_description || ""}
            />
          </div>
        </div>
        <div className="game-details__secondary">
          <div className="game-details__info">
            <div className="game-details__features">
              <GameFeatures features={gameData?.features || []} />
            </div>
            <div className="game-details__languages">
              <GameLanguages languages={gameData?.languages || []} />
            </div>
          </div>
        </div>
      </div>
      <GameReviewSection
        gameName={gameData.name}
        reviews={gameData?.reviews || []}
      />
    </div>
  );
};
