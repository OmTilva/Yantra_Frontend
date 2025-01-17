import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/AllotMultipleStocks.module.css";

const AllotMultipleStocks = () => {
  const [users, setUsers] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [allotments, setAllotments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess("");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [success]);

  useEffect(() => {
    fetchUsers();
    fetchStocks();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/users/all`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Filter users with role="user"
      const filteredUsers = response.data.filter(
        (user) => user.role === "user"
      );
      setUsers(filteredUsers);
    } catch (err) {
      setError("Failed to fetch users");
    }
  };

  const fetchStocks = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/stocks/allStocks`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setStocks(response.data);
    } catch (err) {
      setError("Failed to fetch stocks");
    }
  };

  const addAllotment = () => {
    setAllotments([
      ...allotments,
      { userId: "", stockId: "", quantity: "", price: "" },
    ]);
  };

  const removeAllotment = (index) => {
    setAllotments(allotments.filter((_, i) => i !== index));
  };

  const updateAllotment = (index, field, value) => {
    const newAllotments = [...allotments];
    newAllotments[index][field] = value;
    setAllotments(newAllotments);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/stocks/allot-multiple-stocks`,
        { allotments },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSuccess("Stocks allotted successfully");
      setAllotments([]);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to allot stocks");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className={styles.h2}>Allot Multiple Stocks</h2>
      <div className={styles.container}>
        {error && <div className={styles.error}>{error}</div>}
        {success && <div className={styles.success}>{success}</div>}

        <button onClick={addAllotment} className={styles.addButton}>
          Add New Allotment
        </button>

        <form onSubmit={handleSubmit} className={styles.form}>
          {allotments.map((allotment, index) => (
            <div key={index} className={styles.allotmentRow}>
              <select
                value={allotment.userId}
                onChange={(e) =>
                  updateAllotment(index, "userId", e.target.value)
                }
                required
              >
                <option value="">Select User</option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.username} - Balance: ₹{user.balance}
                  </option>
                ))}
              </select>

              <select
                value={allotment.stockId}
                onChange={(e) =>
                  updateAllotment(index, "stockId", e.target.value)
                }
                required
              >
                <option value="">Select Stock</option>
                {stocks.map((stock) => (
                  <option key={stock._id} value={stock._id}>
                    {stock.stockName} - Available: {stock.availableUnits}
                  </option>
                ))}
              </select>

              <input
                type="number"
                placeholder="Quantity"
                value={allotment.quantity}
                onChange={(e) =>
                  updateAllotment(index, "quantity", e.target.value)
                }
                required
                min="1"
              />

              <input
                type="number"
                placeholder="Price per unit"
                value={allotment.price}
                onChange={(e) =>
                  updateAllotment(index, "price", e.target.value)
                }
                required
                min="0"
              />

              <button
                type="button"
                onClick={() => removeAllotment(index)}
                className={styles.removeButton}
              >
                Remove
              </button>
            </div>
          ))}

          {allotments.length > 0 && (
            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading}
            >
              {loading ? "Allotting..." : "Allot Stocks"}
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default AllotMultipleStocks;
