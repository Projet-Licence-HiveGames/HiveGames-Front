import React from "react";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";

import { capitalizeFirstLetter } from "../../../utils/capitalizeFirstLetter";

import "./Category.css";

interface CategoryProps {
  category: string[];
}

const Category: React.FC<CategoryProps> = ({ category = ["test"] }) => {
  const [showAll, setShowAll] = React.useState(false);

  return (
    <div className={"category-bloc"}
      onClick={(e) => e.stopPropagation()}
    >
      {category
        .slice(0, showAll ? category.length : 3)
        .map((category, index) => {
          return (
            <div key={index} className={"category-bloc-category"}>
              <span>{capitalizeFirstLetter(category)}</span>
            </div>
          );
        })}
      {!showAll && category.length > 3 && (
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

export default Category;
