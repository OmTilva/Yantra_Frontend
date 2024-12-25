import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LiveStocks from "./components/LiveStocks";
import Ipo from "./components/Ipo";

function App() {
  const router = createBrowserRouter([
    {
      path: "/dashboard",
      element: (
        <>
          {" "}
          <Navbar /> <Dashboard />{" "}
        </>
      ),
    },
    {
      path: "/liveboard",
      element: (
        <>
          {" "}
          <Navbar /> <LiveStocks />{" "}
        </>
      ),
    },
    {
      path: "/ipo",
      element: (
        <>
          {" "}
          <Navbar /> <Ipo />{" "}
        </>
      ),
    },
    {
      path: "/transaction",
      element: (
        <>
          {" "}
          <Navbar />{" "}
        </>
      ),
    },
    {
      path: "/search-account",
      element: (
        <>
          {" "}
          <Navbar />{" "}
        </>
      ),
    },
    {
      path: "/search-transaction",
      element: (
        <>
          {" "}
          <Navbar />{" "}
        </>
      ),
    },
    {
      path: "/search-ipo",
      element: (
        <>
          {" "}
          <Navbar />{" "}
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
