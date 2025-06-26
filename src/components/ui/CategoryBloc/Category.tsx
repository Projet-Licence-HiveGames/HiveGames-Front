import React from "react";
import { Link } from "react-router-dom";
import { TranslationCategoryLabelType } from "@constants/CategoriesDict.tsx";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";

import { GameCategory } from "@customTypes/Game";

import { TLabel } from "../TranslationLabel/TLabel.tsx";

import "./Category.css";

interface CategoryProps {
  categories: GameCategory[];
}

export const Category: React.FC<CategoryProps> = ({ categories }) => {
  const [showAll, setShowAll] = React.useState(false);

  return (
    <div className={"category-bloc"}>
      {categories
        .slice(0, showAll ? categories.length : 3)
        .map((category, index) => {
          return (
            <Link
              className={"category-bloc-category"}
              key={index}
              to={`/catalog?categories=${category.id}`}
            >
              <TLabel
                capitalizeFirstLetter
                label={category.label as TranslationCategoryLabelType}
                translationType={"category"}
              />
            </Link>
          );
        })}
      {!showAll && categories.length > 3 && (
        <button
          className={"category-bloc-category-more"}
          onClick={(e) => {
            e.stopPropagation();
            setShowAll(true);
          }}
        >
          <MoreHorizRoundedIcon sx={{ color: "white" }} />
        </button>
      )}
    </div>
  );
};
