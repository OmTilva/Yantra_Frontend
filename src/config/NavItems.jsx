export const navItems = {
  user: [{ path: "/liveboard", label: "Live Stocks" }],
  jobber: [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/liveboard", label: "Live Stocks" },
    { path: "/leaderboard", label: "Leaderboard" },
  ],
  banker: [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/create-user", label: "Create User" },
    { path: "/allot-multiple-stocks", label: "Allot Stocks" },
    { path: "/apply-ipo", label: "Apply IPO" },
    { path: "/transaction", label: "Trade" },
    { path: "/market-trade", label: "Market Trade" },
    {
      label: "Logs",
      children: [
        { path: "/search-account", label: "Search Account" },
        { path: "/search-transaction", label: "Search Transaction" },
        { path: "/search-ipo", label: "Search IPO" },
      ],
    },
  ],
  admin: [
    { path: "/admin-create-user", label: "Create User" },
    { path: "/assign-role", label: "Assign Role" },
    { path: "/create-brokerhouse", label: "BrokerHouse" },
    { path: "/listStocks", label: "List Stock" },
    { path: "/allot-multiple-stocks", label: "Portfolio Building" },
    { path: "/liveboard", label: "Live Stocks" },
    { path: "/apply-ipo", label: "Apply IPO" },
    { path: "/allot-ipo", label: "Allot IPO" },
    { path: "/manage-ipo", label: "Manage IPO" },
    { path: "/transaction", label: "Trade" },
    { path: "/market-trade", label: "Market Trade" },
    {
      label: "Logs",
      children: [
        { path: "/search-account", label: "Search Account" },
        { path: "/search-transaction", label: "Search Transaction" },
        { path: "/search-ipo", label: "Search IPO" },
      ],
    },
    { path: "/leaderboard", label: "Leaderboard" },
    { path: "/updater", label: "Market Updater" },
  ],
};
