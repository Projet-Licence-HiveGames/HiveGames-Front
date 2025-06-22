import React, { Suspense, useEffect, useState } from "react";
import { useGamesApi } from "@api/services/gamesApi.ts";

import { useCart } from "@context/CartContext.tsx";
import { GameBaseType } from "@customTypes/Game";

import { CartAmountTotal } from "@components/Cart/CartAmountTotal/CartAmountTotal.tsx";
import { CartArticleCard } from "@components/Cart/CartArticleCard/CartArticleCard.tsx";
import { Loader } from "@components/ui/Loader/Loader.tsx";
import { TLabel } from "@components/ui/TranslationLabel/TLabel.tsx";

import "./Cart.css";

export const Cart: React.FC = () => {
  const { fetchGamesByIds } = useGamesApi();
  const { cartItems, removeFromCart } = useCart();
  const [games, setGames] = useState<GameBaseType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const ids = cartItems.map(Number);

  useEffect(() => {
    if (cartItems.length === 0) {
      setGames([]);
      return;
    }
    setLoading(true);
    fetchGamesByIds({ ids })
      .then((data) => {
        setGames(data as GameBaseType[]);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [cartItems]);

  const handleRemoveFromCart = (id: number) => {
    removeFromCart([id]);
    setGames((prevGames) => prevGames.filter((game) => game.id !== id));
  };

  if (loading) return <Loader />;
  if (error) return <p>Error: {error}</p>;
  if (games.length === 0)
    return <TLabel baliseType={"p"} label={"cart.empty"} />;

  return (
    <div className="cart-container">
      <div className="cart-container__content">
        <section className="cart-container__panel left">
          <header className="cart-container__header">
            <TLabel baliseType={"h1"} label={"cart.your_cart"} />
          </header>
          {games.map((game) => (
            <Suspense fallback={<Loader />} key={game.id}>
              <CartArticleCard
                isItemCart={false}
                buyButton={false}
                imageUrl={game.images}
                key={game.id}
                game={game}
                onRemove={() => handleRemoveFromCart(game.id)}
              />
            </Suspense>
          ))}
          <div className={"cart-container__total"}>
            <CartAmountTotal games={games} />
          </div>
        </section>
        {games.some(
          (game) => Array.isArray(game.dlcs) && game.dlcs.length > 0,
        ) && (
          <aside className="cart-container__panel right">
            <header className="cart-container__header">
              <TLabel baliseType={"h2"} label={"cart.additional_content"} />
            </header>
            <div className="cart-container__dlcs-title">
              {games.flatMap((game) =>
                Array.isArray(game.dlcs)
                  ? game.dlcs.map((dlc) => (
                      <Suspense fallback={<Loader />} key={dlc.id}>
                        <CartArticleCard
                          game={dlc}
                          imageUrl={dlc.images}
                          isDlc={true}
                          key={dlc.id}
                          onRemove={() => handleRemoveFromCart(dlc.id)}
                        />
                      </Suspense>
                    ))
                  : [],
              )}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};
