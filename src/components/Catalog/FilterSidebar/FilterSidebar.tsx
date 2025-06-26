import { FC, useContext, useEffect, useState } from "react";
import { MaterialSymbol } from "react-material-symbols";
import { Slider } from "@mui/joy";
import { Switch } from "@mui/material";
import classNames from "classnames";

import { TranslationContext } from "@context/TranslationProvider.tsx";
import { capitalizeFirstLetter } from "@utils/capitalizeFirstLetter.ts";

import {
  getTranslatedText,
  TLabel,
  TText,
} from "@components/ui/TranslationLabel/TLabel";

import { useFetch } from "../../../api/privateApi";
import { TranslationCategoryLabelType } from "../../../constants/CategoriesDict.tsx";
import { TranslationFeatureLabelType } from "../../../constants/FeaturesDict";
import { TranslationLanguageLabelType } from "../../../constants/LanguagesDict";
import { useOutsideClick } from "../../../hooks/useOutsideClick";
import { useWindowSize } from "../../../hooks/useWindowSize";
import {
  GameCategory,
  GameFeature,
  GameInfoResponse,
  GameLanguage,
} from "../../../types/Game";
import { TranslationLabelType } from "../../../utils/translations.ts";

import Dropdown from "./Dropdown/Dropdown";

import "./FilterSidebar.css";

const ORDER_BY_OPTIONS = [
  "rating-asc",
  "rating-desc",
  "name-asc",
  "name-desc",
  "price-asc",
  "price-desc",
  "release_date-desc",
  "release_date-asc",
];

export interface GameFilter {
  search: string;
  only_promoted: boolean;
  categories: number[];
  languages: number[];
  features: number[];
  prices: {
    min: number;
    max: number;
  };
  order_by?: string;
}

interface FilterSidebarProps {
  filters: GameFilter;
  setFilters: (filters: GameFilter) => void;
}

