import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/Leaderboard.module.css";

const Leaderboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/search/leaderboard`,
          { withCredentials: true }
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch leaderboard data");
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.body}>
      <div className={styles.leaderboardContainer}>
        <h1 className={styles.leaderboardTitle}>LEADERBOARD</h1>
        <div className={styles.container}>
          <table className={styles.table}>
            <thead className={styles.tableHeader}>
              <tr>
                <th className={styles.headerCell}>RANK</th>
                <th className={styles.headerCell}>USERNAME</th>
                <th className={styles.headerCell}>TOTAL VALUE</th>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {data.map((item, index) => (
                <tr className={styles.tableRow} key={index}>
                  <td className={styles.tableCell}>{index + 1}</td>
                  <td className={styles.tableCell}>{item.username}</td>
                  <td className={styles.tableCell}>₹
                    {item.totalValue
                      ? item.totalValue.toLocaleString("en-IN", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })
                      : "0.00"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
