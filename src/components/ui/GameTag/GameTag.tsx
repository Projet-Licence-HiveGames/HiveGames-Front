import { FC } from "react";

import "./GameTag.css";

interface TagProps {
  text: "demo" | "dlc" | "beta";
}

export const GameTag: FC<TagProps> = ({ text }) => {
  return (
    <div className={`game-tag ${text}`}>
      <span>{text}</span>
    </div>
  );
};
