import React, { useState } from "react";
import styles from "../styles/ipo.module.css";

const Ipo = () => {
  const stocks = [
    { id: 1, name: "Stock 1", price: 117 },
    { id: 2, name: "Stock 2", price: 120 },
    { id: 4, name: "Stock 2", price: 120 },
    { id: 5, name: "Stock 2", price: 120 },
    { id: 6, name: "Stock 2", price: 120 },
    // Add more stocks as needed
  ];
  const [showInput, setShowInput] = useState(Array(stocks.length).fill(false));

  const handleCheckboxChange = (index) => (e) => {
    const newShowInputs = [...showInput];
    newShowInputs[index] = e.target.checked;
    setShowInput(newShowInputs);
  };

  const handleInput = (e) => {
    const buyerId = e.target.value;
    if (buyerId < 0) {
      e.target.value = "";
      alert("Please enter a valid Buyer ID");
    }
  };

  return (
    <>
      <div className={styles["main-container"]}>
        <h1>IPO Allotment (Multiple Stocks)</h1>
        <div className={styles["allotment-parent"]}>
          <div className={styles["buyerId-div"]}>
            <span className={styles.label}>Buyer ID:</span>
            <input
              type="number"
              placeholder="Enter Buyer ID"
              className={styles["buyer-input"]}
              onInput={handleInput}
            />
          </div>
          <div className={styles["stock-selection-div"]}>
            <span className={styles.label}>Select Stocks:</span>
            <div className={styles.stocks}>
              {stocks.map((stock, index) => (
                <div className={styles.stock} key={stock.id}>
                  <span>{`${stock.name} (Price: ${stock.price})`}</span>
                  {showInput[index] && (
                    <input
                      type="number"
                      className={styles.quantity}
                      placeholder="Enter Quantity"
                      onInput={handleInput}
                      min="0"
                    />
                  )}
                  <input
                    type="checkbox"
                    onChange={handleCheckboxChange(index)}
                  />
                </div>
              ))}
            </div>
            <button type="submit" className={styles["allot-stocks"]}>
              Allot Stocks
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Ipo;
