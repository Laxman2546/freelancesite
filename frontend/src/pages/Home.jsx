import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };
  return (
    <main>
      <button
        onClick={handleLogin}
        className="bg-black text-white p-3 rounded-2xl"
      >
        Login
      </button>
    </main>
  );
};

export default Home;
