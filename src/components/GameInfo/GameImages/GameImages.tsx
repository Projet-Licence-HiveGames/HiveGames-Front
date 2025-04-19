import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Thumbs } from "swiper/modules";
import { GameImage } from "../../../types/Game";

import "swiper/swiper-bundle.css";
import "./GameImages.css";


interface GameImagesProps {
  images?: GameImage[];
  thumbnail: GameImage;
}

export const GameImages: React.FC<GameImagesProps> = ({
  images,
  thumbnail,
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  const slides = images?.filter(
    (i) => i.file_name.startsWith("slide") && i.file_url,
  );
  const _images = slides?.length ? slides : [thumbnail];

  return (
    <div className="game-images-wrapper">
      <Swiper
        autoplay={{ delay: 5000 }}
        className="big-image-swiper"
        loop={true}
        modules={[Navigation, Thumbs, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        slidesPerView={1}
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper }}
      >
        {_images.map((image, index) => (
          <SwiperSlide key={index}>
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
        slidesPerView={5}
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
            <div className="progress-bar"></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
