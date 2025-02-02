import React, { useState } from "react";
import axios from "axios";
import styles from "../styles/TransactionLogs.module.css";

const TransactionLogs = () => {
  const [bankerName, setBankerName] = useState("");
  const [buyerName, setBuyerName] = useState("");
  const [sellerName, setSellerName] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/logs/searchTransaction`,
        {
          params: { bankerName, buyerName, sellerName },
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setTransactions(response.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch transactions");
      setTransactions([]);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>SEARCH TRANSACTIONS</div>

        <div className={styles.searchBox}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>BANKER NAME:</label>
            <input
              type="text"
              value={bankerName}
              onChange={(e) => setBankerName(e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>BUYER NAME:</label>
            <input
              type="text"
              value={buyerName}
              onChange={(e) => setBuyerName(e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>SELLER NAME:</label>
            <input
              type="text"
              value={sellerName}
              onChange={(e) => setSellerName(e.target.value)}
              className={styles.input}
            />
          </div>

          <button onClick={handleSearch} className={styles.searchButton}>
            Search
          </button>

          {error && <div className={styles.error}>{error}</div>}

          {transactions.length > 0 && (
            <div className={styles.results}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Transaction ID</th>
                    <th>Banker Username</th>
                    <th>Buyer Name</th>
                    <th>Seller Name</th>
                    <th>Stock Name</th>
                    <th>Units</th>
                    <th>Price</th>
                    <th>Total Price</th>
                    <th>Transaction Time</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction, index) => (
                    <tr key={index}>
                      <td>{transaction.transactionID}</td>
                      <td>{transaction.bankerUsername}</td>
                      <td>{transaction.buyerID?.username || "N/A"}</td>
                      <td>{transaction.sellerID?.username || "N/A"}</td>
                      <td>{transaction.stockNumber.stockName}</td>
                      <td>{transaction.units}</td>
                      <td>{transaction.price.toFixed(2)}</td>
                      <td>{transaction.totalPrice.toFixed(2)}</td>
                      <td>{transaction.transactionTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionLogs;
