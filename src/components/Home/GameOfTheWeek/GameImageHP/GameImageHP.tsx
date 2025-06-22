import { FC, MouseEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Autoplay, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { useCart } from "@context/CartContext";
import useWindowSize from "@hooks/useWindowSize.ts";
import { getGameImage } from "@utils/gameUtils.ts";

import CartButton from "@components/GameCard/CartButton/CartButton.tsx";
import { PlayButton } from "@components/ui/Buttons/PlayButton/PlayButton.tsx";
import { PriceTag } from "@components/ui/PriceTag/PriceTag.tsx";
import { TLabel } from "@components/ui/TranslationLabel/TLabel.tsx";
import { WishButton } from "@components/ui/WishButton/WishButton.tsx";

import { GameType } from "../../../../types/Game.ts";

import "swiper/swiper-bundle.css";
import "./GameImageHP.css";

interface GameImageHPProps {
  games: GameType[];
  isAuthenticated: boolean;
}

export const GameImageHP: FC<GameImageHPProps> = ({
  games,
  isAuthenticated,
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [selectedGame, setSelectedGame] = useState<GameType>(games[0]);
  const { isMobileL, isMobileM, isMobileS, isTablet } = useWindowSize();
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart();
  const isInCart = cartItems.some((item: number) => item === selectedGame.id);

  useEffect(() => {
    setSelectedGame(games[0]);
  }, [games]);

  const _images = selectedGame?.images?.filter(
    (i) => i.file_name.startsWith("header") && i.file_url,
  );

  const mainImages = _images?.length
    ? _images
    : [getGameImage(selectedGame?.images, "header")];

  const handleAddToCart = (e: MouseEvent) => {
    e.stopPropagation();
    if (!isInCart) {
      addToCart(selectedGame.id);
    } else {
      toast.dismiss();
      toast.error(<TLabel label={"cart.already_in_cart"} />);
    }
  };

  return (
    <div className="game-image-hp-wrapper">
      <Swiper
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="big-image-swiper-hp"
        modules={[Navigation, Thumbs, Autoplay]}
        slidesPerView={1}
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper }}
      >
        {mainImages.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="main-image-wrapper">
              <a
                onClick={() => navigate(`/game/${selectedGame.id}`)}
                style={{ cursor: "pointer" }}
              >
                <img
                  alt={image.alt || "Game Image"}
                  className="panel-image-hp"
                  loading={"eager"}
                  src={image.file_url}
                />
              </a>
            </div>
            <div className={"game-image-hp-wishlist-button"}>
              <WishButton
                game={selectedGame}
                homeP={true}
                isAuthenticated={isAuthenticated}
                large={true}
              />
            </div>
            <div className={"game-image-hp-price"}>
              <PriceTag price={selectedGame?.price} />
            </div>
            <div className="game-image-hp-button-wrapper">
              {!selectedGame.is_owned ? (
                <CartButton
                  isOwned={selectedGame.is_owned}
                  onClick={handleAddToCart}
                />
              ) : (
                <PlayButton id={selectedGame.id} name={selectedGame.name} />
              )}
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
        slidesPerView={
          isMobileS || isMobileM ? 2 : isMobileL ? 3 : isTablet ? 4 : 7
        }
        spaceBetween={11}
        watchSlidesProgress={true}
      >
        {games.map((game, index) => {
          const thumb = getGameImage(game.images);
          return (
            <SwiperSlide key={index} onClick={() => setSelectedGame(game)}>
              <img
                alt={game.name}
                className={`thumb-image ${game.id === selectedGame?.id ? "active" : ""}`}
                decoding="async"
                loading="lazy"
                src={thumb.file_url}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
