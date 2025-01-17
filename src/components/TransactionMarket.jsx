import React, { useState } from "react";
import axios from "axios";
import styles from "../styles/TransactionMarket.module.css";

const TransactionMarket = () => {
  const [formData, setFormData] = useState({
    username: "",
    stockName: "",
    quantity: "",
    action: "",
  });

  const [message, setMessage] = useState({ text: "", type: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/stocks/trade-with-market`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setMessage({ text: response.data.message, type: "success" });
      setFormData({
        username: "",
        stockName: "",
        quantity: "",
        action: "",
      });
    } catch (error) {
      setMessage({
        text: error.response?.data?.message || "Failed to trade with market",
        type: "error",
      });
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Trade with Market</h1>
      {message.text && (
        <div className={`${styles.message} ${styles[message.type]}`}>
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="stockName">Stock Name:</label>
          <input
            type="text"
            id="stockName"
            name="stockName"
            value={formData.stockName}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="action">Action:</label>
          <select
            id="action"
            name="action"
            value={formData.action}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select Action
            </option>
            <option value="buy">Buy</option>
            <option value="sell">Sell</option>
          </select>
        </div>
        <button type="submit" className={styles.submitBtn}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default TransactionMarket;