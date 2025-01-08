import styles from "../styles/navbar.module.css";
import React from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = ({  }) => {
  const navigate = useNavigate();
  const [logsDropdown, setLogsDropdown] = useState(false);

  const toggleLogsDropdown = () => {
    setLogsDropdown(!logsDropdown);
  };
  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <>
      <nav className={styles.nav}>
        <div>
          <h1>Dalal Street</h1>
        </div>
        <div className={styles.navLinks}>
          <NavLink
            to="/dashboard"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/liveboard"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Live Stocks
          </NavLink>
          <NavLink
            to="/ipo"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Allot IPO
          </NavLink>
          <NavLink
            to="/transaction"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Transaction
          </NavLink>
          <div className={styles.dropdown}>
            <button onClick={toggleLogsDropdown} className={styles.dropbtn}>
              Logs
            </button>
            {logsDropdown && (
              <div className={styles["dropdown-content"]}>
                <NavLink
                  to="/search-transaction"
                  className={({ isActive }) => (isActive ? styles.active : "")}
                >
                  Transaction Logs
                </NavLink>
                <NavLink
                  to="/search-ipo"
                  className={({ isActive }) => (isActive ? styles.active : "")}
                >
                  IPO Logs
                </NavLink>
              </div>
            )}
          </div>
          <NavLink
            to="/updater"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Updates
          </NavLink>
          <NavLink
            to="/search-account"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Search
          </NavLink>
          <NavLink
            to="/leaderboard"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Leaderboard
          </NavLink>
          <button
            onClick={handleLogout}
            id={styles.logout}
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Logout
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
