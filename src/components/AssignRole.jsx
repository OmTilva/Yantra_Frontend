// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import styles from "../styles/AssignRole.module.css";

// const AssignRole = () => {
//   const [users, setUsers] = useState([]);
//   const [brokerHouses, setBrokerHouses] = useState([]);
//   const [selectedUser, setSelectedUser] = useState("");
//   const [role, setRole] = useState("");
//   const [selectedJobber, setSelectedJobber] = useState("");
//   const [selectedBrokerHouse, setSelectedBrokerHouse] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get(
//           `${import.meta.env.VITE_BASE_URL}/users/all`,
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//           }
//         );
//         setUsers(response.data);
//       } catch (error) {
//         toast.error("Failed to fetch users");
//       }
//     };

//     const fetchBrokerHouses = async () => {
//       try {
//         const response = await axios.get(
//           `${import.meta.env.VITE_BASE_URL}/brokerhouse/get-all-brokerhouses`,
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//           }
//         );
//         setBrokerHouses(response.data);
//       } catch (error) {
//         toast.error("Failed to fetch broker houses");
//       }
//     };

//     fetchUsers();
//     fetchBrokerHouses();
//   }, []);

//   const handleRoleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       await axios.put(
//         `${import.meta.env.VITE_BASE_URL}/users/update-role`,
//         { userId: selectedUser, role },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       toast.success("User role updated successfully");
//       setSelectedUser("");
//       setRole("");
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to update role");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleBrokerHouseSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       await axios.post(
//         `${import.meta.env.VITE_BASE_URL}/users/assign-brokerhouse`,
//         { username: selectedJobber, brokerHouseName: selectedBrokerHouse },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       toast.success("BrokerHouse assigned to jobber successfully");
//       setSelectedJobber("");
//       setSelectedBrokerHouse("");
//     } catch (error) {
//       toast.error(
//         error.response?.data?.message || "Failed to assign broker house"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <h2 className={styles.title}>Assign Role</h2>
//       <form onSubmit={handleRoleSubmit} className={styles.form}>
//         <div className={styles.formGroup}>
//           <label htmlFor="user">Select User:</label>
//           <select
//             id="user"
//             value={selectedUser}
//             onChange={(e) => setSelectedUser(e.target.value)}
//             required
//           >
//             <option value="" disabled>
//               Select a user
//             </option>
//             {users.map((user) => (
//               <option key={user._id} value={user._id}>
//                 {user.username}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className={styles.formGroup}>
//           <label htmlFor="role">Select Role:</label>
//           <select
//             id="role"
//             value={role}
//             onChange={(e) => setRole(e.target.value)}
//             required
//           >
//             <option value="" disabled>
//               Select a role
//             </option>
//             <option value="user">User</option>
//             <option value="jobber">Jobber</option>
//             <option value="banker">Banker</option>
//             <option value="admin">Admin</option>
//           </select>
//         </div>
//         <button
//           type="submit"
//           className={styles.submitButton}
//           disabled={loading}
//         >
//           {loading ? "Updating..." : "Update Role"}
//         </button>
//       </form>

//       <h2 className={styles.title}>Assign BrokerHouse to Jobber</h2>
//       <form onSubmit={handleBrokerHouseSubmit} className={styles.form}>
//         <div className={styles.formGroup}>
//           <label htmlFor="jobber">Select Jobber:</label>
//           <select
//             id="jobber"
//             value={selectedJobber}
//             onChange={(e) => setSelectedJobber(e.target.value)}
//             required
//           >
//             <option value="" disabled>
//               Select a jobber
//             </option>
//             {users
//               .filter((user) => user.role === "jobber")
//               .map((user) => (
//                 <option key={user._id} value={user.username}>
//                   {user.username}
//                 </option>
//               ))}
//           </select>
//         </div>
//         <div className={styles.formGroup}>
//           <label htmlFor="brokerHouse">Select BrokerHouse:</label>
//           <select
//             id="brokerHouse"
//             value={selectedBrokerHouse}
//             onChange={(e) => setSelectedBrokerHouse(e.target.value)}
//             required
//           >
//             <option value="" disabled>
//               Select a broker house
//             </option>
//             {brokerHouses.map((brokerHouse) => (
//               <option key={brokerHouse._id} value={brokerHouse.name}>
//                 {brokerHouse.name}
//               </option>
//             ))}
//           </select>
//         </div>
//         <button
//           type="submit"
//           className={styles.submitButton}
//           disabled={loading}
//         >
//           {loading ? "Assigning..." : "Assign BrokerHouse"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AssignRole;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import styles from "../styles/AssignRole.module.css";

const AssignRole = () => {
  const [users, setUsers] = useState([]);
  const [brokerHouses, setBrokerHouses] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [role, setRole] = useState("");
  const [brokerHouseName, setBrokerHouseName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/users/all`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUsers(response.data);
      } catch (error) {
        toast.error("Failed to fetch users");
      }
    };

    const fetchBrokerHouses = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/brokerhouse/get-all-brokerhouses`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setBrokerHouses(response.data);
      } catch (error) {
        toast.error("Failed to fetch broker houses");
      }
    };

    fetchUsers();
    fetchBrokerHouses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/users/update-role`,
        {
          userId: selectedUser,
          role,
          brokerHouseName: role === "jobber" ? brokerHouseName : null,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("User role updated successfully");
      setSelectedUser("");
      setRole("");
      setBrokerHouseName("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update role");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Assign Role</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="user">Select User:</label>
          <select
            id="user"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            required
          >
            <option value="" disabled>
              Select a user
            </option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.username}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="role">Select Role:</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="" disabled>
              Select a role
            </option>
            <option value="user">User</option>
            <option value="jobber">Jobber</option>
            <option value="banker">Banker</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        {role === "jobber" && (
          <div className={styles.formGroup}>
            <label htmlFor="brokerHouse">Select BrokerHouse:</label>
            <select
              id="brokerHouse"
              value={brokerHouseName}
              onChange={(e) => setBrokerHouseName(e.target.value)}
              required
            >
              <option value="" disabled>
                Select a broker house
              </option>
              {brokerHouses.map((brokerHouse) => (
                <option key={brokerHouse._id} value={brokerHouse.name}>
                  {brokerHouse.name}
                </option>
              ))}
            </select>
          </div>
        )}
        <button
          type="submit"
          className={styles.submitButton}
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Role"}
        </button>
      </form>
    </div>
  );
};

export default AssignRole;
