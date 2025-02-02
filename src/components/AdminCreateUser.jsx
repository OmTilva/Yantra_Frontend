import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import styles from "../styles/CreateUser.module.css";

const AdminCreateUser = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    role: "user", // Default role set to user
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") {
      // Allow only lowercase letters and numbers
      const regex = /^[a-z0-9]*$/;
      if (!regex.test(value)) {
        toast.error("Only lowercase letters and numbers are allowed");
        return;
      }
    }
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      toast.success("User created successfully");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Create User</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="role">Role:</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="user">User</option>
            <option value="jobber">Jobber</option>
            <option value="banker">Banker</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create User"}
        </button>
      </form>
    </div>
  );
};

export default AdminCreateUser;
