import { FC, useContext } from "react";

import { GameOfTheWeek } from "../../components/Home/GameOfTheWeek/GameOfTheWeek.tsx";
import { GameUnderPrice } from "../../components/Home/GameUnderPrice/GameUnderPrice.tsx";
import { TopCategories } from "../../components/Home/TopCategories/TopCategories.tsx";
import { GameSessionContext } from "../../context/GameSessionProvider";

import "./Home.css";

export const Home: FC = () => {
  const { startGameSession } = useContext(GameSessionContext);
  return (
    <div className="container">
      <button onClick={() => startGameSession(1, "Cookie Clicker")}>
        Start
      </button>
      <div className={"home-body"}>
        <GameOfTheWeek />
        <TopCategories />
        <GameUnderPrice />
      </div>
    </div>
  );
};
