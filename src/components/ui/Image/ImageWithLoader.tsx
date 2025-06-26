import { FC, useState } from "react";
import classNames from "classnames";

import defaultGameThumbnailImage from "@assets/images/defaultGameThumbnail.png";

import "./ImageWithLoader.css";

interface ImageWithLoaderProps {
  src: string | undefined;
  alt: string;
  loaderSrc?: string;
  className?: string;
}

const ImageWithLoader: FC<ImageWithLoaderProps> = ({
  src = defaultGameThumbnailImage,
  alt,
  loaderSrc = defaultGameThumbnailImage,
  className,
}) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && (
        <img
          alt="Chargement..."
          className={classNames("loader-image", className)}
          src={loaderSrc}
        />
      )}
      <img
        alt={alt}
        className={classNames("main-image", className, {
          visible: loaded,
          hidden: !loaded,
        })}
        onLoad={() => setLoaded(true)}
        src={src}
      />
    </>
  );
};

export default ImageWithLoader;
