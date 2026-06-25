import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

// Custom hook for consuming cart context
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Load cart from localStorage on first render
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // ✅ Add to cart (prevents duplicates)
  const addToCart = (game) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === game.id);
      if (exists) return prev; // prevent duplicates
      return [...prev, game];
    });
  };

  // ✅ Remove item by ID
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((game) => game.id !== id));
  };

  // ✅ Clear all cart items
  const clearCart = () => {
    setCartItems([]);
  };

  // ✅ Compute total
  const totalPrice = cartItems.reduce((acc, item) => acc + (item.price || 0), 0).toFixed(2);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
