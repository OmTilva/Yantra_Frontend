import React, { useState } from "react";
import styles from "./App.module.css";

const logs = [
  {
    ipoId: "12345",
    adminUsername: "admin123",
    buyerId: "buyer001",
    balanceBefore: "₹50,000",
    balanceAfter: "₹40,000",
    actionDate: "2024-12-27",
    stocksBought: [
      { stockNumber: "ABC001", units: 10, pricePerUnit: "₹1,000", totalCost: "₹10,000" },
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
      { stockNumber: "XYZ002", units: 5, pricePerUnit: "₹1,000", totalCost: "₹5,000" },
    ],
  },
];

const App = () => {
  const [searchAdmin, setSearchAdmin] = useState("");
  const [searchBuyer, setSearchBuyer] = useState("");
  const [filteredLogs, setFilteredLogs] = useState(logs);

  const handleSearch = () => {
    const result = logs.filter(
      (log) =>
        (searchAdmin === "" || log.adminUsername.includes(searchAdmin)) &&
        (searchBuyer === "" || log.buyerId.includes(searchBuyer))
    );
    setFilteredLogs(result);
  };

  return (
    <div className={styles.ipoLogContainer}>
      <h1 className={styles.header1}>SEARCH IPO ALLOTMENT LOG</h1>
      <div className={styles.formContainer}>
        <label className={styles.label}>
          Admin Username:
          <input
            type="text"
            placeholder="Enter Admin Username"
            value={searchAdmin}
            onChange={(e) => setSearchAdmin(e.target.value)}
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          Buyer ID:
          <input
            type="text"
            placeholder="Enter Buyer ID"
            value={searchBuyer}
            onChange={(e) => setSearchBuyer(e.target.value)}
            className={styles.input}
          />
        </label>
        <button onClick={handleSearch} className={styles.button}>
          SEARCH
        </button>
      </div>
      <h2 className={styles.header2}>LOGS</h2>
      <div className={styles.logsContainer}>
        {filteredLogs.length > 0 ? (
          filteredLogs.map((log, index) => (
            <div className={styles.logEntry} key={index}>
              <p>IPO ID: {log.ipoId}</p>
              <p>Admin Username: {log.adminUsername}</p>
              <p>Buyer ID: {log.buyerId}</p>
              <p>Balance Before: {log.balanceBefore}</p>
              <p>Balance After: {log.balanceAfter}</p>
              <p>Action Date: {log.actionDate}</p>
              <p>Stocks Bought:</p>
              <ul>
                {log.stocksBought.map((stock, idx) => (
                  <li key={idx}>
                    Stock Number: {stock.stockNumber}, Units: {stock.units}, Price per Unit:{" "}
                    {stock.pricePerUnit}, Total Cost: {stock.totalCost}
                  </li>
                ))}
              </ul>
              <hr className={styles.hr} />
            </div>
          ))
        ) : (
          <p>No logs found for the entered criteria.</p>
        )}
      </div>
    </div>
  );
};

export default App;
