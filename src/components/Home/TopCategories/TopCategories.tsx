import React, { useEffect, useState } from "react";

import { useFetch } from "../../../api/privateApi.ts";
import {
  categoryIcons,
  TranslationCategoryLabelType,
} from "../../../constants/CategoriesDict.tsx";
import { TLabel } from "../../ui/TranslationLabel/TLabel.tsx";

import "./TopCategories.css";

type CategoryData = {
  category_name: TranslationCategoryLabelType;
  total_orders: number;
};

export const TopCategories: React.FC = () => {
  const fetchAPI = useFetch();
  const [categories, setCategories] = useState<CategoryData[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      await fetchAPI
        .get<CategoryData[]>("/games/top-categories")
        .then(setCategories)
        .catch((error) => console.error("Error fetching categories:", error));
    };

    fetchCategories();
  }, []);

  return (
    <div className="top-categories">
      <div className={"top-categories__header"}>
        <hr />
        <h2>Top Categories</h2>
        <hr />
      </div>
      <div className={"top-categories__body"}>
        <ul>
          {categories.map(({ category_name }, index) => (
            <li key={index}>
              {categoryIcons[category_name]}
              <TLabel label={category_name} translationType={"category"} />
            </li>
          ))}
        </ul>
      </div>
      <div className={"top-categories__footer"}>
        <hr />
      </div>
    </div>
  );
};
