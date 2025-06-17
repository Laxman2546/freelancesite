import React from "react";
import Login from "./pages/Login.jsx";
import { Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile.jsx";
import Home from "./pages/Home.jsx";
import Userhome from "./pages/Userhome.jsx";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import AccountSettings from "./pages/AccountSettings.jsx";
import PostGig from "./pages/PostGig.jsx";
import Orders from "./pages/Orders.jsx";
import Profileupdate from "./pages/profileUpdate.jsx";
gsap.registerPlugin(useGSAP);

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/profileupdate" element={<Profileupdate />} />
      <Route path="/account" element={<AccountSettings />} />
      <Route path="/userhome" element={<Userhome />} />
      <Route path="/postgig" element={<PostGig />} />
      <Route path="/orders" element={<Orders />} />
    </Routes>
  );
};

export default App;
