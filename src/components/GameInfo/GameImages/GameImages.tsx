import { FC, useState } from "react";
import { Swiper as SwiperType } from "swiper";
import { Autoplay, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { GameImage } from "@customTypes/Game";

import ImageWithLoader from "@components/ui/Image/ImageWithLoader.tsx";

import "swiper/swiper-bundle.css";
import "./GameImages.css";

interface GameImagesProps {
  images?: GameImage[];
  large?: boolean;
  thumbnail: GameImage;
}

export const GameImages: FC<GameImagesProps> = ({
  images,
  large = false,
  thumbnail,
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

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
          <SwiperSlide className={large ? "large" : ""} key={index}>
            <ImageWithLoader
              alt={"panel-image"}
              className={"panel-image"}
              src={image.file_url}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        className="thumbs-swiper"
        freeMode
        loop
        modules={[Thumbs]}
        onSwiper={setThumbsSwiper}
        slidesPerView={4}
        spaceBetween={10}
        watchSlidesProgress
      >
        {_images.map((image, index) => (
          <SwiperSlide key={index}>
            <ImageWithLoader
              alt={"game-image"}
              className={"panel-image"}
              src={image.file_url}
            />
            <div className="progress-bar" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
