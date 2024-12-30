import React, { useState } from "react";
import styles from "../styles/livestocks.module.css";

const LiveStocks = () => {
  const [first, setFirst] = useState("0.00");
  const [second, setSecond] = useState("+1.03");
  const [third, setThird] = useState("-5.38");

  const getColor = (percentage) => {
    if (percentage > 0) {
      return styles.green;
    } else if (percentage < 0) {
      return styles.red;
    } else {
      return "";
    }
  };

  const stockArrow = (percentage) => {
    if (percentage > 0) {
      return "▲";
    } else if (percentage < 0) {
      return "▼";
    } else {
      return "";
    }
  };

  return (
    <>
      <div className={styles["main-container"]}>
        <h1>Live Stock Prices</h1>
        <div className={styles["stocks-container"]}>
          <div className={styles.liveStock}>
            <span className={styles["current-stock-name"]}>1</span>
            <span className={styles["stock-price-container"]}>
              <p className={getColor(first)}>₹69.96</p>
              <p className={getColor(first)}>{stockArrow(first)}</p>
            </span>
            <p className={styles["last-stock-price"]}>Last: ₹65.29</p>
            <p className={`${getColor(first)} ${styles.percentage}`}>
              {first}%
            </p>
          </div>

          <div className={styles.liveStock}>
            <span className={styles["current-stock-name"]}>1</span>
            <span className={styles["stock-price-container"]}>
              <p className={getColor(second)}>₹69.96</p>
              <p className={getColor(second)}>{stockArrow(second)}</p>
            </span>
            <p className={styles["last-stock-price"]}>Last: ₹65.29</p>
            <p className={`${getColor(second)} ${styles.percentage}`}>
              {second}%
            </p>
          </div>

          <div className={styles.liveStock}>
            <span className={styles["current-stock-name"]}>1</span>
            <span className={styles["stock-price-container"]}>
              <p className={getColor(third)}>₹69.96</p>
              <p className={getColor(third)}>{stockArrow(third)}</p>
            </span>
            <p className={styles["last-stock-price"]}>Last: ₹65.29</p>
            <p className={`${getColor(third)} ${styles.percentage}`}>
              {third}%
            </p>
          </div>

          <div className={styles.liveStock}>
            <span className={styles["current-stock-name"]}>1</span>
            <span className={styles["stock-price-container"]}>
              <p className={getColor(first)}>₹69.96</p>
              <p className={getColor(first)}>{stockArrow(first)}</p>
            </span>
            <p className={styles["last-stock-price"]}>Last: ₹65.29</p>
            <p className={`${getColor(first)} ${styles.percentage}`}>
              {first}%
            </p>
          </div>

          <div className={styles.liveStock}>
            <span className={styles["current-stock-name"]}>1</span>
            <span className={styles["stock-price-container"]}>
              <p className={getColor(first)}>₹69.96</p>
              <p className={getColor(first)}>{stockArrow(first)}</p>
            </span>
            <p className={styles["last-stock-price"]}>Last: ₹65.29</p>
            <p className={`${getColor(second)} ${styles.percentage}`}>
              {second}%
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LiveStocks;
