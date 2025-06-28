import { FC } from "react";

import { GameOfTheWeek } from "@components/Home/GameOfTheWeek/GameOfTheWeek.tsx";
import { GameUnderPrice } from "@components/Home/GameUnderPrice/GameUnderPrice.tsx";
import { TopCategories } from "@components/Home/TopCategories/TopCategories.tsx";

import "./Home.css";

export const Home: FC = () => {
  return (
    <div className="home-container">
      <GameOfTheWeek />
      <TopCategories />
      <GameUnderPrice />
    </div>
  );
};
