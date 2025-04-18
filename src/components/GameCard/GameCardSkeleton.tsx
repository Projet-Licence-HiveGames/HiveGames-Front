import React from "react";

import "./GameCard.css";

const GameCardSkeleton: React.FC = () => {
  return (
    <div className="game-card">
      <div className="game-card-image">
        <div
          className="skeleton-image"
          style={{
            width: "250px",
            height: "150px",
            backgroundColor: "var(--bg-color-light)",
          }}
        />
      </div>
      <div className="game-card-content">
        <div className="game-card-content-title">
          <div
            className="skeleton-text"
            style={{
              width: "80%",
              height: "24px",
              backgroundColor: "var(--bg-color-light)",
              marginBottom: "10px",
            }}
          />
          <div
            className="skeleton-text"
            style={{
              width: "60%",
              height: "20px",
              backgroundColor: "var(--bg-color-light)",
            }}
          />
        </div>
        <div className="game-card-content-data">
          <div
            className="skeleton-text"
            style={{
              width: "40%",
              height: "20px",
              backgroundColor: "var(--bg-color-light)",
            }}
          />
          <div className="game-card-content-price">
            <div
              className="skeleton-text"
              style={{
                width: "30%",
                height: "24px",
                backgroundColor: "var(--bg-color-light)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCardSkeleton;
