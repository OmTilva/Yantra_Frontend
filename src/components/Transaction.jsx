import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../styles/Transaction.module.css";
import TradePopup from "./TradePopup";

const Transaction = () => {
  const [formData, setFormData] = useState({
    sellerId: "",
    buyerId: "",
    stockNumber: "",
    unitsToTrade: "",
    tradePrice: "",
    brokerHouseName: "",
    username: "",
    stockName: "",
    quantity: "",
    action: "",
  });
  const [userRole, setUserRole] = useState("");
  const [brokerHouses, setBrokerHouses] = useState([]);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [tradeDetails, setTradeDetails] = useState(null);
  const [isTransaction, setIsTransaction] = useState(false);

  const quantityInputRef = useRef(null);

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

    // Fetch broker houses from the server
    const fetchBrokerHouses = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/brokerhouse/get-all-brokerhouses`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setBrokerHouses(response.data);
      } catch (error) {
        console.error("Failed to fetch broker houses:", error);
      }
    };

    fetchUserRole();
    fetchBrokerHouses();
  }, []);

  useEffect(() => {
    const quantityInput = quantityInputRef.current;
    if (quantityInput) {
      const handleWheel = (e) => e.preventDefault();
      quantityInput.addEventListener("wheel", handleWheel, { passive: false });
      return () => {
        quantityInput.removeEventListener("wheel", handleWheel);
      };
    }
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
          brokerHouseName: formData.brokerHouseName,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success(`Transaction successful: ${response.data.message}`);
      setTradeDetails(response.data.transaction);
      setIsTransaction(true);
      setFormData({
        sellerId: "",
        buyerId: "",
        stockNumber: "",
        unitsToTrade: "",
        tradePrice: "",
        brokerHouseName: "",
        username: "",
        stockName: "",
        quantity: "",
        action: "",
      }); // Reset form
    } catch (error) {
      toast.error(`Transaction failed: ${error.response.data.message}`);
    }
  };

  const handleMarketSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/stocks/trade-with-market`,
        {
          username: formData.username,
          stockName: formData.stockName,
          quantity: formData.quantity,
          action: formData.action,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setMessage({ text: response.data.message, type: "success" });
      setTradeDetails(response.data.transaction);
      setIsTransaction(false);
      setFormData({
        sellerId: "",
        buyerId: "",
        stockNumber: "",
        unitsToTrade: "",
        tradePrice: "",
        brokerHouseName: "",
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

  const handleClosePopup = () => {
    setTradeDetails(null);
  };

  const handleRevert = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/stocks/revert-transaction`,
        { transactionID: tradeDetails.transactionID },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success(`Transaction reverted: ${response.data.message}`);
      setTradeDetails(null);
    } catch (error) {
      toast.error(
        `Failed to revert transaction: ${error.response.data.message}`
      );
    }
  };

  return (
    <div className={styles.container}>
      <ToastContainer />
      {tradeDetails && (
        <TradePopup
          tradeDetails={tradeDetails}
          onClose={handleClosePopup}
          onRevert={isTransaction ? handleRevert : null}
          isTransaction={isTransaction}
        />
      )}
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

          <div className={styles.formGroup}>
            <label htmlFor="brokerHouseName">BROKER HOUSE:</label>
            <select
              id="brokerHouseName"
              name="brokerHouseName"
              value={formData.brokerHouseName}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select a broker house
              </option>
              {brokerHouses.map((brokerHouse) => (
                <option key={brokerHouse._id} value={brokerHouse.name}>
                  {brokerHouse.name}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className={styles.submitBtn}>
            Submit Transaction
          </button>
        </form>
      </div>

      <div className={styles.formContainer}>
        <h1 className={styles.title}>Trade with Market</h1>
        {message.text && (
          <div className={`${styles.message} ${styles[message.type]}`}>
            {message.text}
          </div>
        )}
        <form onSubmit={handleMarketSubmit} className={styles.form}>
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
              ref={quantityInputRef}
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
    </div>
  );
};

export default Transaction;
