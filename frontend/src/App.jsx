import React from "react";
import Login from "./pages/Login.jsx";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default App;
