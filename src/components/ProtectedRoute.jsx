import { Navigate } from "react-router-dom";
import { validateToken, validateRole, clearAuthData } from "../SecurityUtils";

const rolePermissions = {
  user: ["liveboard"],
  jobber: ["liveboard", "dashboard", "leaderboard"],
  banker: [
    "dashboard",
    "create-user",
    "allot-multiple-stocks",
    "apply-ipo",
    "transaction",
    "market-trade",
    "search-transaction",
    "search-ipo",
    "search-account",
  ],
  admin: [
    "dashboard",
    "allot-multiple-stocks",
    "create-user",
    "assign-role",
    "listStocks",
    "liveboard",
    "apply-ipo",
    "allot-ipo",
    "manage-ipo",
    "transaction",
    "market-trade",
    "search-account",
    "search-transaction",
    "search-ipo",
    "updater",
    "leaderboard",
  ],
};

const ProtectedRoute = ({ children, userRole }) => {
  const path = window.location.pathname.substring(1);
  const storedToken = localStorage.getItem("token");
  const storedRole = localStorage.getItem("userRole");

  // Only redirect to login if there's no token or role
  if (!storedToken || !storedRole) {
    return <Navigate to="/login" />;
  }

  // Verify the stored role matches the provided role
  if (storedRole !== userRole) {
    return <Navigate to="/login" />;
  }

  const allowedPaths = rolePermissions[userRole] || [];

  if (!allowedPaths.includes(path)) {
    const defaultRoute =
      userRole === "admin"
        ? "/listStocks"
        : userRole === "jobber"
        ? "/liveboard"
        : userRole === "banker"
        ? "/dashboard"
        : "/liveboard";
    return <Navigate to={defaultRoute} />;
  }

  return children;
};

export default ProtectedRoute;
