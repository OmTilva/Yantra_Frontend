import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../styles/ApplyIpo.module.css";

const ApplyIPO = () => {
  const [ipos, setIpos] = useState([]);
  const [selectedIpo, setSelectedIpo] = useState("");
  const [lots, setLots] = useState(0);
  const [username, setUsername] = useState("");

  useEffect(() => {
    fetchIPOs();
  }, []);

  const fetchIPOs = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/stocks/allIpo`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      const currentDate = new Date();
      const startedIPOs = response.data.filter(
        (ipo) =>
          new Date(ipo.ipoDetails.subscriptionStartDate) <= currentDate &&
          !ipo.ipoDetails.subscriptionEndDate
      );
      setIpos(startedIPOs);
    } catch (error) {
      toast.error("Failed to fetch IPOs");
    }
  };

  const handleApply = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/stocks/apply-ipo`,
        { username, stockId: selectedIpo, lots },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      toast.success(response.data.message);
      setUsername("");
      setSelectedIpo("");
      setLots(0);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to apply for IPO");
    }
  };

  return (
    <div className={styles.container}>
      <h2>Apply for IPO</h2>
      <div className={styles.formGroup}>
        <label htmlFor="usernameInput">Username:</label>
        <input
          id="usernameInput"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="ipoSelect">Select IPO:</label>
        <select
          id="ipoSelect"
          value={selectedIpo}
          onChange={(e) => setSelectedIpo(e.target.value)}
        >
          <option value="">Select IPO</option>
          {ipos.map((ipo) => (
            <option key={ipo._id} value={ipo._id}>
              {ipo.stockName} - Issue Price: {ipo.ipoDetails.issuePrice}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="lotsInput">Number of Lots:</label>
        <input
          id="lotsInput"
          type="number"
          placeholder="Number of Lots"
          value={lots}
          onChange={(e) => setLots(e.target.value)}
          min="1"
        />
      </div>
      <button onClick={handleApply}>Apply</button>
    </div>
  );
};

export default ApplyIPO;
