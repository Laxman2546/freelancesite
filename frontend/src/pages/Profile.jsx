import React, { useEffect, useState } from "react";
import axios from "axios";
const Profile = () => {
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
    <main>
      <h1>{username} profile page</h1>
    </main>
  );
};

export default Profile;
