import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../styles/AddStocks.module.css";

const AddStocks = () => {
  const [formData, setFormData] = useState({
    stockName: "",
    currentPrice: "",
    availableUnits: "",
    totalUnits: "",
    status: "LISTED",
    ipoDetails: {
      issuePrice: "",
      minLotSize: "",
      listingDate: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("ipoDetails.")) {
      const ipoField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        ipoDetails: {
          ...prev.ipoDetails,
          [ipoField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      // Set availableUnits equal to totalUnits initially
      const submitData = {
        ...formData,
        availableUnits: formData.totalUnits,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/stocks/add`,
        submitData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Stock added successfully!");
      setFormData({
        stockName: "",
        currentPrice: "",
        availableUnits: "",
        totalUnits: "",
        status: "LISTED",
        ipoDetails: {
          issuePrice: "",
          minLotSize: "",
          listingDate: "",
        },
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add stock");
    }
  };

  return (
    <>
      <h2 className={styles.h2}>Add New Stock</h2>
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Stock Name:</label>
            <input
              type="text"
              name="stockName"
              value={formData.stockName}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Current Price:</label>
            <input
              type="number"
              name="currentPrice"
              value={formData.currentPrice}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Total Units:</label>
            <input
              type="number"
              name="totalUnits"
              value={formData.totalUnits}
              onChange={handleChange}
              min="0"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Status:</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="LISTED">Listed</option>
              <option value="IPO">IPO</option>
              <option value="UPCOMING">Upcoming</option>
            </select>
          </div>

          {(formData.status === "IPO" || formData.status === "UPCOMING") && (
            <>
              <div className={styles.formGroup}>
                <label>Issue Price:</label>
                <input
                  type="number"
                  name="ipoDetails.issuePrice"
                  value={formData.ipoDetails.issuePrice}
                  onChange={handleChange}
                  min="0"
                />
              </div>

              <div className={styles.formGroup}>
                <label>Minimum Lot Size:</label>
                <input
                  type="number"
                  name="ipoDetails.minLotSize"
                  value={formData.ipoDetails.minLotSize}
                  onChange={handleChange}
                  min="1"
                />
              </div>

              <div className={styles.formGroup}>
                <label>Listing Date:</label>
                <input
                  type="date"
                  name="ipoDetails.listingDate"
                  value={formData.ipoDetails.listingDate}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          <button type="submit" className={styles.submitButton}>
            Add Stock
          </button>
        </form>
      </div>
    </>
  );
};

export default AddStocks;
