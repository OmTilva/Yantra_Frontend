import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../styles/ManageIpo.module.css";

const ManageIPO = () => {
  const [ipos, setIpos] = useState([]);
  const [selectedIpo, setSelectedIpo] = useState("");

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
      setIpos(response.data);
    } catch (error) {
      toast.error("Failed to fetch IPOs");
    }
  };

  const handleAction = async (action) => {
    try {
      let url = "";
      let data = {};
      switch (action) {
        case "start":
          url = `${import.meta.env.VITE_BASE_URL}/stocks/start-ipo`;
          data = { ipoName: selectedIpo };
          break;
        case "endApplications":
          url = `${import.meta.env.VITE_BASE_URL}/stocks/end-ipo-applications`;
          data = { stockName: selectedIpo };
          break;
        case "closeAllotment":
          url = `${import.meta.env.VITE_BASE_URL}/stocks/close-ipo-allotment`;
          data = { stockName: selectedIpo };
          break;
        default:
          return;
      }
      const response = await axios.post(url, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      toast.success(response.data.message);
      fetchIPOs(); // Refresh IPOs list
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to perform action");
    }
  };

  return (
    <div className={styles.container}>
      <h2>Manage IPO</h2>
      <select
        value={selectedIpo}
        onChange={(e) => setSelectedIpo(e.target.value)}
      >
        <option value="">Select IPO</option>
        {ipos.map((ipo) => (
          <option key={ipo._id} value={ipo.stockName}>
            {ipo.stockName} - Status: {ipo.status}
          </option>
        ))}
      </select>
      <button onClick={() => handleAction("start")}>Start IPO</button>
      <button onClick={() => handleAction("endApplications")}>
        End IPO Applications
      </button>
      <button onClick={() => handleAction("closeAllotment")}>
        Close IPO Allotment
      </button>
    </div>
  );
};

export default ManageIPO;
