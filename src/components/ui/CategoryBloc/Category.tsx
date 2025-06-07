import React from "react";
import { Link } from "react-router-dom";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";

import { TranslationCategoryLabelType } from "../../../constants/CategoriesDict.tsx";
import { GameCategory } from "../../../types/Game";
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
            <Link
              to={`/catalog?categories=${category.id}`}
              key={index}
              className={"category-bloc-category"}
            >
              <TLabel
                label={category.label as TranslationCategoryLabelType}
                translationType={"category"}
                capitalizeFirstLetter
              />
            </Link>
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
