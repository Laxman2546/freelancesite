import React from "react";
import Login from "./pages/Login.jsx";
import { Routes, Route } from "react-router-dom";
import Profile from "./pages/freelancePages/Profile.jsx";
import Home from "./pages/Home.jsx";
import Userhome from "./pages/Userhome.jsx";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import AccountSettings from "./pages/freelancePages/AccountSettings.jsx";
import PostGig from "./pages/freelancePages/PostGig.jsx";
import Orders from "./pages/freelancePages/Orders.jsx";
import Profileupdate from "./pages/freelancePages/profileUpdate.jsx";
import Gigupdate from "./pages/freelancePages/Gigupdate.jsx";
import PostedgigDetails from "./components/PostedgigDetails.jsx";
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
      <Route path="/gigupdate" element={<Gigupdate />} />
      <Route path="/postdetails" element={<PostedgigDetails />} />
    </Routes>
  );
};

export default App;
