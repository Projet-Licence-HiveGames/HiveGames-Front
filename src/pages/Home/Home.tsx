import { FC, useContext } from "react";

import reactLogo from "../../assets/react.svg";
import viteLogo from "../../assets/vite.svg";
import { GameOfTheWeek } from "../../components/Home/GameOfTheWeek/GameOfTheWeek.tsx";
import { GameSessionContext } from "../../context/GameSessionProvider";

import "./Home.css";

const Home: FC = () => {
  const { startGameSession } = useContext(GameSessionContext);
  return (
    <div className="container">
      <button onClick={() => startGameSession(1, "Cookie Clicker")}>
        Start
      </button>
      <GameOfTheWeek />
    </div>
  );
};

export default Home;
