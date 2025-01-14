import React, { useState } from "react";
import reactLogo from "../../assets/react.svg";
import viteLogo from "../../assets/vite.svg";

import "./Home.css";
import GameSession from "../GameSession/gameSession";

const Home: React.FC = () => {
  return (
    <div className="container">
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <GameSession />
    </div>
  );
};

export default Home;
