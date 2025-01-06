import React, { useState } from 'react';
import styles from './Transaction.module.css';

const Transaction = () => {
  const [formData, setFormData] = useState({
    sellerId: '',
    buyerId: '',
    stockNumber: '',
    unitsToTrade: '',
    tradePrice: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Transaction submitted:', formData);
    // Add your submission logic here
  };

  return (
    <div className={styles.container}>
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