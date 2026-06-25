import React, { useEffect, useState } from "react";
import axios from "axios";

const PaymentLogs = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8080/api/payments/all")
      .then(response => {
        setPayments(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching payments:", error);
        setError("Failed to load payment logs.");
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>Payment Logs</h1>
      <p>Payment logs appear here</p>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>ID</th>
              <th>Transaction ID</th>
              <th>Payer Email</th>
              <th>Amount</th>
              <th>Currency</th>
              <th>Status</th>
              <th>Game ID</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td>{payment.id}</td>
                <td>{payment.transactionId}</td>
                <td>{payment.payerEmail}</td>
                <td>{payment.amount}</td>
                <td>{payment.currency}</td>
                <td>{payment.status}</td>
                <td>{payment.gameId}</td>
                <td>{payment.paymentTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PaymentLogs;