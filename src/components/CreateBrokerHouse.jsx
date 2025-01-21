// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import styles from "../styles/CreateBrokerHouse.module.css";

// const CreateBrokerHouse = () => {
//   const [name, setName] = useState("");
//   const [brokerage, setBrokerage] = useState("");
//   const [brokerHouses, setBrokerHouses] = useState([]);
//   const [selectedBrokerHouse, setSelectedBrokerHouse] = useState("");
//   const [currentBrokerage, setCurrentBrokerage] = useState("");
//   const [newBrokerage, setNewBrokerage] = useState("");

//   useEffect(() => {
//     const fetchBrokerHouses = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get(
//           `${import.meta.env.VITE_BASE_URL}/brokerhouse/get-all-brokerhouses`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setBrokerHouses(response.data);
//       } catch (error) {
//         console.error(
//           "Error fetching broker houses:",
//           error.response || error.message
//         );
//       }
//     };

//     fetchBrokerHouses();
//   }, []);

//   const handleCreateSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.post(
//         `${import.meta.env.VITE_BASE_URL}/brokerhouse/create-brokerhouse`,
//         {
//           name,
//           brokerage,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       toast.success("BrokerHouse created successfully");
//       setName("");
//       setBrokerage("");
//     } catch (error) {
//       console.error(
//         "Error creating BrokerHouse:",
//         error.response || error.message
//       );
//       toast.error("Error creating BrokerHouse");
//     }
//   };

//   const handleUpdateSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.put(
//         `${import.meta.env.VITE_BASE_URL}/brokerhouse/update-brokerage`,
//         {
//           brokerHouseName: selectedBrokerHouse,
//           newBrokerage,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       toast.success("Brokerage rate updated successfully");
//       setSelectedBrokerHouse("");
//       setCurrentBrokerage("");
//       setNewBrokerage("");
//     } catch (error) {
//       console.error(
//         "Error updating brokerage:",
//         error.response || error.message
//       );
//       toast.error("Error updating brokerage");
//     }
//   };

//   const handleBrokerHouseChange = (e) => {
//     const brokerHouseName = e.target.value;
//     setSelectedBrokerHouse(brokerHouseName);
//     const brokerHouse = brokerHouses.find((bh) => bh.name === brokerHouseName);
//     setCurrentBrokerage(brokerHouse ? brokerHouse.brokerage : "");
//   };

//   return (
//     <div className={styles.container}>
//       <h2>Create BrokerHouse</h2>
//       <form onSubmit={handleCreateSubmit}>
//         <div className={styles.formGroup}>
//           <label className={styles.label}>Name:</label>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className={styles.input}
//             required
//           />
//         </div>
//         <div className={styles.formGroup}>
//           <label className={styles.label}>Brokerage:</label>
//           <input
//             type="number"
//             step="0.01"
//             value={brokerage}
//             onChange={(e) => setBrokerage(e.target.value)}
//             className={styles.input}
//             required
//           />
//         </div>
//         <button type="submit" className={styles.button}>
//           Create
//         </button>
//       </form>

//       <h2>Update Brokerage</h2>
//       <form onSubmit={handleUpdateSubmit}>
//         <div className={styles.formGroup}>
//           <label className={styles.label}>Select BrokerHouse:</label>
//           <select
//             value={selectedBrokerHouse}
//             onChange={handleBrokerHouseChange}
//             className={styles.input}
//             required
//           >
//             <option value="">Select a BrokerHouse</option>
//             {brokerHouses.map((brokerHouse) => (
//               <option key={brokerHouse._id} value={brokerHouse.name}>
//                 {brokerHouse.name}
//               </option>
//             ))}
//           </select>
//         </div>
//         {currentBrokerage && (
//           <div className={styles.formGroup}>
//             <label className={styles.label}>Current Brokerage:</label>
//             <input
//               type="number"
//               step="0.01"
//               value={currentBrokerage}
//               className={styles.input}
//               readOnly
//             />
//           </div>
//         )}
//         <div className={styles.formGroup}>
//           <label className={styles.label}>New Brokerage:</label>
//           <input
//             type="number"
//             step="0.01"
//             value={newBrokerage}
//             onChange={(e) => setNewBrokerage(e.target.value)}
//             className={styles.input}
//             required
//           />
//         </div>
//         <button type="submit" className={styles.button}>
//           Update
//         </button>
//       </form>

