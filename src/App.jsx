import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import { useState } from "react";
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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (username, password) => {
    // Perform login logic here
    // For now, we'll just set the user as logged in
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/login" />,
    },
    {
      path: "/login",
      element: <Login onLogin={handleLogin} />,
    },
    {
      path: "/dashboard",
      element: (
        <>
          <Navbar onLogout={handleLogout} /> <Dashboard />
        </>
      ),
    },
    {
      path: "/liveboard",
      element: (
        <>
          <Navbar /> <LiveStocks />
        </>
      ),
    },
    {
      path: "/ipo",
      element: (
        <>
          <Navbar /> <Ipo />
        </>
      ),
    },
    {
      path: "/transaction",
      element: (
        <>
          <Navbar />
          <Transaction />
        </>
      ),
    },
    {
      path: "/search-account",
      element: (
        <>
          {" "}
          <Navbar /> <AccountSearch />
        </>
      ),
    },
    {
      path: "/search-transaction",
      element: (
        <>
          {" "}
          <Navbar /> <TransactionLogs />
        </>
      ),
    },
    {
      path: "/search-ipo",
      element: (
        <>
          {" "}
          <Navbar /> <IpoLogs />
        </>
      ),
    },
    {
      path: "/updater",
      element: (
        <>
          {" "}
          <Navbar /> <Updater />
        </>
      ),
    },
    {
      path: "/leaderboard",
      element: (
        <>
          {" "}
          <Navbar /> <Leaderboard />
        </>
      ),
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
