import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/dashboard.module.css";

const Dashboard = () => {
  const [role, setRole] = useState("");
  const [brokerHouse, setBrokerHouse] = useState(null);
  const [currentBrokerage, setCurrentBrokerage] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const userResponse = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/users/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const user = userResponse.data;
        setRole(user.role);

        if (user.role === "jobber" && user.brokerHouse) {
          const brokerHouseResponse = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/brokerhouse/name/${
              user.brokerHouse.name
            }`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setBrokerHouse(brokerHouseResponse.data);
          setCurrentBrokerage(brokerHouseResponse.data.brokerage);
        }
      } catch (error) {
        console.error(
          "Error fetching user details or broker house:",
          error.response?.data || error.message
        );
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <div className={styles.container}>
      {role === "jobber" && brokerHouse ? (
        <div>
          <h2 className={styles.h2}>Welcome, Jobber</h2>
          <p className={styles.p}>BrokerHouse: {brokerHouse.name}</p>
          <p className={styles.p}>Current Brokerage: {currentBrokerage}%</p>
        </div>
      ) : (
        <h2>Hello, Welcome</h2>
      )}
    </div>
  );
};

export default Dashboard;
