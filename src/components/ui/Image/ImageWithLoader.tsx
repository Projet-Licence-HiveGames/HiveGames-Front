import { FC, useState } from "react";
import classNames from "classnames";

import "./ImageWithLoader.css";

interface ImageWithLoaderProps {
  src: string;
  alt: string;
  loaderSrc: string;
  className?: string;
}

const ImageWithLoader: FC<ImageWithLoaderProps> = ({
  src,
  alt,
  loaderSrc,
  className,
}) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && (
        <img
          src={loaderSrc}
          alt="Chargement..."
          className={classNames("loader-image", className)}
        />
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={classNames("main-image", className, {
          visible: loaded,
          hidden: !loaded,
        })}
      />
    </>
  );
};

export default ImageWithLoader;
