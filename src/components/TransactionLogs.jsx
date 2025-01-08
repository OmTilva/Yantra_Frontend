import React, { useState } from "react";
import styles from "../styles/TransactionLogs.module.css";

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

const TransactionLogs = () => {
  const [searchAdmin, setSearchAdmin] = useState("");
  const [searchBuyer, setSearchBuyer] = useState("");
  const [searchSeller, setSearchSeller] = useState("");
  const [filteredLogs, setFilteredLogs] = useState(transactionLogs);

  const handleSearch = () => {
    const filtered = transactionLogs.filter(
      (log) =>
        (searchAdmin === "" ||
          log.adminUsername
            .toLowerCase()
            .includes(searchAdmin.toLowerCase())) &&
        (searchBuyer === "" ||
          log.buyerId.toLowerCase().includes(searchBuyer.toLowerCase())) &&
        (searchSeller === "" ||
          log.sellerId.toLowerCase().includes(searchSeller.toLowerCase()))
    );
    setFilteredLogs(filtered);
  };

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <h1 className={styles.heading}>Search Transaction Log</h1>

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

            <label className={styles.label}>
              Seller ID
              <input
                type="text"
                value={searchSeller}
                onChange={(e) => setSearchSeller(e.target.value)}
                className={styles.input}
                placeholder="Enter seller ID"
              />
            </label>
          </div>

          <button onClick={handleSearch} className={styles.button}>
            Search
          </button>
        </div>

        <div className={styles.tableSection}>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Admin Username</th>
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
                    <td colSpan="6" className={styles.noResults}>
                      No matching records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionLogs;
