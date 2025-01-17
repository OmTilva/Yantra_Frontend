import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../styles/Transaction.module.css";

const Transaction = () => {
  const [formData, setFormData] = useState({
    sellerId: "",
    buyerId: "",
    stockNumber: "",
    unitsToTrade: "",
    tradePrice: "",
  });
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    // Fetch user role from the server or local storage
    const fetchUserRole = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/users/role`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUserRole(response.data.role);
      } catch (error) {
        console.error("Failed to fetch user role:", error);
      }
    };

    fetchUserRole();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userRole !== "banker" && userRole !== "admin") {
      toast.error("Only bankers or admins can make this transaction.");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/stocks/sell-stock`,
        {
          sellerName: formData.sellerId,
          buyerName: formData.buyerId,
          stockName: formData.stockNumber,
          quantity: formData.unitsToTrade,
          tradePrice: formData.tradePrice,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success(`Transaction successful: ${response.data.message}`);
      setFormData({
        sellerId: "",
        buyerId: "",
        stockNumber: "",
        unitsToTrade: "",
        tradePrice: "",
      }); // Reset form
    } catch (error) {
      toast.error(`Transaction failed: ${error.response.data.message}`);
    }
  };

  return (
    <div className={styles.container}>
      <ToastContainer />
      <div className={styles.formContainer}>
        <h1 className={styles.title}>TRANSACTION</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="sellerId">SELLER ID:</label>
            <input
              type="text"
              id="sellerId"
              name="sellerId"
              value={formData.sellerId}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="buyerId">BUYER ID:</label>
            <input
              type="text"
              id="buyerId"
              name="buyerId"
              value={formData.buyerId}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="stockNumber">STOCK NUMBER:</label>
            <input
              type="text"
              id="stockNumber"
              name="stockNumber"
              value={formData.stockNumber}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="unitsToTrade">UNITS TO TRADE:</label>
            <input
              type="text"
              id="unitsToTrade"
              name="unitsToTrade"
              value={formData.unitsToTrade}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="tradePrice">TRADE PRICE:</label>
            <input
              type="text"
              id="tradePrice"
              name="tradePrice"
              value={formData.tradePrice}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className={styles.submitBtn}>
            Submit Transaction
          </button>
        </form>
      </div>
    </div>
  );
};

export default Transaction;
