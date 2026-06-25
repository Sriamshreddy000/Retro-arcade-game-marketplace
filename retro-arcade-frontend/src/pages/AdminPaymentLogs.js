import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminPaymentLogs = () => {
  const [payments, setPayments] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");

  const adminPassword = "retroadmin123"; // Change this to your desired password

  useEffect(() => {
    if (authenticated) {
      axios
        .get("http://localhost:8080/api/payments/all")
        .then((response) => {
          setPayments(response.data);
        })
        .catch((error) => {
          console.error("Error fetching payments:", error);
        });
    }
  }, [authenticated]);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordInput === adminPassword) {
      setAuthenticated(true);
    } else {
      alert("Incorrect password. Access denied.");
    }
  };

  if (!authenticated) {
    return (
      <div style={{ padding: "2rem" }}>
        <h2>Admin Login</h2>
        <form onSubmit={handlePasswordSubmit}>
          <input
            type="password"
            placeholder="Enter admin password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            style={{ marginRight: "1rem", padding: "0.5rem" }}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Payment Logs</h1>
      <p>Payment logs appear here</p>
      {payments.length === 0 ? (
        <p>No payments recorded.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>ID</th>
              <th>Order ID</th>
              <th>Status</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td>{payment.id}</td>
                <td>{payment.orderId}</td>
                <td>{payment.status}</td>
                <td>{new Date(payment.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminPaymentLogs;