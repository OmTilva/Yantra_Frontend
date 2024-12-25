import React, { useState } from "react";
import "../styles/livestocks.css";

const LiveStocks = () => {
  const [first, setFirst] = useState("0.00");
  const [second, setSecond] = useState("+1.03");
  const [third, setThird] = useState("-5.38");

  const getColor = (percentage) => {
    if (percentage > 0) {
      return "green";
    } else if (percentage < 0) {
      return "red";
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
      <div className="main-container">
        <h1>Live Stock Prices</h1>
        <div className="stocks-container">
          <div className="stock">
            <span className="current-stock-name">1</span>
            <span className="stock-price-container">
              <p className={getColor(first)}>₹69.96</p>
              <p className={getColor(first)}>{stockArrow(first)}</p>
            </span>
            <p className="last-stock-price">Last: ₹65.29</p>
            <p className={`${getColor(first)} percentage`}>{first}%</p>
          </div>
          {/* ig you can delete these next 4 "stock" divs.*/}
          <div className="stock">
            <span className="current-stock-name">1</span>
            <span className="stock-price-container">
              <p className={getColor(second)}>₹69.96</p>
              <p className={getColor(second)}>{stockArrow(second)}</p>
            </span>
            <p className="last-stock-price">Last: ₹65.29</p>
            <p className={`${getColor(second)} percentage`}>{second}%</p>
          </div>

          <div className="stock">
            <span className="current-stock-name">1</span>
            <span className="stock-price-container">
              <p className={getColor(third)}>₹69.96</p>
              <p className={getColor(third)}>{stockArrow(third)}</p>
            </span>
            <p className="last-stock-price">Last: ₹65.29</p>
            <p className={`${getColor(third)} percentage`}>{third}%</p>
          </div>

          <div className="stock">
            <span className="current-stock-name">1</span>
            <span className="stock-price-container">
              <p className={getColor(first)}>₹69.96</p>
              <p className={getColor(first)}>{stockArrow(first)}</p>
            </span>
            <p className="last-stock-price">Last: ₹65.29</p>
            <p className={`${getColor(first)} percentage`}>{first}%</p>
          </div>

          <div className="stock">
            <span className="current-stock-name">1</span>
            <span className="stock-price-container">
              <p className={getColor(first)}>₹69.96</p>
              <p className={getColor(first)}>{stockArrow(first)}</p>
            </span>
            <p className="last-stock-price">Last: ₹65.29</p>
            <p className={`${getColor(second)} percentage`}>{second}%</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LiveStocks;
