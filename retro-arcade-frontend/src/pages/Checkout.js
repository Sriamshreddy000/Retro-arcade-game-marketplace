// src/pages/Checkout.js
import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const Checkout = () => {
  const amount = "29.99"; // Can be made dynamic later

  return (
    <div className="checkout-page" style={styles.page}>
      <h1 style={styles.title}>🛒 Complete Your Purchase</h1>
      <p style={styles.subtitle}>Secure payment powered by PayPal</p>

      <div style={styles.paypalContainer}>
        <PayPalScriptProvider options={{ "client-id": "AXVychApK-LGtEmJxpGuuDCxsARkaBw8TPQQtMwoy0m2aU5yFXfxOdG7DojEdVzOE7RNlMZWXv-YMwZN" }}>
          <PayPalButtons
            style={{ layout: "vertical", color: "gold", shape: "pill", label: "paypal" }}
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [{
                  amount: { value: amount }
                }]
              });
            }}
            onApprove={(data, actions) => {
              return actions.order.capture().then((details) => {
                alert(`✅ Transaction completed by ${details.payer.name.given_name}`);
                console.log("💰 Payment success:", details);
                window.location.href = "/payment-success";
              });
            }}
            onError={(err) => {
              console.error("❌ PayPal Checkout Error", err);
              alert("Something went wrong with the payment. Please try again.");
            }}
          />
        </PayPalScriptProvider>
      </div>
    </div>
  );
};

const styles = {
  page: {
    padding: "3rem",
    textAlign: "center",
    color: "#66fcf1",
    backgroundColor: "#0b0c10",
    minHeight: "100vh",
    fontFamily: "'Press Start 2P', sans-serif"
  },
  title: {
    marginBottom: "1rem",
    fontSize: "1.5rem"
  },
  subtitle: {
    marginBottom: "2rem",
    fontSize: "0.8rem",
    color: "#c5c6c7"
  },
  paypalContainer: {
    maxWidth: "400px",
    margin: "auto"
  }
};

export default Checkout;