//       <ToastContainer />
//     </div>
//   );
// };

// export default CreateBrokerHouse;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../styles/CreateBrokerHouse.module.css";

const CreateBrokerHouse = () => {
  const [name, setName] = useState("");
  const [brokerage, setBrokerage] = useState("");
  const [brokerHouses, setBrokerHouses] = useState([]);
  const [selectedBrokerHouse, setSelectedBrokerHouse] = useState("");
  const [currentBrokerage, setCurrentBrokerage] = useState("");
  const [newBrokerage, setNewBrokerage] = useState("");

  useEffect(() => {
    const fetchBrokerHouses = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/brokerhouse/get-all-brokerhouses`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBrokerHouses(response.data);
      } catch (error) {
        console.error(
          "Error fetching broker houses:",
          error.response || error.message
        );
      }
    };

    fetchBrokerHouses();
  }, []);

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/brokerhouse/create-brokerhouse`,
        {
          name,
          brokerage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("BrokerHouse created successfully");
      setName("");
      setBrokerage("");
    } catch (error) {
      console.error(
        "Error creating BrokerHouse:",
        error.response || error.message
      );
      toast.error("Error creating BrokerHouse");
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/brokerhouse/update-brokerage`,
        {
          brokerHouseName: selectedBrokerHouse,
          newBrokerage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Brokerage rate updated successfully");
      setSelectedBrokerHouse("");
      setCurrentBrokerage("");
      setNewBrokerage("");
    } catch (error) {
      console.error(
        "Error updating brokerage:",
        error.response || error.message
      );
      toast.error("Error updating brokerage");
    }
  };

  const handleBrokerHouseChange = (e) => {
    const brokerHouseName = e.target.value;
    setSelectedBrokerHouse(brokerHouseName);
    const brokerHouse = brokerHouses.find((bh) => bh.name === brokerHouseName);
    setCurrentBrokerage(brokerHouse ? brokerHouse.brokerage : "");
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.h2}>BrokerHouse Management</h2>
      <div className={styles.formsContainer}>
        <form onSubmit={handleCreateSubmit} className={styles.form}>
          <h2>Create BrokerHouse</h2>
          <div className={styles.formGroup}>
            <label className={styles.label}>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Brokerage:</label>
            <input
              type="number"
              step="0.01"
              value={brokerage}
              onChange={(e) => setBrokerage(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <button type="submit" className={styles.button}>
            Create
          </button>
        </form>

        <form onSubmit={handleUpdateSubmit} className={styles.form}>
          <h2>Update Brokerage</h2>
          <div className={styles.formGroup}>
            <label className={styles.label}>Select BrokerHouse:</label>
            <select
              value={selectedBrokerHouse}
              onChange={handleBrokerHouseChange}
              className={styles.input}
              required
            >
              <option value="">Select a BrokerHouse</option>
              {brokerHouses.map((brokerHouse) => (
                <option key={brokerHouse._id} value={brokerHouse.name}>
                  {brokerHouse.name}
                </option>
              ))}
            </select>
          </div>
          {currentBrokerage && (
            <div className={styles.formGroup}>
              <label className={styles.label}>Current Brokerage:</label>
              <input
                type="number"
                step="0.01"
                value={currentBrokerage}
                className={styles.input}
                readOnly
              />
            </div>
          )}
          <div className={styles.formGroup}>
            <label className={styles.label}>New Brokerage:</label>
            <input
              type="number"
              step="0.01"
              value={newBrokerage}
              onChange={(e) => setNewBrokerage(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <button type="submit" className={styles.button}>
            Update
          </button>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default CreateBrokerHouse;
