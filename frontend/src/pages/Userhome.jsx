import React, { useState, useEffect } from "react";
import Usertype from "../components/Usertype";
import axios from "axios";
const Userhome = () => {
  const [showPopup, setshowPopup] = useState(false);
  const [username, setuserName] = useState("");
  const requestProfile = () => {
    axios
      .get(`${process.env.BACKEND_URI}/profile`, {
        withCredentials: true,
      })
      .then((result) => {
        console.log(result);
        setuserName(result.data.fetchUser.userName);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    requestProfile();
  }, []);
  return (
    <main className="w-full h-full">
      <div className="w-full h-screen flex justify-center items-center bg-[#00000080]">
        <Usertype username={username} />
      </div>
    </main>
  );
};

export default Userhome;
