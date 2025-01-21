import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/livestocks.module.css";

const LiveStocks = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/stocks/allStocks`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setStocks(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch stocks");
      } finally {
        setLoading(false);
      }
    };

    fetchStocks();
    // Poll for updates every 5 seconds
    const interval = setInterval(fetchStocks, 5000);
    return () => clearInterval(interval);
  }, []);

  const calculatePercentageChange = (current, previous) => {
    if (!previous) return "0.00";
    const change = ((current - previous) / previous) * 100;
    return change.toFixed(2);
  };

  const getColor = (percentage) => {
    if (percentage > 0) {
      return styles.green;
    } else if (percentage < 0) {
      return styles.red;
    }
    return "";
  };

  const stockArrow = (percentage) => {
    if (percentage > 0) {
      return "▲";
    } else if (percentage < 0) {
      return "▼";
    }
    return "";
  };

  if (loading) return <div>Loading stocks...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles["main-container"]}>
      <h1 className={styles.h1}>Live Stock Prices</h1>
      <div className={styles["stocks-container"]}>
        {stocks.map((stock) => {
          const percentChange = calculatePercentageChange(
            stock.currentPrice,
            stock.previousClose
          );

          return (
            <div key={stock._id} className={styles.liveStock}>
              <span className={styles["current-stock-name"]}>
                {stock.stockName}
              </span>
              <span className={styles["stock-price-container"]}>
                <p className={getColor(percentChange)}>
                  ₹{stock.currentPrice.toFixed(2)}
                </p>
                <p className={getColor(percentChange)}>
                  {stockArrow(percentChange)}
                </p>
              </span>
              <p className={styles["last-stock-price"]}>
                Last: ₹
                {stock.previousClose?.toFixed(2) ||
                  stock.currentPrice.toFixed(2)}
              </p>
              <p className={`${getColor(percentChange)} ${styles.percentage}`}>
                {percentChange}%
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LiveStocks;
