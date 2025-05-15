import React, { useState } from "react";
import { Autoplay, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { GameImage } from "../../../types/Game";

import "swiper/swiper-bundle.css";
import "./GameImages.css";

interface GameImagesProps {
  images?: GameImage[];
  large?: boolean;
  thumbnail: GameImage;
}

export const GameImages: React.FC<GameImagesProps> = ({
  images,
  large = false,
  thumbnail,
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  const slides = images?.filter(
    (i) => i.file_name.startsWith("slide") && i.file_url,
  );
  const _images = slides?.length ? slides : [thumbnail];

  return (
    <div className={`game-images-wrapper ${large ? "large" : ""}`}>
      <Swiper
        autoplay={{ delay: 5000 }}
        className="big-image-swiper"
        modules={[Navigation, Thumbs, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        slidesPerView={1}
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper }}
      >
        {_images.map((image, index) => (
          <SwiperSlide key={index} className={large ? "large" : ""}>
            <img
              alt={image.alt || "Game Image"}
              className="panel-image"
              decoding="async"
              loading="lazy"
              src={image.file_url}
              srcSet={`${image.file_url} 1x, ${image.file_url} 2x`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        autoplay={{ delay: 5000 }}
        className="thumbs-swiper"
        freeMode={true}
        loop={true}
        modules={[Thumbs]}
        onSwiper={setThumbsSwiper}
        slidesPerView={4}
        spaceBetween={10}
        watchSlidesProgress={true}
      >
        {_images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              alt={image.alt || "Thumbnail"}
              className="thumb-image"
              decoding="async"
              loading="lazy"
              src={image.file_url}
              srcSet={`${image.file_url} 1x, ${image.file_url} 2x`}
            />
            <div className="progress-bar" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
