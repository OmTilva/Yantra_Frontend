import "../styles/navbar.css";
import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [logsDropdown, setLogsDropdown] = useState(false);

  const toggleLogsDropdown = () => {
    setLogsDropdown(!logsDropdown);
  };
  return (
    <>
      <nav>
        <div>
          <h1>Dalal Street</h1>
        </div>
        <div className="navLinks">
          <NavLink to="/dashboard" activeClassName="active">Dashboard</NavLink>
          <NavLink to="/liveboard" activeClassName="active">Live Stocks</NavLink>
          <NavLink to="/ipo" activeClassName="active">Allot IPO</NavLink>
          <NavLink to="/transaction" activeClassName="active">Transaction</NavLink>
          <div className="dropdown">
            <button onClick={toggleLogsDropdown} className="dropbtn">
              Logs
            </button>
            {logsDropdown && (
              <div className="dropdown-content">
                <NavLink to="/search-transaction" activeClassName="active">Transaction Logs</NavLink>
                <NavLink to="/search-ipo" activeClassName="active">IPO Logs</NavLink>
              </div>
            )}
          </div>
          <NavLink to="/updater" activeClassName="active">Updates</NavLink>
          <NavLink to="/search-account" activeClassName="active">Search</NavLink>
          <NavLink to="/leaderboard" activeClassName="active">Leaderboard</NavLink>
          <NavLink to="/login" id="logout" activeClassName="active">
            Logout
          </NavLink>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
