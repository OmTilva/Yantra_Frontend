import React, { useState } from "react";
import axios from "axios";
import styles from "../styles/AccountSearch.module.css";

const AccountSearch = () => {
  const [username, setUsername] = useState("");
  const [accountDetails, setAccountDetails] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!username.trim()) return;

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/logs/searchUserAccount`,
        {
          params: { username },
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setAccountDetails(response.data);
      setError("");
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to fetch account details"
      );
      setAccountDetails(null);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>SEARCH ACCOUNT</div>

        <div className={styles.searchBox}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>USERNAME:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={handleKeyPress}
              className={styles.input}
            />
          </div>

          <button onClick={handleSearch} className={styles.searchButton}>
            Search
          </button>

          {error && <div className={styles.error}>{error}</div>}

          {accountDetails && (
            <div className={styles.results}>
              <div className={styles.accountInfo}>
                <div>Account Details</div>
                <div>USERNAME: {accountDetails.username}</div>
                <div>BALANCE: {accountDetails.balance}</div>
                <div>STOCKS:</div>
              </div>

              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Stock Name</th>
                    <th>Units</th>
                    <th>Value per Unit</th>
                    <th>Total Value</th>
                  </tr>
                </thead>
                <tbody>
                  {accountDetails.portfolio.map((stock, index) => (
                    <tr key={index}>
                      <td>{stock.stock.stockName}</td>
                      <td>{stock.quantity}</td>
                      <td>{stock.averageBuyPrice}</td>
                      <td>
                        {(stock.quantity * stock.averageBuyPrice).toFixed(2)}
                      </td>
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

export default AccountSearch;
