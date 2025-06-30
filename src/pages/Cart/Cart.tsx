import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGamesApi } from "@api/services/gamesApi.ts";
import { RemoveShoppingCartOutlined } from "@mui/icons-material";

import { useCart } from "@contexts/CartContext.tsx";
import { GameBaseType, GameDlcType } from "@customTypes/Game";

import { CartAmountTotal } from "@components/Cart/CartAmountTotal/CartAmountTotal.tsx";
import { CartArticleCard } from "@components/Cart/CartArticleCard/CartArticleCard.tsx";
import GameCard from "@components/GameCard/GameCard";
import { Loader } from "@components/ui/Loader/Loader.tsx";
import { TLabel } from "@components/ui/TranslationLabel/TLabel.tsx";

import "./Cart.css";

export const Cart: FC = () => {
  const { fetchGamesByIds } = useGamesApi();
  const { cartItems, removeFromCart } = useCart();
  const [games, setGames] = useState<GameBaseType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
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

  if (loading) return <Loader large />;
  if (error) return <p>Error: {error}</p>;
  if (games.length === 0) {
    return (
      <div className="cart-empty-container">
        <div className="cart-empty-card">
          <RemoveShoppingCartOutlined className="cart-empty-icon" />
          <TLabel
            baliseType={"h1"}
            className={"cart-empty-title"}
            label={"cart.empty"}
          />
          <button
            className="cart-empty-button"
            onClick={() => navigate("/catalog")}
          >
            <TLabel label={"cart.continue_shopping"} />
          </button>
        </div>
      </div>
    );
  }

  const dlcsNotInCart: GameDlcType[] = games.flatMap((game) =>
    game.dlcs?.length
      ? game.dlcs.filter((dlc) => !cartItems.includes(dlc.id))
      : [],
  );

  return (
    <div className="cart-container">
      <div className="cart-container__content">
        <section className="cart-container__panel left">
          <header className="cart-container__header">
            <TLabel baliseType={"h1"} label={"cart.your_cart"} />
          </header>
          {games.map((game) => (
            <CartArticleCard
              game={game}
              imageUrl={game.images}
              key={game.id}
              onRemove={() => handleRemoveFromCart(game.id)}
            />
          ))}
          <div className={"cart-container__total"}>
            <CartAmountTotal games={games} />
          </div>
        </section>
        {dlcsNotInCart.length > 0 && (
          <aside className="cart-container__panel right">
            <header className="cart-container__header">
              <TLabel baliseType={"h2"} label={"cart.additional_content"} />
            </header>
            <div className="cart-container__dlcs-title">
              {dlcsNotInCart.map((dlc) => (
                <GameCard className="cart-game-card" game={dlc} key={dlc.id} />
              ))}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};
