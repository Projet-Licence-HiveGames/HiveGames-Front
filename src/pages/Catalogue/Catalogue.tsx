import React, { useEffect, useState } from "react";
import "./Catalogue.css";
import GameCard from "../../components/GameCard/GameCard.tsx";
import FilterSidebar, {
  GameFilter,
} from "../../components/Catalog/FilterSidebar/FilterSidebar.tsx";
import { Game } from "../../types/Game.ts";
import FilterModal from "../../components/Modal/FilterModal.tsx";
import useWindowSize from "../../utils/useWindowSize.ts";
import { useFetch } from "../../api/privateApi.ts";

export const Catalogue: React.FC = () => {
  const fetchAPI = useFetch();
  const { isMobile, isDesktop, isTablet } = useWindowSize();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const [filters, setFilters] = React.useState<GameFilter>({
    search: "",
    categories: [],
    languages: [],
    features: [],
    prices: { min: 0, max: 101 },
  });
  const [gameList, setGameList] = React.useState<Game[]>([
    // { id: 1, name: "Game 1", price: 100, oldPrice: 200 },
    // { id: 2, name: "Game 2", price: 200, oldPrice: 0 },
    // { id: 3, name: "Game 3", price: 300, oldPrice: 350 },
    // { id: 4, name: "Game 4", price: 400, oldPrice: 420 },
    // { id: 5, name: "Game 5", price: 500 },
    // { id: 6, name: "Game 6", price: 600 },
    // { id: 7, name: "Game 7", price: 700 },
    // { id: 8, name: "Game 8", price: 800 },
    // { id: 9, name: "Game 9", price: 900 },
    // { id: 10, name: "Game 10", price: 1000 },
  ]);

  const fetchGames = async () => {
    try {
      await fetchAPI.post<Game[]>("/games", filters).then(setGameList);
    }
    catch (error) {
      console.error("Erreur lors de la récupération des jeux :", error);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      fetchGames();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [filters]);

  return (
    <div className="catalog-container">
      <div className="catalog-container-cards">
        {gameList.map((game, index) => (
          <GameCard key={index} game={game} />
        ))}
      </div>
      {(isDesktop || isTablet) && (
        <FilterSidebar filters={filters} setFilters={setFilters} />
      )}
      {isMobile && (
        <button className="filter-button" onClick={toggleModal}>
          Filtres
        </button>
      )}

      {isModalOpen && <FilterModal onClose={toggleModal} />}
    </div>
  );
};
