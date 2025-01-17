export const navItems = {
  user: [{ path: "/liveboard", label: "Live Stocks" }],
  jobber: [
    { path: "/liveboard", label: "Live Stocks" },
    { path: "/leaderboard", label: "Leaderboard" },
  ],
  banker: [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/create-user", label: "Create User" },
    { path: "/allot-multiple-stocks", label: "Allot Stocks" },
    { path: "/ipo", label: "Allot IPO" },
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
    { path: "/create-user", label: "Create User" },
    { path: "/allot-multiple-stocks", label: "Allot Stocks" },
    { path: "/listStocks", label: "List Stock" },
    { path: "/liveboard", label: "Live Stocks" },
    { path: "/ipo", label: "Allot IPO" },
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
