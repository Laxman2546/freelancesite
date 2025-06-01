// src/config/tokenErrorHandler.js
export const tokenError = (statusCode, navigate) => {
  if (statusCode === 401) {
    // Clear any existing user data from localStorage/sessionStorage if you use them
    // localStorage.removeItem('userData');

    // Redirect to login
    navigate("/login", { replace: true });
  } else if (statusCode === 403) {
    // Forbidden - user might not have permission
    navigate("/", { replace: true });
  }
};

// Enhanced version with more comprehensive error handling
export const handleAuthError = (error, navigate) => {
  const statusCode = error.response?.status;

  console.log("Authentication error:", {
    status: statusCode,
    message: error.message,
    url: error.config?.url,
  });

  switch (statusCode) {
    case 401:
      // Unauthorized - token expired or invalid
      console.log("Token expired or invalid, redirecting to login");
      navigate("/login", { replace: true });
      break;
    case 403:
      // Forbidden - user doesn't have permission
      console.log("Access forbidden, redirecting to home");
      navigate("/", { replace: true });
      break;
    case 404:
      // API endpoint not found
      console.log("API endpoint not found");
      break;
    default:
      // Other errors
      console.log("Other error occurred:", statusCode);
      break;
  }
};
