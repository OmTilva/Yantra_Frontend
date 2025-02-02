import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../styles/AllotIpo.module.css";

const AllotIPO = () => {
  const [ipos, setIpos] = useState([]);
  const [selectedIpo, setSelectedIpo] = useState("");
  const [applicants, setApplicants] = useState([]);
  const [selectedApplicant, setSelectedApplicant] = useState("");

  useEffect(() => {
    fetchCompletedIPOs();
  }, []);

  const fetchCompletedIPOs = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/stocks/allIpo`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      const currentDate = new Date();
      const completedIPOs = response.data.filter(
        (ipo) =>
          new Date(ipo.ipoDetails.subscriptionStartDate) <= currentDate &&
          new Date(ipo.ipoDetails.subscriptionEndDate) <= currentDate
      );
      setIpos(completedIPOs);
    } catch (error) {
      toast.error("Failed to fetch IPOs");
    }
  };

  const fetchApplicants = async (stockName) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/stocks/applicantsForIpo/${stockName}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setApplicants(response.data);
    } catch (error) {
      toast.error("Failed to fetch applicants");
    }
  };

  const handleAllot = async () => {
    if (!selectedApplicant) {
      toast.error("Please select an applicant and enter valid lots");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/stocks/allot-ipo`,
        {
          stockName: selectedIpo,
          username: selectedApplicant,
          lots: 1,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      toast.success(response.data.message);
      fetchApplicants(selectedIpo); // Refresh applicants list
      setSelectedApplicant(""); // Clear selection
      setLots(0); // Reset lots
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to allot IPO");
    }
  };

  return (
    <div className={styles.container}>
      <h2>Allot IPO</h2>
      <div className={styles.formGroup}>
        <label htmlFor="ipoSelect">Select IPO:</label>
        <select
          id="ipoSelect"
          value={selectedIpo}
          onChange={(e) => {
            setSelectedIpo(e.target.value);
            fetchApplicants(e.target.value);
          }}
        >
          <option value="">Select IPO</option>
          {ipos.map((ipo) => (
            <option key={ipo._id} value={ipo.stockName}>
              {ipo.stockName}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="applicantSelect">Select Applicant:</label>
        <select
          id="applicantSelect"
          value={selectedApplicant}
          onChange={(e) => setSelectedApplicant(e.target.value)}
        >
          <option value="">Select Applicant</option>
          {applicants.map((app) => (
            <option key={app._id} value={app.username}>
              {app.username} - Lots: {app.lots} - status: {app.status}
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
          value={1}
          disabled
        />
      </div>
      <button onClick={handleAllot}>Allot</button>
    </div>
  );
};

export default AllotIPO;
