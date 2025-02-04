import React from "react";
import styles from "../styles/TradePopup.module.css";

const TradePopup = ({ tradeDetails, onClose, onRevert, isTransaction }) => {
  const handleRevertClick = () => {
    if (window.confirm("Are you sure you want to revert this transaction?")) {
      onRevert();
    }
  };

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popup}>
        <h2>Trade Details</h2>
        <p>
          <strong>Seller:</strong> {tradeDetails.sellerName}
        </p>
        <p>
          <strong>Buyer:</strong> {tradeDetails.buyerName}
        </p>
        <p>
          <strong>Stock:</strong> {tradeDetails.stockName}
        </p>
        <p>
          <strong>Quantity:</strong> {tradeDetails.quantity}
        </p>
        <p>
          <strong>Trade Price:</strong> {tradeDetails.tradePrice}
        </p>
        <p>
          <strong>Total Price:</strong> {tradeDetails.totalPrice}
        </p>
        {isTransaction && (
          <button onClick={handleRevertClick} className={styles.revertButton}>
            Revert Transaction
          </button>
        )}
        <button onClick={onClose} className={styles.closeButton}>
          Close
        </button>
      </div>
    </div>
  );
};

export default TradePopup;
