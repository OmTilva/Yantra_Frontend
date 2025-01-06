import React from "react";
import styles from "./Leaderboard.module.css";

const Leaderboard = () => {
  const data = [
    { rank: 1, accountId: "Player1" },
    { rank: 2, accountId: "Player2" },
    { rank: 3, accountId: "Player3" },
    { rank: 4, accountId: "Player4" },
    { rank: 5, accountId: "Player5" },
    { rank: 6, accountId: "Player6" },
    { rank: 7, accountId: "Player7" },
    { rank: 8, accountId: "Player8" },
    { rank: 9, accountId: "Player9" },
    { rank: 10, accountId: "Player10" },
    { rank: 11, accountId: "Player11" },
    { rank: 12, accountId: "Player12" },
    { rank: 13, accountId: "Player13" },
    { rank: 14, accountId: "Player14" },
    { rank: 15, accountId: "Player15" },
    { rank: 16, accountId: "Player16" },
    { rank: 17, accountId: "Player17" },
    { rank: 18, accountId: "Player18" },
    { rank: 19, accountId: "Player19" },
    { rank: 20, accountId: "Player20" },
    { rank: 21, accountId: "Player21" },
    { rank: 22, accountId: "Player22" },
    { rank: 23, accountId: "Player23" },
    { rank: 24, accountId: "Player24" },
    { rank: 25, accountId: "Player25" },
    
  ];

  return (
    <div className={styles.leaderboardContainer}>
      
      <h1 className={styles.leaderboardTitle}>LEADERBOARD</h1>
      <div className={styles.container}>
        <table className={styles.table}>
          <thead className={styles.tableHeader}>
            <tr>
              <th className={styles.headerCell}>RANK</th>
              <th className={styles.headerCell}>ACCOUNT ID</th>
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {data.map((item, index) => (
              <tr className={styles.tableRow} key={index}>
                <td className={styles.tableCell}>{item.rank}</td>
                <td className={styles.tableCell}>{item.accountId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
