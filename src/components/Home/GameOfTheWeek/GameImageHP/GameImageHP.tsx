import React, { useEffect, useState } from "react";
import { Autoplay, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import useWindowSize from "../../../../hooks/useWindowSize.ts";
import { Game } from "../../../../types/Game.ts";
import { getGameThumbnail } from "../../../../utils/gameUtils.ts";
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
  const { isMobileL, isMobileM, isTablet } = useWindowSize();

  useEffect(() => {
    setSelectedGame(games[0]);
  }, [games]);

  const _images = selectedGame?.images?.filter(
    (i) => i.file_name.startsWith("header") && i.file_url,
  );

  const mainImages = _images?.length
    ? _images
    : [getGameThumbnail(selectedGame)];

  return (
    <div className="game-image-hp-wrapper">
      <Swiper
        className="big-image-swiper"
        modules={[Navigation, Thumbs, Autoplay]}
        autoplay={{ delay: 5000 }}
        thumbs={{ swiper: thumbsSwiper }}
        slidesPerView={1}
        spaceBetween={10}
      >
        {mainImages.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="main-image-wrapper">
              <img
                src={image.file_url}
                alt={image.alt || "Game Image"}
                className="panel-image"
              />
            </div>
            <div className={"game-image-hp-wishlist-button"}>
              <WishButton
                game={selectedGame}
                isAuthenticated={isAuthenticated}
                large={true}
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
        className="game-thumbs-swiper"
        freeMode={true}
        loop={true}
        modules={[Thumbs]}
        onSwiper={setThumbsSwiper}
        spaceBetween={11}
        slidesPerView={isMobileM ? 2 : isMobileL ? 3 : isTablet ? 4 : 7}
        watchSlidesProgress={true}
      >
        {games.map((game, index) => {
          const thumb = getGameThumbnail(game);
          return (
            <SwiperSlide key={index} onClick={() => setSelectedGame(game)}>
              <img
                src={thumb.file_url}
                alt={game.name}
                className={`thumb-image ${
                  game.id === selectedGame?.id ? "active" : ""
                }`}
              />
              <div className="progress-bar"></div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
