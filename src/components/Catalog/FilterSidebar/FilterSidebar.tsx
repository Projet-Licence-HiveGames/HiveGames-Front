import { FC, useEffect, useState } from "react";
import { MaterialSymbol } from "react-material-symbols";
import { Slider } from "@mui/joy";
import classNames from "classnames";

import { useFetch } from "../../../api/privateApi";
import { useOutsideClick } from "../../../hooks/useOutsideClick";
import useWindowSize from "../../../hooks/useWindowSize";
import { GameCategory, GameFeature, Language } from "../../../types/Game";

import Dropdown, { DropdownOption } from "./Dropdown/Dropdown";

import "./FilterSidebar.css";

export interface GameFilter {
  search: string;
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
  useWindowSize(({ isDifferentSize }) => {
    if (isDifferentSize) {
      setIsOpen(false);
      ref.current?.classList.add("no-transition");
      setTimeout(() => {
        ref.current?.classList.remove("no-transition");
      }, 300);
    }
  });
  const ref = useOutsideClick<HTMLDivElement>(
    () => setIsOpen(false),
  );

  const [isOpen, setIsOpen] = useState(false);

  const [categories, setCategories] = useState<GameCategory[]>([]);
  const [features, setFeatures] = useState<GameFeature[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);

  const defaultFilters: GameFilter = {
    search: "",
    categories: [],
    languages: [],
    features: [],
    prices: { min: 0, max: 101 },
    order_by: filters.order_by,
  };

  const isDefaultFilters =
    JSON.stringify(filters) === JSON.stringify(defaultFilters);

  const fetchFilters = async () => {
    try {
      await fetchAPI.get<GameCategory[]>("/categories").then(setCategories);
      await fetchAPI.get<GameFeature[]>("/features").then(setFeatures);
      await fetchAPI.get<Language[]>("/languages").then(setLanguages);
    } catch (error) {
      console.error("Erreur lors de la récupération des filtres", error);
    }
  };

  useEffect(() => {
    fetchFilters();
  }, []);

  return (
    <div
      className={classNames("filter-sidebar", {
        "filter-sidebar--open": isOpen,
      })}
      ref={ref}
    >
      <div className="filter-sidebar-container">
        <div className="filter-sidebar-top">
          <div className="filter-sidebar-header">
            <span>FILTRES</span>
            <MaterialSymbol
              icon="filter_alt_off"
              size={17}
              disabled={isDefaultFilters}
              className="filter-sidebar-clear-filters"
              onClick={() => !isDefaultFilters && setFilters(defaultFilters)}
            />
          </div>
          <div className="filter-item filter-item-sort">
            <span className="filter-item-title">Trier par</span>
            <select
              className="filter-item-select"
              value={filters.order_by}
              onChange={(e) =>
                setFilters({ ...filters, order_by: e.target.value })
              }
            >
              <option value="rating-desc">Avis (+ / -)</option>
              <option value="rating-asc">Avis (- / +)</option>
              <option value="name-asc">Nom (A-Z)</option>
              <option value="name-desc">Nom (Z-A)</option>
              <option value="price-asc">Prix (- / +)</option>
              <option value="price-desc">Prix (+ / -)</option>
              <option value="release_date-desc">Sortie récente</option>
              <option value="release_date-asc">Sortie ancienne</option>
            </select>
          </div>
          <div className="filter-item search-bar">
            <MaterialSymbol
              icon="search"
              size={24}
              className="search-bar-icon"
            />
            <input
              type="text"
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
              className="search-bar-input"
              placeholder="Rechercher un nom..."
            />
          </div>
          <div className="filter-item">
            <span className="filter-item-title">Prix</span>
            <Slider
              sx={{
                margin: "1rem",
                width: "auto",
                "& .MuiSlider-markLabel": {
                  color: "white",
                },
              }}
              value={[filters.prices.min, filters.prices.max]}
              onChange={(_, value) =>
                setFilters({
                  ...filters,
                  prices: {
                    min: (value as number[])[0],
                    max: (value as number[])[1],
                  },
                })
              }
              valueLabelDisplay="auto"
              valueLabelFormat={(value) =>
                value > 0 ? `${value > 100 ? "+100" : value} €` : "gratuit"
              }
              getAriaValueText={(value) =>
                value > 0 ? `${value > 100 ? "+100" : value} €` : "gratuit"
              }
              max={101}
              marks={[
                {
                  value: 0,
                  label:
                    filters.prices.min == 0
                      ? "Gratuit"
                      : filters.prices.min == 101
                        ? "+100 €"
                        : `${filters.prices.min} €`,
                },
                {
                  value: 101,
                  label:
                    filters.prices.max == 0
                      ? "Gratuit"
                      : filters.prices.max == 101
                        ? "+100 €"
                        : `${filters.prices.max} €`,
                },
              ]}
            />
          </div>

          <Dropdown
            title="Categories"
            options={categories.map(
              (category) =>
                ({
                  label: category.label,
                  value: category.id,
                }) as DropdownOption,
            )}
            selected={filters.categories}
            setSelected={(selected) =>
              setFilters({ ...filters, categories: selected as number[] })
            }
          />
          <Dropdown
            title="Languages"
            options={languages.map(
              (language) =>
                ({
                  label: language.label,
                  value: language.id,
                }) as DropdownOption,
            )}
            selected={filters.languages}
            setSelected={(selected) =>
              setFilters({ ...filters, languages: selected as number[] })
            }
          />
          <Dropdown
            title="Features"
            options={features.map(
              (feature) =>
                ({ label: feature.label, value: feature.id }) as DropdownOption,
            )}
            selected={filters.features}
            setSelected={(selected) =>
              setFilters({ ...filters, features: selected as number[] })
            }
          />
        </div>
        <div className="filter-sidebar-bottom">
          <button
            className="filter-sidebar-close"
            onClick={() => setIsOpen(false)}
          >
            <MaterialSymbol icon="close" size={24} />
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
