import React, { useState } from "react";
import styles from "./App.module.css";

const transactionLogs = [
  {
    adminUsername: "admin123",
    buyerId: "buyer001",
    sellerId: "seller001",
    column2: "Data 2",
    column3: "Data 3",
    column4: "Data 4",
    column5: "Data 5",
    column6: "Data 6",
  },
  {
    adminUsername: "admin456",
    buyerId: "buyer002",
    sellerId: "seller002",
    column2: "Data B",
    column3: "Data C",
    column4: "Data D",
    column5: "Data E",
    column6: "Data F",
  },
];

const App = () => {
  const [searchAdmin, setSearchAdmin] = useState("");
  const [searchBuyer, setSearchBuyer] = useState("");
  const [searchSeller, setSearchSeller] = useState("");
  const [filteredLogs, setFilteredLogs] = useState(transactionLogs);

  const handleSearch = () => {
    const filtered = transactionLogs.filter(
      (log) =>
        (searchAdmin === "" || log.adminUsername.includes(searchAdmin)) &&
        (searchBuyer === "" || log.buyerId.includes(searchBuyer)) &&
        (searchSeller === "" || log.sellerId.includes(searchSeller))
    );
    setFilteredLogs(filtered);
  };

  return (
    <div className={styles.transactionLogContainer}>
      <h1 className={styles.header}>SEARCH TRANSACTION LOG</h1>
      <div className={styles.formContainer}>
        <label className={styles.label}>
          Admin Username:
          <input
            type="text"
            value={searchAdmin}
            onChange={(e) => setSearchAdmin(e.target.value)}
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          Buyer ID:
          <input
            type="text"
            value={searchBuyer}
            onChange={(e) => setSearchBuyer(e.target.value)}
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          Seller ID:
          <input
            type="text"
            value={searchSeller}
            onChange={(e) => setSearchSeller(e.target.value)}
            className={styles.input}
          />
        </label>
        <button className={styles.button} onClick={handleSearch}>
          SEARCH
        </button>
      </div>
      <div className={styles.tableContainer}>
        <table>
          <thead>
            <tr>
              <th>adminUsername</th>
              <th>Column 2</th>
              <th>Column 3</th>
              <th>Column 4</th>
              <th>Column 5</th>
              <th>Column 6</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.length > 0 ? (
              filteredLogs.map((log, index) => (
                <tr key={index}>
                  <td>{log.adminUsername}</td>
                  <td>{log.column2}</td>
                  <td>{log.column3}</td>
                  <td>{log.column4}</td>
                  <td>{log.column5}</td>
                  <td>{log.column6}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No matching records found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
