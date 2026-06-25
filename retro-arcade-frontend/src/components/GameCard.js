import React from "react";
import { Link } from "react-router-dom";

const GameCard = ({ game }) => {
  return (
    <div style={{ border: "1px solid #ddd", padding: "10px", width: "200px" }}>
      <img src={game.imageUrl} alt={game.title} style={{ width: "100%" }} />
      <h3>{game.title}</h3>
      <p>{game.description}</p>
      <p>${game.price}</p>
      <Link to={`/games/${game.id}`}>View Details</Link>
    </div>
  );
};

export default GameCard;
