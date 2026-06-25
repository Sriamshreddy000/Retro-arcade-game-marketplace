// src/pages/GameDetails.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/GameDetails.css";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import GameChat from "../components/GameChat";

const GameDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [game, setGame] = useState(null);
  const [error, setError] = useState(null);

  // Fetch game info
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/games/${id}`)
      .then((res) => setGame(res.data))
      .catch((err) => {
        console.error("Error loading game:", err);
        setError("Game not found");
      });
  }, [id]);

  const handleBuyNow = () => {
    navigate("/checkout");
  };

  const handleAddToCart = () => {
    addToCart(game);
    toast.success(`${game.title} added to cart!`);
    navigate("/cart");
  };

  if (error)
    return (
      <div className="game-details-container">
        <p className="error-text">{error}</p>
      </div>
    );

  if (!game)
    return (
      <div className="game-details-container">
        <p className="loading-text">Loading Game...</p>
      </div>
    );

  return (
    <div className="game-details-container">
      <h1 className="retro-heading">🕹️ {game.title}</h1>

      <div className="game-card-detail">
        <img
          src={game.imageUrl}
          alt={game.title}
          className="game-detail-img"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/400x250?text=No+Image";
          }}
        />

        <div className="game-detail-text">
          <h2 className="detail-title">{game.title}</h2>
          <p className="detail-description">{game.description}</p>
          <p className="game-genre">Genre: {game.genre || "Arcade"}</p>
          <h3 className="detail-price">${game.price}</h3>

          <div className="detail-buttons">
            <button className="btn buy-btn" onClick={handleBuyNow}>
              Buy Now
            </button>
            <button className="btn cart-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* 💬 Chat component below game card */}
      <GameChat
        gameId={Number(game.id)}
        currentUserId={2}     // ✅ Replace with actual logged-in user ID
        otherUserId={3}       // ✅ Replace with seller/peer ID
        isAdmin={false}       // ✅ Set to true for admin view
      />
    </div>
  );
};

export default GameDetails;