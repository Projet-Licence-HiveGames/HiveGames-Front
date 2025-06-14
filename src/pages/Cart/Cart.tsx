import React, { Suspense, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useGamesApi } from "../../api/services/gamesApi.ts";
import { CartArticleCard } from "../../components/CartArticleCard/CartArticleCard.tsx";
import { Loader } from "../../components/Loader/Loader.tsx";
import { TLabel } from "../../components/ui/TranslationLabel/TLabel.tsx";
import { useCart } from "../../context/CartContext";
import { Game } from "../../types/Game";

import "./Cart.css";

export const Cart: React.FC = () => {
  const { fetchGamesByIds } = useGamesApi();
  const { cartItems, removeFromCart, clearCart } = useCart();
  const [games, setGames] = useState<Game[]>([]);
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
        setGames(data as Game[]);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [cartItems]);

  const handleRemoveFromCart = (id: number) => {
    removeFromCart(id);
    setGames((prevGames) => prevGames.filter((game) => game.id !== id));
  };

  if (loading) return <Loader />;
  if (error) return <p>Error: {error}</p>;
  if (games.length === 0)
    return <TLabel baliseType={"p"} label={"cart_empty"} />;

  return (
    <div className="cart-container">
      <header className="cart-container__header">
        <h2>Votre panier</h2>
      </header>
      <div className="cart-container__content">
        <section className="cart-container__panel left">
          {games.map((game) => (
            <Suspense fallback={<Loader />} key={game.id}>
              <CartArticleCard
                imageUrl={game.images}
                key={game.id}
                onRemove={() => handleRemoveFromCart(game.id)}
                price={game.price}
                title={game.name}
              />
            </Suspense>
          ))}
          <div className={"cart-container__total"}>
            <CartArticleCard
              isTotal={true}
              onRemove={() => clearCart()}
              price={games.reduce((total, game) => total + game.price, 0)}
              title={"Total du panier"}
            />
            <div className={"cart-container__total-button"}>
              <Link to={"/catalog"}>
                <TLabel
                  baliseType={"button"}
                  className={"cart-container__shopping-button"}
                  label="continue_shopping"
                />
              </Link>
              <Link to={"/cart/checkout"}>
                <TLabel
                  baliseType={"button"}
                  className={"cart-container__shopping-button"}
                  label={"purchase"}
                />
              </Link>
            </div>
          </div>
        </section>
        {games.some(
          (game) =>
            game.dlcs && Array.isArray(game.dlcs) && game.dlcs.length > 0,
        ) && (
          <aside className="cart-container__panel right">
            {games.map((game) =>
              game.dlcs && Array.isArray(game.dlcs)
                ? game.dlcs.map((dlc) => (
                    <Suspense fallback={<p>Chargement...</p>} key={dlc.id}>
                      <CartArticleCard
                        game={dlc}
                        imageUrl={dlc.images}
                        isDlc={true}
                        key={dlc.id}
                        onRemove={() => handleRemoveFromCart(dlc.id)}
                        price={dlc.price}
                        title={dlc.name}
                      />
                    </Suspense>
                  ))
                : null,
            )}
          </aside>
        )}
      </div>
    </div>
  );
};
