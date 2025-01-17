import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/ipo.module.css";

const Ipo = () => {
  const [ipoStocks, setIpoStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedStocks, setSelectedStocks] = useState({});
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const fetchIPOStocks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/stocks/allIpo`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setIpoStocks(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch IPO stocks");
        setLoading(false);
      }
    };

    fetchIPOStocks();
  }, []);

  const handleStockSelection = (stockId) => {
    setSelectedStocks((prev) => ({
      ...prev,
      [stockId]: !prev[stockId],
    }));
    if (!selectedStocks[stockId]) {
      setQuantities((prev) => ({ ...prev, [stockId]: "" }));
    }
  };

  const handleQuantityChange = (stockId, value) => {
    setQuantities((prev) => ({ ...prev, [stockId]: value }));
  };

  const calculateTotal = () => {
    return ipoStocks.reduce((total, stock) => {
      if (selectedStocks[stock._id] && quantities[stock._id]) {
        return total + stock.ipoDetails.issuePrice * Number(quantities[stock._id]);
      }
      return total;
    }, 0);
  };

  if (loading) return <div className={styles.container}>Loading stocks...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Available IPOs</h1>
      <div className={styles.stocksContainer}>
        {ipoStocks.map((stock) => (
          <div key={stock._id} className={styles.stockItem}>
            <div className={styles.stockInfo}>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={selectedStocks[stock._id] || false}
                onChange={() => handleStockSelection(stock._id)}
              />
              <span className={styles.stockName}>{stock.stockName}</span>
              <span className={styles.stockPrice}>
                ₹{stock.ipoDetails.issuePrice}
              </span>
            </div>
            {selectedStocks[stock._id] && (
              <input
                type="number"
                min="1"
                className={styles.quantityInput}
                value={quantities[stock._id] || ""}
                onChange={(e) => handleQuantityChange(stock._id, e.target.value)}
                placeholder="Quantity"
              />
            )}
          </div>
        ))}
      </div>
      
      <div className={styles.totalSection}>
        <span className={styles.totalLabel}>Total Amount:</span>
        <span className={styles.totalAmount}>₹{calculateTotal().toFixed(2)}</span>
      </div>
      
      <button 
        className={styles.submitButton}
        onClick={() => {/* TODO: Implement submit logic */}}
      >
        Subscribe to Selected IPOs
      </button>
    </div>
  );
};

export default Ipo;
