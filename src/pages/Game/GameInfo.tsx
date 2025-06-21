import { FC, useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "@api/privateApi.ts";

import {
  GameBaseType,
  GameDlcType,
  GameReview,
  isGameDlc,
} from "@customTypes/Game.ts";
import { useWindowSize } from "@hooks/useWindowSize.ts";
import { getGameImage } from "@utils/gameUtils.ts";

import { GameBuyCard } from "@components/GameInfo/GameBuyCard/GameBuyCard.tsx";
import { GameDetails } from "@components/GameInfo/GameDetails/GameDetails.tsx";
import { GameFeatures } from "@components/GameInfo/GameFeatures/GameFeatures.tsx";
import { GameImages } from "@components/GameInfo/GameImages/GameImages.tsx";
import { GameLanguages } from "@components/GameInfo/GameLanguages/GameLanguages.tsx";
import { GameLongDescription } from "@components/GameInfo/GameLongDescription/GameLongDescription.tsx";
import { GameShortDescription } from "@components/GameInfo/GameShortDescription/GameShortDescription.tsx";
import GameReviewSection from "@components/GameInfo/Review/GameReviewSection.tsx";
import { Loader } from "@components/ui/Loader/Loader.tsx";

import "./GameInfo.css";

export const GameInfo: FC = () => {
  const { id } = useParams();
  const fetchApi = useFetch();
  const navigate = useNavigate();
  const [gameData, setGameData] = useState<GameBaseType | GameDlcType>();
  const { isMobile } = useWindowSize();

  const fetchGame = useCallback(async () => {
    await fetchApi
      .get<GameBaseType>(`/games/${id}`)
      .then(setGameData)
      .catch(() => navigate("/404", { state: { error_status: 404 } }));
  }, [id, navigate]);

  useEffect(() => {
    fetchGame();
  }, [fetchGame]);

  const updateReviewList = useCallback(
    (review: GameReview) => {
      setGameData((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          reviews: [review, ...(prev.reviews || [])],
        };
      });
    },
    [setGameData],
  );

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
              alt={gameData?.name}
              className="game-details__thumbnail"
              src={getGameImage(gameData.images)?.file_url}
            />
          )}
          <GameDetails
            categories={gameData?.categories || []}
            description={gameData?.short_description || ""}
            release_date={gameData?.release_date || ""}
            studio={gameData?.studios || []}
            title={gameData?.name || ""}
          />
        </div>
      </div>
      <div className="game-details__main">
        <div className="game-details__primary">
          <div className="game-details__purchase">
            <GameBuyCard
              game={gameData}
              isOwned={gameData?.is_owned || false}
              name={gameData?.name || ""}
            />
            {!isGameDlc(gameData) &&
              gameData.dlcs?.map((dlc) => (
                <GameBuyCard
                  gameBaseName={gameData.name}
                  isDlc={true}
                  key={dlc.id}
                  name={dlc.name}
                  game={dlc}
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
      <GameReviewSection game={gameData} updateReviewList={updateReviewList} />
    </div>
  );
};
