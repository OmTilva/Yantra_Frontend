import React, { useState } from "react";
import styles from "../styles/Updater.module.css";

function Updater() {
  const [formData, setFormData] = useState({
    selectedStock: "",
    updateType: "",
    updateDirection: "",
    singleValue: "",
    marketPercentage: "",
    marketDirection: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ text: "", type: "" });

  const stocks = Array.from({ length: 25 }, (_, i) => `Stock ${i + 1}`);

  const validateSingleUpdate = () => {
    const newErrors = {};
    if (!formData.selectedStock) {
      newErrors.selectedStock = "Please select a stock";
    }
    if (!formData.updateType) {
      newErrors.updateType = "Please select update type";
    }
    if (!formData.updateDirection) {
      newErrors.updateDirection = "Please select direction";
    }
    if (!formData.singleValue || isNaN(formData.singleValue)) {
      newErrors.singleValue = "Please enter a valid number";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateMarketUpdate = () => {
    const newErrors = {};
    if (!formData.marketPercentage || isNaN(formData.marketPercentage)) {
      newErrors.marketPercentage = "Please enter a valid percentage";
    }
    if (!formData.marketDirection) {
      newErrors.marketDirection = "Please select direction";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSingleUpdate = (e) => {
    e.preventDefault();
    if (validateSingleUpdate()) {
      setMessage({ text: "Stock updated successfully!", type: "success" });
      setFormData((prev) => ({
        ...prev,
        selectedStock: "",
        updateType: "",
        updateDirection: "",
        singleValue: "",
      }));
    } else {
      setMessage({
        text: "Please fill all required fields correctly",
        type: "error",
      });
    }
  };

  const handleMarketUpdate = (e) => {
    e.preventDefault();
    if (validateMarketUpdate()) {
      setMessage({ text: "Market updated successfully!", type: "success" });
      setFormData((prev) => ({
        ...prev,
        marketPercentage: "",
        marketDirection: "",
      }));
    } else {
      setMessage({
        text: "Please fill all required fields correctly",
        type: "error",
      });
    }
  };

  return (
    <div className={styles.body}>
      <div className={styles.updaterContainer}>
        <h1 className={styles.mainTitle}>STOCK UPDATER</h1>

        {message.text && (
          <div className={`${styles.message} ${styles[message.type]}`}>
            {message.text}
          </div>
        )}

        <div className={styles.sectionsContainer}>
          <section className={styles.singleStock}>
            <h2>Update Single Stock</h2>
            <form onSubmit={handleSingleUpdate}>
              <div className={styles.formGroup}>
                <select
                  name="selectedStock"
                  value={formData.selectedStock}
                  onChange={handleChange}
                  className={errors.selectedStock ? styles.error : ""}
                >
                  <option value="" disabled>
                    Select a stock
                  </option>
                  {stocks.map((stock) => (
                    <option key={stock} value={stock}>
                      {stock}
                    </option>
                  ))}
                </select>
                {errors.selectedStock && (
                  <span className={styles.errorText}>
                    {errors.selectedStock}
                  </span>
                )}

                <select
                  name="updateType"
                  value={formData.updateType}
                  onChange={handleChange}
                  className={errors.updateType ? styles.error : ""}
                >
                  <option value="" disabled>
                    Select Update Option
                  </option>
                  <option value="value">By Value</option>
                  <option value="percentage">By Percentage</option>
                </select>
                {errors.updateType && (
                  <span className={styles.errorText}>{errors.updateType}</span>
                )}

                <select
                  name="updateDirection"
                  value={formData.updateDirection}
                  onChange={handleChange}
                  className={errors.updateDirection ? styles.error : ""}
                >
                  <option value="" disabled>
                    Select to Increase or Decrease
                  </option>
                  <option value="increase">Increase</option>
                  <option value="decrease">Decrease</option>
                </select>
                {errors.updateDirection && (
                  <span className={styles.errorText}>
                    {errors.updateDirection}
                  </span>
                )}

                <input
                  type="number"
                  name="singleValue"
                  value={formData.singleValue}
                  onChange={handleChange}
                  placeholder="Enter Value"
                  className={errors.singleValue ? styles.error : ""}
                />
                {errors.singleValue && (
                  <span className={styles.errorText}>{errors.singleValue}</span>
                )}

                <button type="submit">Update Stock</button>
              </div>
            </form>
          </section>

          <section className={styles.wholeMarket}>
            <h2>Update Whole Market</h2>
            <form onSubmit={handleMarketUpdate}>
              <div className={styles.formGroup}>
                <input
                  type="number"
                  name="marketPercentage"
                  value={formData.marketPercentage}
                  onChange={handleChange}
                  placeholder="Enter Percentage"
                  className={errors.marketPercentage ? styles.error : ""}
                />
                {errors.marketPercentage && (
                  <span className={styles.errorText}>
                    {errors.marketPercentage}
                  </span>
                )}

                <select
                  name="marketDirection"
                  value={formData.marketDirection}
                  onChange={handleChange}
                  className={errors.marketDirection ? styles.error : ""}
                >
                  <option value="" disabled>
                    Select to Increase or Decrease
                  </option>
                  <option value="increase">Increase</option>
                  <option value="decrease">Decrease</option>
                </select>
                {errors.marketDirection && (
                  <span className={styles.errorText}>
                    {errors.marketDirection}
                  </span>
                )}

                <button type="submit">Update Market</button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Updater;
