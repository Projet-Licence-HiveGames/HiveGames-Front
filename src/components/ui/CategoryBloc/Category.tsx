import React from "react";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";

import { GameCategory } from "../../../types/Game";
import { TranslationLabelType } from "../../../utils/translations";
import { TLabel } from "../../ui/TranslationLabel/TLabel";

import "./Category.css";

interface CategoryProps {
  categories: GameCategory[];
}

export const Category: React.FC<CategoryProps> = ({ categories }) => {
  const [showAll, setShowAll] = React.useState(false);

  return (
    <div className={"category-bloc"} onClick={(e) => e.stopPropagation()}>
      {categories
        .slice(0, showAll ? categories.length : 3)
        .map((category, index) => {
          return (
            <div key={index} className={"category-bloc-category"}>
              <TLabel
                label={`category.${category.label}` as TranslationLabelType}
                capitalizeFirstLetter
              />
            </div>
          );
        })}
      {!showAll && categories.length > 3 && (
        <div
          className={"category-bloc-category-more"}
          onClick={() => setShowAll(true)}
        >
          <MoreHorizRoundedIcon sx={{ color: "white" }} />
        </div>
      )}
    </div>
  );
};
