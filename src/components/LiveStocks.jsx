import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/livestocks.module.css";

const LiveStocks = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [role, setRole] = useState("");
  const [brokerHouse, setBrokerHouse] = useState(null);
  const [currentBrokerage, setCurrentBrokerage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        // Fetch user details
        const userResponse = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/users/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const user = userResponse.data;
        setRole(user.role);

        // Fetch broker house details if the user is a jobber
        if (user.role === "jobber" && user.brokerHouse) {
          const brokerHouseResponse = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/brokerhouse/name/${
              user.brokerHouse.name
            }`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setBrokerHouse(brokerHouseResponse.data);
          setCurrentBrokerage(brokerHouseResponse.data.brokerage);
        }

        // Fetch live stocks
        const stocksResponse = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/stocks/allStocks`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setStocks(stocksResponse.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // Poll for updates every 5 seconds
    const interval = setInterval(fetchData, 5000);
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

  if (loading) return <div>Loading data...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles["main-container"]}>
      <h1 className={styles.h1}>Live Stock Prices</h1>
      {role === "jobber" && brokerHouse && (
        <div className={styles.brokerageInfo}>
          <p>BrokerHouse: {brokerHouse.name}</p>
          <p>Current Brokerage: {currentBrokerage}%</p>
        </div>
      )}
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
