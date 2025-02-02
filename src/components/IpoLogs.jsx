// import React, { useState } from "react";
// import axios from "axios";
// import styles from "../styles/IpoLogs.module.css";

// const IpoLogs = () => {
//   const [searchAdmin, setSearchAdmin] = useState("");
//   const [searchBuyer, setSearchBuyer] = useState("");
//   const [filteredLogs, setFilteredLogs] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const handleSearch = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get(
//         `${import.meta.env.VITE_BASE_URL}/logs/ipoLogs`,
//         {
//           params: {
//             adminName: searchAdmin,
//             buyerName: searchBuyer,
//           },
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setFilteredLogs(response.data);
//     } catch (err) {
//       console.error("Failed to fetch IPO logs:", err);
//       setFilteredLogs([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className={styles.body}>
//       <div className={styles.container}>
//         <h1 className={styles.heading}>Search IPO Allotment Log</h1>

//         <div className={styles.searchForm}>
//           <div className={styles.inputGroup}>
//             <label className={styles.label}>
//               Admin Username
//               <input
//                 type="text"
//                 value={searchAdmin}
//                 onChange={(e) => setSearchAdmin(e.target.value)}
//                 className={styles.input}
//                 placeholder="Enter admin username"
//               />
//             </label>

//             <label className={styles.label}>
//               Buyer Username
//               <input
//                 type="text"
//                 value={searchBuyer}
//                 onChange={(e) => setSearchBuyer(e.target.value)}
//                 className={styles.input}
//                 placeholder="Enter buyer username"
//               />
//             </label>
//           </div>

//           <button
//             onClick={handleSearch}
//             className={styles.button}
//             disabled={loading}
//           >
//             {loading ? "Searching..." : "Search"}
//           </button>
//         </div>

//         <section className={styles.logsSection}>
//           <h2 className={styles.subheading}>Logs</h2>

//           <div className={styles.logsContainer}>
//             {filteredLogs.length > 0 ? (
//               filteredLogs.map((log, index) => (
//                 <div className={styles.logEntry} key={log.transactionID}>
//                   <div className={styles.logHeader}>
//                     <span>Transaction ID: {log.transactionID}</span>
//                     <span>
//                       Date: {new Date(log.transactionDate).toLocaleDateString()}
//                     </span>
//                   </div>

//                   <div className={styles.logDetails}>
//                     <div className={styles.userInfo}>
//                       <p>Admin: {log.adminID.username}</p>
//                       <p>Buyer: {log.userID.username}</p>
//                     </div>

//                     {/* <div className={styles.balanceInfo}>
//                       <p>Initial Balance: {log.balanceBefore}</p>
//                       <p>Final Balance: {log.balanceAfter}</p>
//                     </div> */}

//                     <div className={styles.stocksInfo}>
//                       <h3>Purchased Stocks</h3>
//                       <div className={styles.stockEntry}>
//                         <p>Stock: {log.stockID.stockName}</p>
//                         <p>Units: {log.allottedUnits}</p>
//                         <p>Price/Unit: ₹{log.pricePerUnit}</p>
//                         <p>Total: ₹{log.totalPrice}</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className={styles.noResults}>No matching logs found.</p>
//             )}
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default IpoLogs;
import React, { useState } from "react";
import axios from "axios";
import styles from "../styles/IpoLogs.module.css";

const IpoLogs = () => {
  const [searchAdmin, setSearchAdmin] = useState("");
  const [searchBuyer, setSearchBuyer] = useState("");
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const params = {};
      if (searchAdmin) params.adminName = searchAdmin;
      if (searchBuyer) params.buyerName = searchBuyer;

      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/logs/ipoLogs`,
        {
          params,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setFilteredLogs(response.data);
    } catch (err) {
      console.error("Failed to fetch IPO logs:", err);
      setFilteredLogs([]);
    } finally {
      setLoading(false);
    }
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
              Buyer Username
              <input
                type="text"
                value={searchBuyer}
                onChange={(e) => setSearchBuyer(e.target.value)}
                className={styles.input}
                placeholder="Enter buyer username"
              />
            </label>
          </div>

          <button
            onClick={handleSearch}
            className={styles.button}
            disabled={loading}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        <section className={styles.logsSection}>
          <h2 className={styles.subheading}>Logs</h2>

          <div className={styles.logsContainer}>
            {filteredLogs.length > 0 ? (
              filteredLogs.map((log, index) => (
                <div className={styles.logEntry} key={log.transactionID}>
                  <div className={styles.logHeader}>
                    <span>Transaction ID: {log.transactionID}</span>
                    <span>
                      Date: {new Date(log.transactionDate).toLocaleDateString()}
                    </span>
                  </div>

                  <div className={styles.logDetails}>
                    <div className={styles.userInfo}>
                      <p>Admin: {log.adminID.username}</p>
                      <p>Buyer: {log.userID.username}</p>
                    </div>

                    <div className={styles.stocksInfo}>
                      <h3>Purchased Stocks</h3>
                      <div className={styles.stockEntry}>
                        <p>Stock: {log.stockID.stockName}</p>
                        <p>Units: {log.allottedUnits}</p>
                        <p>Price/Unit: ₹{log.pricePerUnit}</p>
                        <p>Total: ₹{log.totalPrice}</p>
                      </div>
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
