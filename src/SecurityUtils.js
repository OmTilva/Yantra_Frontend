// SecurityUtils.js
export const validateToken = (token) => {
  try {
    // Basic structure validation (you can enhance this based on your token format)
    if (!token || typeof token !== "string" || token.length < 10) {
      return false;
    }
    
    return true;
  } catch {
    return false;
  }
};

export const validateRole = (role) => {
  const validRoles = ["admin", "jobber", "banker", "user"];
  return validRoles.includes(role);
};

export const clearAuthData = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userRole");
};
