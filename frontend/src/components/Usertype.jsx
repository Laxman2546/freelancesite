import React, { useState, useEffect } from "react";
import axios from "axios";
import freelanceImg from "./../assets/images/freelancer.png";
import clientImg from "./../assets/images/client.png";
import Button from "./../components/Button.jsx";

const Usertype = ({ username, onComplete }) => {
  const [userType, setuserType] = useState("");
  const [clickActive, setclickActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const requestProfile = () => {
    if (!userType) return;

    setIsSubmitting(true);

    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URI}/profile/usertype`,
        {
          role: userType,
        },
        {
          withCredentials: true,
        }
      )
      .then((result) => {
        console.log("User type updated successfully:", result);

        if (onComplete) {
          onComplete();
        }
      })
      .catch((e) => {
        console.error("Error updating user type:", e);
        setIsSubmitting(false);
      });
  };

  const handleUsertype = (userIs) => {
    setclickActive(true);
    setuserType(userIs);
  };

  return (
    <main>
      <div className="flex flex-col bg-white shadow-2xl text-center p-[80px] rounded-2xl gap-11 relative">
        <div className="flex flex-col gap-4">
          <h1 className="text-lg font-medium w-[500px]">
            Welcome, {username || "user"}! Your account is all set. Let us know
            how you'd like to get started.
          </h1>
          <h1 className="text-md font-medium text-[#a6a4a4]">
            We'll tailor your journey to fit your goals.
          </h1>
        </div>
        <div className="w-full flex flex-row gap-5">
          <div
            className={`w-[250px] h-[300px] flex flex-col items-center justify-between rounded-2xl border-2 cursor-pointer p-4 transition-all duration-200 ${
              userType === "freelancer"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-400"
            }`}
            onClick={() => handleUsertype("freelancer")}
          >
            <input
              type="checkbox"
              className="self-end"
              checked={clickActive && userType === "freelancer"}
              readOnly
            />
            <img
              src={freelanceImg}
              alt="freelancer"
              className="w-[180px] h-[180px] object-contain"
            />
            <h2 className="font-medium text-lg">I am a Freelancer</h2>
          </div>
          <div
            className={`w-[250px] h-[300px] flex flex-col items-center justify-between rounded-2xl border-2 cursor-pointer p-4 transition-all duration-200 ${
              userType === "client"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-400"
            }`}
            onClick={() => handleUsertype("client")}
          >
            <input
              type="checkbox"
              className="self-end"
              checked={clickActive && userType === "client"}
              readOnly
            />
            <img
              src={clientImg}
              alt="client"
              className="w-[180px] h-[180px] object-contain"
            />
            <h2 className="font-medium text-lg">I am a Client</h2>
          </div>
        </div>
        <div className="absolute right-14 bottom-5 flex flex-row">
          {userType && (
            <Button
              styles={"text-white p-3 rounded-2xl cursor-pointer font-medium"}
              text={isSubmitting ? "Submitting..." : "Continue"}
              onClick={requestProfile}
              disabled={isSubmitting}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Usertype;
