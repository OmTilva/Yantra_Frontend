import React, { useState } from "react";
import styles from "../styles/ipo.module.css";

const Ipo = () => {
  const stocks = [
    { id: 1, name: "ACME Corp", price: 117 },
    { id: 2, name: "TechStart Inc", price: 120 },
    { id: 3, name: "GreenEnergy Ltd", price: 95 },
    { id: 4, name: "HealthCare Plus", price: 135 },
    { id: 5, name: "FinTech Solutions", price: 85 },
  ];

  const [buyerId, setBuyerId] = useState("");
  const [selectedStocks, setSelectedStocks] = useState({});
  const [quantities, setQuantities] = useState({});
  const [error, setError] = useState("");

  const handleStockSelection = (stockId) => {
    setSelectedStocks((prev) => ({
      ...prev,
      [stockId]: !prev[stockId],
    }));

    if (!selectedStocks[stockId]) {
      setQuantities((prev) => ({
        ...prev,
        [stockId]: "",
      }));
    }
  };

  const handleQuantityChange = (stockId, value) => {
    if (value < 0) {
      setError("Quantity cannot be negative");
      return;
    }
    setError("");
    setQuantities((prev) => ({
      ...prev,
      [stockId]: value,
    }));
  };

  const calculateTotal = () => {
    return Object.entries(quantities).reduce((total, [stockId, quantity]) => {
      const stock = stocks.find((s) => s.id === parseInt(stockId));
      return total + stock.price * (parseInt(quantity) || 0);
    }, 0);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>IPO Stock Allocation</h1>

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.formGroup}>
        <label className={styles.label}>Buyer ID:</label>
        <input
          type="text"
          value={buyerId}
          onChange={(e) => setBuyerId(e.target.value)}
          placeholder="Enter your buyer ID"
          className={styles.input}
        />
      </div>

      <div className={styles.stocksContainer}>
        <h2 className={styles.subtitle}>Available Stocks</h2>
        {stocks.map((stock) => (
          <div key={stock.id} className={styles.stockItem}>
            <div className={styles.stockInfo}>
              <input
                type="checkbox"
                checked={selectedStocks[stock.id] || false}
                onChange={() => handleStockSelection(stock.id)}
                className={styles.checkbox}
              />
              <span className={styles.stockName}>{stock.name}</span>
              <span className={styles.stockPrice}>₹{stock.price}</span>
            </div>
            {selectedStocks[stock.id] && (
              <input
                type="number"
                placeholder="Quantity"
                className={styles.quantityInput}
                value={quantities[stock.id] || ""}
                onChange={(e) => handleQuantityChange(stock.id, e.target.value)}
                min="1"
              />
            )}
          </div>
        ))}
      </div>

      <div className={styles.totalSection}>
        <span className={styles.totalLabel}>Total:</span>
        <span className={styles.totalAmount}>
          ₹{calculateTotal().toLocaleString()}
        </span>
      </div>

      <button className={styles.submitButton}>Submit Allocation Request</button>
    </div>
  );
};

export default Ipo;
