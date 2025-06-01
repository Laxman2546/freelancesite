// src/hooks/useAuth.js
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const checkAuth = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URI}/profile`,
        { withCredentials: true }
      );

      if (response.data && response.data.fetchUser) {
        setUser(response.data.fetchUser);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      console.error("Auth check failed:", err);
      setError(err);

      const statusCode = err.response?.status;
      if (statusCode === 401) {
        setUser(null);
        navigate("/login", { replace: true });
      } else if (statusCode === 403) {
        setUser(null);
        navigate("/", { replace: true });
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    // Optional: Call logout API endpoint
    // axios.post(`${process.env.REACT_APP_BACKEND_URI}/logout`, {}, { withCredentials: true });
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return {
    user,
    loading,
    error,
    checkAuth,
    logout,
    isAuthenticated: !!user,
  };
};
