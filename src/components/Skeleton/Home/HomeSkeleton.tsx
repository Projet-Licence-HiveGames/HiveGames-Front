import React from "react";

import useWindowSize from "../../../hooks/useWindowSize.ts";

import "./HomeSkeleton.css";

export const HomeSkeleton: React.FC = () => {
  const { isMobileL, isMobileM, isMobileS, isTablet } = useWindowSize();
  const dimensions =
    isMobileS || isMobileM ? 2 : isMobileL ? 3 : isTablet ? 4 : 7;

  return (
    <div className="home-skeleton">
      <div className="skeleton-image"></div>
      <div className="skeleton-images">
        {Array.from({ length: dimensions }).map((_, i) => (
          <div className="skeleton-little-image" key={i}></div>
        ))}
      </div>
    </div>
  );
};
