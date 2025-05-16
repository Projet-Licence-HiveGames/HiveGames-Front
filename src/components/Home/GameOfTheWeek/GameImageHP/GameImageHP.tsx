import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Autoplay, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import useWindowSize from "../../../../hooks/useWindowSize.ts";
import { Game } from "../../../../types/Game.ts";
import {
  getGameHeader,
  getGameThumbnail,
} from "../../../../utils/gameUtils.ts";
import { PriceTag } from "../../../ui/PriceTag/PriceTag.tsx";
import { TLabel } from "../../../ui/TranslationLabel/TLabel.tsx";
import { WishButton } from "../../../ui/WishButton/WishButton.tsx";

import "swiper/swiper-bundle.css";
import "./GameImageHP.css";

interface GameImageHPProps {
  games: Game[];
  isAuthenticated: boolean;
}

export const GameImageHP: React.FC<GameImageHPProps> = ({
  games,
  isAuthenticated,
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [selectedGame, setSelectedGame] = useState<Game>(games[0]);
  const { isMobileL, isMobileM, isMobileS, isTablet } = useWindowSize();
  const navigate = useNavigate();

  useEffect(() => {
    setSelectedGame(games[0]);
  }, [games]);

  const _images = selectedGame?.images?.filter(
    (i) => i.file_name.startsWith("header") && i.file_url,
  );

  const mainImages = _images?.length ? _images : [getGameHeader(selectedGame)];

  return (
    <div className="game-image-hp-wrapper">
      <Swiper
        className="big-image-swiper-hp"
        modules={[Navigation, Thumbs, Autoplay]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        thumbs={{ swiper: thumbsSwiper }}
        slidesPerView={1}
        spaceBetween={10}
      >
        {mainImages.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="main-image-wrapper">
              <a
                onClick={() => navigate(`/game/${selectedGame.id}`)}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={image.file_url}
                  alt={image.alt || "Game Image"}
                  loading={"eager"}
                  className="panel-image-hp"
                />
              </a>
            </div>
            <div className={"game-image-hp-wishlist-button"}>
              <WishButton
                game={selectedGame}
                isAuthenticated={isAuthenticated}
                large={true}
                homeP={true}
              />
            </div>
            <div className={"game-image-hp-price"}>
              <PriceTag price={selectedGame?.price} />
            </div>
            <div className="game-image-hp-button-wrapper">
              <TLabel
                baliseType={"span"}
                label={"buy"}
                className={"game-image-hp-button"}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        autoplay={{ delay: 5000 }}
        className="game-thumbs-swiper-hp"
        freeMode={true}
        loop={true}
        modules={[Thumbs]}
        onSwiper={setThumbsSwiper}
        spaceBetween={11}
        slidesPerView={
          isMobileS || isMobileM ? 2 : isMobileL ? 3 : isTablet ? 4 : 7
        }
        watchSlidesProgress={true}
      >
        {games.map((game, index) => {
          const thumb = getGameThumbnail(game);
          return (
            <SwiperSlide key={index} onClick={() => setSelectedGame(game)}>
              <img
                src={thumb.file_url}
                alt={game.name}
                decoding="async"
                loading="lazy"
                className={`thumb-image ${game.id === selectedGame?.id ? "active" : ""}`}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
