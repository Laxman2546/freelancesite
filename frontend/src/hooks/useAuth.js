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
        {
          withCredentials: true,
        }
      );
      if (response.data && response.data.success) {
        setUser({
          ...response.data.fetchUser,
          profile: response.data.profile,
        });
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      console.error("Auth check failed:", err);
      setError(err);

      if (err.response) {
        switch (err.response.status) {
          case 401:
            setUser(null);
            navigate("/login", { replace: true });
            break;
          case 403:
            setUser(null);
            navigate("/", { replace: true });
            break;
          case 500:
            console.error("Server error:", err.response.data);
            break;
          default:
            console.error("Unexpected error:", err);
        }
      } else if (err.request) {
        // Handle network errors
        console.error("Network error:", err.request);
      } else {
        console.error("Error:", err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URI}/logout`,
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setUser(null);
      navigate("/login", { replace: true });
    }
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
