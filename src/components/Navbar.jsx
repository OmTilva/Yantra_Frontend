import styles from "../styles/navbar.module.css";
import React from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { navItems } from "../config/NavItems";
import axios from "axios";

const Navbar = ({ userRole, onLogout }) => {
  const navigate = useNavigate();
  const [logsDropdown, setLogsDropdown] = useState(false);
  const allowedNavItems = navItems[userRole] || [];

  const toggleLogsDropdown = () => {
    setLogsDropdown(!logsDropdown);
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.get(`${import.meta.env.VITE_BASE_URL}/auth/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
      onLogout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);

      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
      onLogout();
      navigate("/login");
    }
  };

  return (
    <nav className={styles.nav}>
      <div>
        <h1>Dalal Street 2.0 {userRole}</h1>
      </div>
      <div className={styles.navLinks}>
        {allowedNavItems.map((item) => {
          if (item.children) {
            return (
              <div key={item.label} className={styles.dropdown}>
                <button className={styles.dropbtn}>{item.label}</button>
                <div className={styles["dropdown-content"]}>
                  {item.children.map((child) => (
                    <Link key={child.path} to={child.path}>
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            );
          }
          return (
            <Link
              key={item.path}
              to={item.path}
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              {item.label}
            </Link>
          );
        })}
        <button onClick={handleLogout} id={styles.logout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
