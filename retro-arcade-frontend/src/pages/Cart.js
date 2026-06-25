// src/pages/Cart.js
import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "../styles/Cart.css";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const total = cartItems.reduce((sum, item) => sum + (item.price || 0), 0).toFixed(2);

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("🛒 Your cart is empty!");
      return;
    }
    navigate("/checkout");
  };

  return (
    <div className="cart-container">
      <h1 className="cart-heading">🛒 Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty</p>
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <div>
                  <strong>{item.title}</strong> - ${item.price}
                </div>
                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                  ❌ Remove
                </button>
              </li>
            ))}
          </ul>

          <h3 className="cart-total">Total: ${total}</h3>

          <div className="cart-buttons">
            <button className="btn clear-btn" onClick={clearCart}>🗑️ Clear Cart</button>
            <button className="btn checkout-btn" onClick={handleCheckout}>💳 Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;