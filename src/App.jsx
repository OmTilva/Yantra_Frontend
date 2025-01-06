import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LiveStocks from "./components/LiveStocks";
import Ipo from "./components/Ipo";
import AccountSearch from "./components/AccountSearch";
import IpoLogs from "./components/IpoLogs";
import TransactionLogs from "./components/TransactionLogs";

function App() {
  const router = createBrowserRouter([
    {
      path: "/dashboard",
      element: (
        <>
          <Navbar /> <Dashboard />
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
          <Navbar />{" "}
        </>
      ),
    },
    {
      path: "/leaderboard",
      element: (
        <>
          {" "}
          <Navbar />{" "}
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
