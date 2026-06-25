import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css"; // 🔥 Add this file

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-overlay">
        <h1 className="home-title">🕹️ Retro Arcade Marketplace</h1>
        <p className="home-tagline">Buy. Sell. Play. All things classic!</p>
        <div className="home-buttons">
          <Link to="/games" className="home-btn browse">🎮 Browse Games</Link>
          <Link to="/admin/payments" className="home-btn admin">🛡️ Admin Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
