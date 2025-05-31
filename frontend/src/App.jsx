import React from "react";
import Login from "./pages/Login.jsx";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register.jsx";
import Profile from "./pages/Profile.jsx";
import Home from "./pages/Home.jsx";
import Userhome from "./pages/Userhome.jsx";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP);

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/userhome" element={<Userhome />} />
    </Routes>
  );
};

export default App;
