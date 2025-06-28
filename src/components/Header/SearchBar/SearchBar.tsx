import { FC, useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Search } from "@mui/icons-material";
import classNames from "classnames";

import { GameType } from "@customTypes/Game";
import { useOutsideClick } from "@hooks/useOutsideClick";

import ImageWithLoader from "@components/ui/Image/ImageWithLoader";
import { Loader } from "@components/ui/Loader/Loader";
import { TLabel, TText } from "@components/ui/TranslationLabel/TLabel";

import defaultGameThumbnailImage from "@assets/images/defaultGameThumbnail.png";

import "./SearchBar.css";

import { useGamesApi } from "@/api/services/gamesApi";

export const SearchBar: FC = () => {
  const navigate = useNavigate();
  const { fetchSearchGamesByName } = useGamesApi();
  const ref = useOutsideClick<HTMLDivElement>(
    () => showSearchResults && setShowSearchResults(false),
  );

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<GameType[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  const fetchResults = useCallback(async () => {
    setSearchLoading(true);
    fetchSearchGamesByName(search)
      .then(setSearchResults)
      .catch(() => toast.error("Erreur lors de la recherche."))
      .finally(() => setSearchLoading(false));
  }, [search, fetchSearchGamesByName]);

  useEffect(() => {
    if (search.trim().length > 0) {
      setSearchLoading(true);
      const timeoutId = setTimeout(async () => {
        await fetchResults();
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [search]);

  const onChangeSearch = (value: string) => {
    setSearch(value);
    setShowSearchResults(value.length > 0);
  };

  return (
    <div
      className="search-bar"
      ref={ref}
      onFocus={() => setShowSearchResults(true)}
    >
      <Search className="search-icon" />
      <input
        id="search-bar-input"
        type="text"
        className="search-bar-input"
        placeholder={TText({ label: "header.search" })}
        value={search}
        onChange={(e) => onChangeSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            navigate(
              `/catalog?search=${encodeURIComponent(search)}&order_by=name-asc`,
            );
            setSearch("");
            setShowSearchResults(false);
          }
        }}
      />
      <div
        className={classNames("search-results-container", {
          hidden: !showSearchResults || search.trim().length === 0,
        })}
      >
        <div className={"search-results"}>
          {searchLoading || search.trim().length === 0 ? (
            <Loader className="search-results-loader" />
          ) : searchResults.length ? (
            <>
              {searchResults.slice(0, 4).map((game) => (
                <Link
                  key={game.id}
                  to={`/game/${game.id}`}
                  className="search-results-item"
                  onClick={() => onChangeSearch("")}
                >
                  <ImageWithLoader
                    src={
                      game.images?.find((i) => i.file_name === "logo.png")
                        ?.file_url || defaultGameThumbnailImage
                    }
                    alt=""
                  />
                  <span className="search-results-item-name">{game.name}</span>
                </Link>
              ))}
              {searchResults.length > 4 && (
                <Link
                  to={`/catalog?search=${encodeURIComponent(search)}&order_by=name-asc`}
                  className="search-results-item"
                  onClick={() => onChangeSearch("")}
                >
                  <TLabel label="see_more" />
                </Link>
              )}
            </>
          ) : (
            <TLabel label="header.search.no_results" />
          )}
        </div>
      </div>
    </div>
  );
};
