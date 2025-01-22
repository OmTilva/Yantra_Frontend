import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../styles/AllotMultipleStocks.module.css";

const AllotMultipleStocks = () => {
  const [users, setUsers] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [allotments, setAllotments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalSum, setTotalSum] = useState(0);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedUserBalance, setSelectedUserBalance] = useState(0);

  useEffect(() => {
    fetchUsers();
    fetchStocks();
  }, []);

  useEffect(() => {
    calculateTotalSum();
  }, [allotments]);

  useEffect(() => {
    if (selectedUserId) {
      const selectedUser = users.find((user) => user._id === selectedUserId);
      setSelectedUserBalance(selectedUser ? selectedUser.balance : 0);
    }
  }, [selectedUserId, users]);

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
      toast.error("Failed to fetch users");
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
      toast.error("Failed to fetch stocks");
    }
  };

  const fetchStockPrice = async (stockId, index) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/stocks/${stockId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const stockPrice = parseFloat(response.data.currentPrice).toFixed(2);
      updateAllotment(index, "price", stockPrice);
    } catch (err) {
      toast.error("Failed to fetch stock price");
    }
  };

  const addAllotment = () => {
    setAllotments([
      ...allotments,
      { userId: selectedUserId, stockId: "", quantity: "", price: "" },
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

  const handleStockChange = (index, stockId) => {
    updateAllotment(index, "stockId", stockId);
    fetchStockPrice(stockId, index);
  };

  const calculateTotalSum = () => {
    const total = allotments.reduce((sum, allotment) => {
      const quantity = parseFloat(allotment.quantity) || 0;
      const price = parseFloat(allotment.price) || 0;
      return sum + quantity * price;
    }, 0);
    setTotalSum(total);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/stocks/allot-multiple-stocks`,
        { allotments },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Stocks allotted successfully");
      setAllotments([]);
      setSelectedUserId("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to allot stocks");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className={styles.h2}>Allot Multiple Stocks</h2>
      <div className={styles.container}>
        <div className={styles.userSelection}>
          <label htmlFor="userId">Select User:</label>
          <select
            id="userId"
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            required
          >
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.username} - Balance: ₹{user.balance}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={addAllotment}
          className={styles.addButton}
          disabled={!selectedUserId}
        >
          Add New Allotment
        </button>

        <form onSubmit={handleSubmit} className={styles.form}>
          {allotments.map((allotment, index) => (
            <div key={index} className={styles.allotmentRow}>
              <select
                value={allotment.stockId}
                onChange={(e) => handleStockChange(index, e.target.value)}
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
                step="0.01"
                readOnly
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
            <>
              <div className={styles.totalSum}>
                Total Sum: ₹{totalSum.toFixed(2)}
              </div>
              <button
                type="submit"
                className={styles.submitButton}
                disabled={loading || totalSum > selectedUserBalance}
              >
                {loading ? "Allotting..." : "Allot Stocks"}
              </button>
            </>
          )}
        </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        theme="dark"
      />
    </>
  );
};

export default AllotMultipleStocks;
