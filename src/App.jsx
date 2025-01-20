import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import { useState, useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  useNavigate,
} from "react-router-dom";
import LiveStocks from "./components/LiveStocks";
import Ipo from "./components/Ipo";
import AccountSearch from "./components/AccountSearch";
import IpoLogs from "./components/IpoLogs";
import TransactionLogs from "./components/TransactionLogs";
import Transaction from "./components/Transaction";
import Leaderboard from "./components/Leaderboard";
import Updater from "./components/Updater";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import AddStocks from "./components/AddStocks";
import axios from "axios";
import { validateToken, validateRole, clearAuthData } from "./SecurityUtils";
import Loader from "./assets/loader";
import CreateUser from "./components/CreateUser";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AllotMultipleStocks from "./components/AllotMultipleStocks";
import TransactionMarket from "./components/TransactionMarket";
import AssignRole from "./components/AssignRole";
import ApplyIPO from "./components/ApplyIpo";
import AllotIPO from "./components/AllotIpo";
import ManageIPO from "./components/ManageIpo";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize state from localStorage on mount
    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("userRole");

    if (token && validateToken(token) && validateRole(storedRole)) {
      setIsLoggedIn(true);
      setUserRole(storedRole);
    }

    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("userRole");

    if (!token || !validateToken(token) || !validateRole(storedRole)) {
      clearAuthData();
      setIsLoggedIn(false);
      setUserRole(null);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/auth/role`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.role !== storedRole) {
        clearAuthData();
        setIsLoggedIn(false);
        setUserRole(null);
      } else {
        setIsLoggedIn(true);
        setUserRole(storedRole);
      }
    } catch (error) {
      // Only logout on auth errors
      if (error.response?.status === 401 || error.response?.status === 403) {
        clearAuthData();
        setIsLoggedIn(false);
        setUserRole(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (role) => {
    if (validateRole(role)) {
      setIsLoggedIn(true);
      setUserRole(role);
    }
  };

  const handleLogout = () => {
    clearAuthData();
    setIsLoggedIn(false);
    setUserRole(null);
  };

  // Important: Return the loader properly
  if (loading) {
    return <Loader />;
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/login" />,
    },
    {
      path: "/login",
      element: isLoggedIn ? (
        <Navigate
          to={
            userRole === "admin"
              ? "/listStocks"
              : userRole === "jobber"
              ? "/liveboard"
              : userRole === "banker"
              ? "/dashboard"
              : "/liveboard"
          }
        />
      ) : (
        <Login onLogin={handleLogin} />
      ),
    },
    {
      path: "/dashboard",
      element: (
        <>
          <ProtectedRoute userRole={userRole}>
            <Navbar userRole={userRole} onLogout={handleLogout} /> <Dashboard />
          </ProtectedRoute>
        </>
      ),
    },
    {
      path: "/allot-multiple-stocks",
      element: (
        <>
          <ProtectedRoute userRole={userRole}>
            <Navbar userRole={userRole} onLogout={handleLogout} />{" "}
            <AllotMultipleStocks />
          </ProtectedRoute>
        </>
      ),
    },
    {
      path: "/create-user",
      element: (
        <>
          <ProtectedRoute userRole={userRole}>
            <Navbar userRole={userRole} onLogout={handleLogout} />{" "}
            <CreateUser />
          </ProtectedRoute>
        </>
      ),
    },
    {
      path: "/assign-role",
      element: (
        <>
          <ProtectedRoute userRole={userRole}>
            <Navbar userRole={userRole} onLogout={handleLogout} />{" "}
            <AssignRole />
          </ProtectedRoute>
        </>
      ),
    },
    {
      path: "/listStocks",
      element: (
        <>
          <ProtectedRoute userRole={userRole}>
            <Navbar userRole={userRole} onLogout={handleLogout} /> <AddStocks />
          </ProtectedRoute>
        </>
      ),
    },
    {
      path: "/liveboard",
      element: (
        <>
          <ProtectedRoute userRole={userRole}>
            <Navbar userRole={userRole} onLogout={handleLogout} />{" "}
            <LiveStocks />
          </ProtectedRoute>
        </>
      ),
    },
    // {
    //   path: "/ipo",
    //   element: (
    //     <>
    //       <ProtectedRoute userRole={userRole}>
    //         <Navbar userRole={userRole} onLogout={handleLogout} /> <Ipo />
    //       </ProtectedRoute>
    //     </>
    //   ),
    // },
    {
      path: "/apply-ipo",
      element: (
        <>
          <ProtectedRoute userRole={userRole}>
            <Navbar userRole={userRole} onLogout={handleLogout} /> <ApplyIPO />
          </ProtectedRoute>
        </>
      ),
    },
    {
      path: "/allot-ipo",
      element: (
        <>
          <ProtectedRoute userRole={userRole}>
            <Navbar userRole={userRole} onLogout={handleLogout} /> <AllotIPO />
          </ProtectedRoute>
        </>
      ),
    },
    {
      path: "/manage-ipo",
      element: (
        <>
          <ProtectedRoute userRole={userRole}>
            <Navbar userRole={userRole} onLogout={handleLogout} /> <ManageIPO />
          </ProtectedRoute>
        </>
      ),
    },
    {
      path: "/transaction",
      element: (
        <>
          <ProtectedRoute userRole={userRole}>
            <Navbar userRole={userRole} onLogout={handleLogout} />
            <Transaction />
          </ProtectedRoute>
        </>
      ),
    },
    {
      path: "/market-trade",
      element: (
        <>
          <ProtectedRoute userRole={userRole}>
            <Navbar userRole={userRole} onLogout={handleLogout} />
            <TransactionMarket />
          </ProtectedRoute>
        </>
      ),
    },
    {
      path: "/search-account",
      element: (
        <>
          <ProtectedRoute userRole={userRole}>
            <Navbar userRole={userRole} onLogout={handleLogout} />{" "}
            <AccountSearch />
          </ProtectedRoute>
        </>
      ),
    },
    {
      path: "/search-transaction",
      element: (
        <>
          <ProtectedRoute userRole={userRole}>
            <Navbar userRole={userRole} onLogout={handleLogout} />{" "}
            <TransactionLogs />
          </ProtectedRoute>
        </>
      ),
    },
    {
      path: "/search-ipo",
      element: (
        <>
          <ProtectedRoute userRole={userRole}>
            <Navbar userRole={userRole} onLogout={handleLogout} /> <IpoLogs />
          </ProtectedRoute>
        </>
      ),
    },
    {
      path: "/updater",
      element: (
        <>
          <ProtectedRoute userRole={userRole}>
            <Navbar userRole={userRole} onLogout={handleLogout} /> <Updater />
          </ProtectedRoute>
        </>
      ),
    },
    {
      path: "/leaderboard",
      element: (
        <>
          <ProtectedRoute userRole={userRole}>
            <Navbar userRole={userRole} onLogout={handleLogout} />{" "}
            <Leaderboard />
          </ProtectedRoute>
        </>
      ),
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        theme="dark"
      />
    </>
  );
}

export default App;
