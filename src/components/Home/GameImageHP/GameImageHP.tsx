import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, Autoplay, Navigation } from "swiper/modules";
import { Game } from "../../../types/Game";
import { getGameThumbnail } from "../../../utils/gameUtils";

import "swiper/swiper-bundle.css";
import "./GameImageHP.css";
import { TLabel } from "../../ui/TranslationLabel/TLabel.tsx";
import { WishButton } from "../../CustomBloc/WishButton/WishButton.tsx";
import PriceBox from "../../CustomBloc/PriceBox/PriceBox.tsx";

interface GameImageHPProps {
  games: Game[];
  isAuthenticated: boolean;
}

export const GameImageHP: React.FC<GameImageHPProps> = ({ games, isAuthenticated }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [selectedGame, setSelectedGame] = useState<Game>(games[0]);

  const _images = selectedGame?.images?.filter(
    (i) => i.file_name.startsWith("header") && i.file_url,
  );

  const mainImages = _images?.length ? _images :  [getGameThumbnail(selectedGame)];
console.log(selectedGame)
  return (
    <div className="game-image-hp-wrapper">
      <Swiper
        className="big-image-swiper"
        modules={[Navigation, Thumbs, Autoplay]}
        navigation
        loop
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
              <PriceBox price={selectedGame?.price}/>
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
        className="game-thumbs-swiper"
        modules={[Thumbs]}
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={5}
        watchSlidesProgress
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
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
