import { FC, useEffect, useState } from "react";
import { useGamesApi } from "@api/services/gamesApi.ts";

import { useAuth } from "@contexts/AuthProvider";
import { GameBaseType } from "@customTypes/Game.ts";

import GameCard from "@components/GameCard/GameCard.tsx";
import { GameCardSkeleton } from "@components/Skeleton/GameCard/GameCardSkeleton.tsx";
import { TLabel } from "@components/ui/TranslationLabel/TLabel.tsx";

import "./Wishlist.css";

export const Wishlist: FC = () => {
  const [gameUserWishlist, setGameUserWishlist] = useState<GameBaseType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { fetchGameById } = useGamesApi();

  useEffect(() => {
    if (!user?.game_collections) {
      setGameUserWishlist([]);
      setIsLoading(false);
      return;
    }

    const wishedGameIds = user.game_collections
      .filter((game) => game.is_wished)
      .map((game) => game.game_id);

    if (wishedGameIds.length === 0) {
      setGameUserWishlist([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    Promise.all(wishedGameIds.map((id) => fetchGameById({ id })))
      .then((games) =>
        setGameUserWishlist(games.filter(Boolean) as GameBaseType[]),
      )
      .finally(() => setIsLoading(false));
  }, [user]);

  return (
    <div className={"wishlist-container"}>
      <TLabel baliseType={"h1"} label={"wishlist.title"} />
      {isLoading ? (
        Array.from({ length: 4 }).map((_, idx) => (
          <GameCardSkeleton key={idx} />
        ))
      ) : gameUserWishlist.length !== 0 ? (
        gameUserWishlist.map((game) => <GameCard key={game.id} game={game} />)
      ) : (
        <div className="wishlist-empty">
          <TLabel baliseType={"p"} label={"wishlist.empty"} />
        </div>
      )}
    </div>
  );
};