const FilterSidebar: FC<FilterSidebarProps> = ({ filters, setFilters }) => {
  const fetchAPI = useFetch();
  const { selectedLanguage } = useContext(TranslationContext);

  const [isOpen, setIsOpen] = useState(false);
  const ref = useOutsideClick<HTMLDivElement>(() => setIsOpen(false));

  const [categories, setCategories] = useState<GameCategory[]>([]);
  const [features, setFeatures] = useState<GameFeature[]>([]);
  const [languages, setLanguages] = useState<GameLanguage[]>([]);

  useWindowSize(({ isDifferentSize }) => {
    if (isDifferentSize) {
      setIsOpen(false);
      ref.current?.classList.add("no-transition");
      setTimeout(() => {
        ref.current?.classList.remove("no-transition");
      }, 300);
    }
  });

  const defaultFilters: GameFilter = {
    search: "",
    only_promoted: false,
    categories: [],
    languages: [],
    features: [],
    prices: { min: 0, max: 101 },
    order_by: filters.order_by,
  };

  const isDefaultFilters =
    JSON.stringify(filters) === JSON.stringify(defaultFilters);

  const freeString = TText({
    label: "free",
    translationType: "app",
  });

  const fetchFilters = () => {
    fetchAPI
      .get<GameInfoResponse>("/game-info/all")
      .then((filtre) => {
        setCategories(filtre.categories);
        setLanguages(filtre.languages);
        setFeatures(filtre.features);
      })
      .catch((error) => console.error("Error fetching filters:", error));
  };

  useEffect(() => {
    fetchFilters();
  }, []);

  return (
    <div
      className={classNames("filter-sidebar", {
        "filter-sidebar--open": isOpen,
      })}
      onClick={(e) => {
        if (e.target === ref.current) {
          setIsOpen(false);
        }
      }}
      ref={ref}
    >
      <div className="filter-sidebar-container">
        <div className="filter-sidebar-top">
          <div className="filter-sidebar-header">
            <TLabel baliseType="h2" capitalizeFirstLetter label="filters" />
            <MaterialSymbol
              className="filter-sidebar-clear-filters"
              disabled={isDefaultFilters}
              icon="filter_alt_off"
              onClick={() => !isDefaultFilters && setFilters(defaultFilters)}
              size={17}
            />
          </div>
          <div className="filter-sidebar-top-content">
            <div className="filter-item filter-item-sort">
              <TLabel className="filter-item-title" label="filter.orderBy" />
              <select
                className="filter-item-select"
                name="filter-order-by"
                onChange={(e) =>
                  setFilters({ ...filters, order_by: e.target.value })
                }
                value={filters.order_by}
              >
                {ORDER_BY_OPTIONS.map((value) => (
                  <option key={value} value={value}>
                    <TLabel
                      label={`filter.orderBy.${value}` as TranslationLabelType}
                      noBalise
                    />
                  </option>
                ))}
              </select>
            </div>
            <div className="filter-item search-bar">
              <MaterialSymbol
                className="search-bar-icon"
                icon="search"
                size={24}
              />
              <input
                className="search-bar-input"
                onChange={(e) =>
                  setFilters({ ...filters, search: e.target.value })
                }
                placeholder={TText({ label: "filter.search" })}
                type="text"
                value={filters.search}
              />
            </div>
            <label className="filter-item filter-item-switch">
              <Switch
                checked={filters.only_promoted}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    only_promoted: e.target.checked,
                  })
                }
              />
              <TLabel label="filters.only_promoted" />
            </label>

            <div className="filter-item-price">
              <TLabel className="filter-item-title" label="price" />
              <Slider
                getAriaValueText={(value) =>
                  value > 0 ? `${value > 100 ? "+100" : value} €` : freeString
                }
                marks={[
                  {
                    value: 0,
                    label:
                      filters.prices.min == 0
                        ? capitalizeFirstLetter(freeString)
                        : filters.prices.min == 101
                          ? "+100 €"
                          : `${filters.prices.min} €`,
                  },
                  {
                    value: 101,
                    label:
                      filters.prices.max == 0
                        ? capitalizeFirstLetter(freeString)
                        : filters.prices.max == 101
                          ? "+100 €"
                          : `${filters.prices.max} €`,
                  },
                ]}
                max={101}
                onChange={(_, value) =>
                  setFilters({
                    ...filters,
                    prices: {
                      min: (value as number[])[0],
                      max: (value as number[])[1],
                    },
                  })
                }
                sx={{
                  margin: "1rem",
                  width: "auto",
                  "& .MuiSlider-markLabel": {
                    color: "white",
                  },
                }}
                value={[filters.prices.min, filters.prices.max]}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) =>
                  value > 0 ? `${value > 100 ? "+100" : value} €` : freeString
                }
              />
            </div>
            <Dropdown
              alphabeticalOrder
              options={categories.map((category) => ({
                label: getTranslatedText(
                  selectedLanguage,
                  "category",
                  category.label as TranslationCategoryLabelType,
                  { capitalizeFirstLetter: true },
                ),
                value: category.id,
              }))}
              selected={filters.categories}
              setSelected={(selected) =>
                setFilters({ ...filters, categories: selected as number[] })
              }
              title={<TLabel label="categories" noBalise />}
            />
            <Dropdown
              alphabeticalOrder
              options={languages.map((language) => ({
                label: getTranslatedText(
                  selectedLanguage,
                  "language",
                  language.label as TranslationLanguageLabelType,
                  { capitalizeFirstLetter: true },
                ),
                value: language.id,
              }))}
              selected={filters.languages}
              setSelected={(selected) =>
                setFilters({ ...filters, languages: selected as number[] })
              }
              title={<TLabel label="languages" noBalise />}
            />
            <Dropdown
              alphabeticalOrder
              options={features.map((feature) => ({
                label: getTranslatedText(
                  selectedLanguage,
                  "feature",
                  feature.label as TranslationFeatureLabelType,
                  { capitalizeFirstLetter: true },
                ),
                value: feature.id,
              }))}
              selected={filters.features}
              setSelected={(selected) =>
                setFilters({ ...filters, features: selected as number[] })
              }
              title={<TLabel label="features" noBalise />}
            />
          </div>
        </div>
        <div className="filter-sidebar-bottom">
          <button
            className="filter-sidebar-close"
            onClick={() => setIsOpen(false)}
          >
            <MaterialSymbol icon="vertical_align_bottom" size={24} />
            <span>Fermer</span>
          </button>
        </div>
      </div>
      <button
        className="filter-sidebar-button-opener"
        onClick={() => setIsOpen(true)}
      >
        <MaterialSymbol icon="filter_alt" size={18} />
      </button>
    </div>
  );
};

export default FilterSidebar;
