import React from "react";

import "./HomeSkeleton.css";

export const HomeSkeleton: React.FC = () => {
  return (
    <div className="home-skeleton">
      <div className="skeleton-image"></div>
      <div className="skeleton-images">
        <div className="skeleton-little-image"></div>
        <div className="skeleton-little-image"></div>
        <div className="skeleton-little-image"></div>
        <div className="skeleton-little-image"></div>
        <div className="skeleton-little-image"></div>
      </div>
    </div>
  );
};
