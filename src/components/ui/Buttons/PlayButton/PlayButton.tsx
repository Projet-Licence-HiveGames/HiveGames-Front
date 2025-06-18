import React, { useContext } from "react";
import classNames from "classnames";

import { GameSessionContext } from "@context/GameSessionProvider.tsx";

import TLabel from "@components/ui/TranslationLabel/TLabel.tsx";

import "./PlayButton.css";

interface PlayButtonProps {
  className?: string;
  id: number;
  name: string;
}

export const PlayButton: React.FC<PlayButtonProps> = ({
  className = "",
  id,
  name,
}) => {
  const { startGameSession } = useContext(GameSessionContext);

  return (
    <button
      className={classNames("play-button", className)}
      onClick={(e) => {
        e.stopPropagation();
        startGameSession(id, name);
      }}
    >
      <TLabel label={"play"} />
    </button>
  );
};
