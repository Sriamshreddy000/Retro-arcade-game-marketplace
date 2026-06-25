// src/pages/GameList.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/GameList.css";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify"; // ✅ Toastify import

const GameList = () => {
  const [games, setGames] = useState([]);
  const { addToCart } = useCart();
  const navigate = useNavigate(); // ✅ For Buy Now button

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/games")
      .then((response) => {
        setGames(response.data);
      })
      .catch((error) => {
        console.error("Error fetching games:", error);
      });
  }, []);

  // ✅ Show toast and add game to cart
  const handleAddToCart = (game) => {
    addToCart(game);
    toast.success(`${game.title} added to cart!`);
  };

  // ✅ Redirect to checkout
  const handleBuyNow = (game) => {
    addToCart(game); // Optional: add to cart before checkout
    navigate("/checkout");
  };

  return (
    <div className="game-list-container">
      <h1 className="retro-heading">🎮 Available Games</h1>
      <div className="game-grid">
        {games.map((game) => (
          <div className="game-card" key={game.id}>
            <img
              src={game.imageUrl || "https://via.placeholder.com/250x150?text=No+Image"}
              alt={game.title}
              className="game-image"
            />
            <h2 className="game-title">{game.title}</h2>
            <p className="game-description">{game.description}</p>
            <p className="game-price">${game.price}</p>
            <div className="button-group">
              <Link to={`/games/${game.id}`} className="btn details-btn">
                View Details
              </Link>
              <button className="btn buy-btn" onClick={() => handleBuyNow(game)}>
                Buy Now
              </button>
              <button className="btn cart-btn" onClick={() => handleAddToCart(game)}>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameList;