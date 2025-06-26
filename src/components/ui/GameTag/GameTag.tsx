import { FC } from "react";

import "./GameTag.css";

interface TagProps {
  text: "demo" | "dlc" | "beta";
}

export const GameTag: FC<TagProps> = ({ text }) => {
  return (
    <div className={`tag ${text}`}>
      <span className="tag-text">{text}</span>
    </div>
  );
};
