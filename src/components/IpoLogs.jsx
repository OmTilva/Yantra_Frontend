import React, { useState } from "react";
import styles from "../styles/IpoLogs.module.css";

const logs = [
  {
    ipoId: "12345",
    adminUsername: "admin123",
    buyerId: "buyer001", 
    balanceBefore: "₹50,000",
    balanceAfter: "₹40,000",
    actionDate: "2024-12-27",
    stocksBought: [
      {
        stockNumber: "ABC001",
        units: 10,
        pricePerUnit: "₹1,000",
        totalCost: "₹10,000",
      },
    ],
  },
  {
    ipoId: "67890",
    adminUsername: "admin456", 
    buyerId: "buyer002",
    balanceBefore: "₹60,000",
    balanceAfter: "₹55,000",
    actionDate: "2024-12-26",
    stocksBought: [
      {
        stockNumber: "XYZ002",
        units: 5,
        pricePerUnit: "₹1,000",
        totalCost: "₹5,000",
      },
    ],
  },
];

const IpoLogs = () => {
  const [searchAdmin, setSearchAdmin] = useState("");
  const [searchBuyer, setSearchBuyer] = useState("");
  const [filteredLogs, setFilteredLogs] = useState(logs);

  const handleSearch = () => {
    const result = logs.filter(
      (log) =>
        (searchAdmin === "" || log.adminUsername.toLowerCase().includes(searchAdmin.toLowerCase())) &&
        (searchBuyer === "" || log.buyerId.toLowerCase().includes(searchBuyer.toLowerCase()))
    );
    setFilteredLogs(result);
  };

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <h1 className={styles.heading}>Search IPO Allotment Log</h1>
        
        <div className={styles.searchForm}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>
              Admin Username
              <input
                type="text"
                value={searchAdmin}
                onChange={(e) => setSearchAdmin(e.target.value)}
                className={styles.input}
                placeholder="Enter admin username"
              />
            </label>
            
            <label className={styles.label}>
              Buyer ID
              <input
                type="text"
                value={searchBuyer}
                onChange={(e) => setSearchBuyer(e.target.value)}
                className={styles.input}
                placeholder="Enter buyer ID"
              />
            </label>
          </div>
          
          <button onClick={handleSearch} className={styles.button}>
            Search
          </button>
        </div>

        <section className={styles.logsSection}>
          <h2 className={styles.subheading}>Logs</h2>
          
          <div className={styles.logsContainer}>
            {filteredLogs.length > 0 ? (
              filteredLogs.map((log, index) => (
                <div className={styles.logEntry} key={log.ipoId}>
                  <div className={styles.logHeader}>
                    <span>IPO ID: {log.ipoId}</span>
                    <span>Date: {log.actionDate}</span>
                  </div>
                  
                  <div className={styles.logDetails}>
                    <div className={styles.userInfo}>
                      <p>Admin: {log.adminUsername}</p>
                      <p>Buyer: {log.buyerId}</p>
                    </div>
                    
                    <div className={styles.balanceInfo}>
                      <p>Initial Balance: {log.balanceBefore}</p>
                      <p>Final Balance: {log.balanceAfter}</p>
                    </div>
                    
                    <div className={styles.stocksInfo}>
                      <h3>Purchased Stocks</h3>
                      {log.stocksBought.map((stock, idx) => (
                        <div key={idx} className={styles.stockEntry}>
                          <p>Stock: {stock.stockNumber}</p>
                          <p>Units: {stock.units}</p>
                          <p>Price/Unit: {stock.pricePerUnit}</p>
                          <p>Total: {stock.totalCost}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className={styles.noResults}>No matching logs found.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default IpoLogs;