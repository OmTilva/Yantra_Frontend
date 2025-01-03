import React, { useState } from 'react';
import styles from './AccountSearch.module.css';

const AccountSearch = () => {
  const [accountId, setAccountId] = useState('');
  const [accountDetails, setAccountDetails] = useState(null);

  const handleSearch = () => {
    if (!accountId.trim()) return;
    
    // Mock data for demonstration - replace with actual API call
    setAccountDetails({
      accountId: accountId,
      balance: 425799,
      stocks: [{number: 'DUMMY123', units: 50, valuePerUnit: 100, totalValue: 5000}]
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>SEARCH ACCOUNT</div>
        
        <div className={styles.searchBox}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>ACCOUNT ID:</label>
            <input
              type="text"
              value={accountId}
              onChange={(e) => setAccountId(e.target.value)}
              onKeyPress={handleKeyPress}
              className={styles.input}
            />
          </div>
          
          <button
            onClick={handleSearch}
            className={styles.searchButton}
          >
            Search
          </button>

          {accountDetails && (
            <div className={styles.results}>
              <div className={styles.accountInfo}>
                <div>Account Details</div>
                <div>ACCOUNT ID: {accountDetails.accountId}</div>
                <div>BALANCE: {accountDetails.balance}</div>
                <div>STOCKS:</div>
              </div>
              
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Stock Number</th>
                    <th>Units</th>
                    <th>Value per Unit</th>
                    <th>Total Value</th>
                  </tr>
                </thead>
                <tbody>
                  {accountDetails.stocks.map((stock, index) => (
                    <tr key={index}>
                      <td>{stock.number}</td>
                      <td>{stock.units}</td>
                      <td>{stock.valuePerUnit}</td>
                      <td>{stock.totalValue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountSearch;