// src/components/PayPalCheckout.js
import React, { useEffect } from "react";

const PayPalCheckout = ({ amount = 10.0, onSuccess }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.paypal.com/sdk/js?client-id=YOUR_PAYPAL_CLIENT_ID";
    script.addEventListener("load", () => {
      if (window.paypal) {
        window.paypal.Buttons({
          createOrder: function (data, actions) {
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: amount.toString()
                }
              }]
            });
          },
          onApprove: function (data, actions) {
            return actions.order.capture().then((details) => {
              alert("✅ Payment completed by " + details.payer.name.given_name);
              if (onSuccess) {
                onSuccess(details);
              }
            });
          },
          onError: function (err) {
            console.error("❌ PayPal Checkout Error", err);
          }
        }).render("#paypal-button-container");
      }
    });

    document.body.appendChild(script);
  }, [amount, onSuccess]);

  return <div id="paypal-button-container" />;
};

export default PayPalCheckout;