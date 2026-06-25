import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import GameList from "./pages/GameList";
import GameDetails from "./pages/GameDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentLogs from "./pages/PaymentLogs";
import AdminPaymentLogs from "./pages/AdminPaymentLogs";
import { CartProvider } from "./context/CartContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
    <CartProvider>
      <Router>
        {/* ✅ Transparent, fixed top header */}
        <header
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            padding: "1rem 2rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "rgba(0, 0, 0, 0.3)",
            backdropFilter: "blur(10px)",
            zIndex: 999,
            borderBottom: "1px solid #66fcf1",
            fontFamily: "Press Start 2P, sans-serif",
          }}
        >
          <Link
            to="/"
            style={{
              color: "#66fcf1",
              textDecoration: "none",
              fontSize: "1rem",
              whiteSpace: "nowrap",
            }}
          >
            🕹️ Retro Arcade
          </Link>
          <Link
            to="/cart"
            style={{
              backgroundColor: "#66fcf1",
              color: "#0b0c10",
              padding: "0.5rem 1rem",
              borderRadius: "6px",
              textDecoration: "none",
              fontSize: "0.8rem",
              whiteSpace: "nowrap",
            }}
          >
            🛒 Cart
          </Link>
        </header>

        {/* ✅ Offset page content so it's not under the header */}
        <div
          style={{
            paddingTop: "5.5rem",
            maxWidth: "100%",
            overflowX: "hidden",
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/games" element={<GameList />} />
            <Route path="/games/:id" element={<GameDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/payments" element={<PaymentLogs />} />
            <Route path="/admin/payments" element={<AdminPaymentLogs />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </div>

        {/* ✅ Toasts */}
        <ToastContainer position="top-right" autoClose={2000} />
      </Router>
    </CartProvider>
  );
}

export default App;