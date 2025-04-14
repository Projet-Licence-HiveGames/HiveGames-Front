import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
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
        spaceBetween={10}
        slidesPerView={1}
        loop={true}
        navigation={true}
        pagination={{ clickable: true }}
        modules={[Navigation, Thumbs]}
        thumbs={{ swiper: thumbsSwiper }}
        className="big-image-swiper"
      >
        {_images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              className="panel-image"
              src={image.file_url}
              alt={image.alt}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={5}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[Thumbs]}
        className="thumbs-swiper"
      >
        {_images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              className="thumb-image"
              src={image.file_url}
              alt={image.alt || "Thumbnail"}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
