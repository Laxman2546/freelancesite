import React, { useState } from "react";
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
        { role: userType },
        { withCredentials: true }
      )
      .then((result) => {
        console.log("User type updated successfully:", result);
        if (onComplete) onComplete();
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
    <main className="p-4 flex justify-center items-center   ">
      <div className="flex flex-col bg-white  shadow-sm dark:bg-gray-700 text-center p-6 md:p-14 rounded-2xl gap-8 w-full max-w-4xl relative">
        <div className="flex flex-col gap-2">
          <h1 className="text-lg font-medium mx-auto w-full max-w-md">
            Welcome, {username || "user"}! Your account is all set. Let us know
            how you'd like to get started.
          </h1>
          <h2 className="text-md font-medium text-[#a6a4a4]">
            We'll tailor your journey to fit your goals.
          </h2>
        </div>

        <div className="w-full flex flex-col md:flex-row gap-6 justify-center items-center">
          <div
            className={`w-full max-w-[250px] h-[300px] flex flex-col items-center justify-between rounded-2xl border-2 cursor-pointer p-4 transition-all duration-200 ${
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
              className="w-[150px] h-[150px] object-contain"
            />
            <h2 className="font-medium text-lg">I am a Freelancer</h2>
          </div>
          <div
            className={`w-full max-w-[250px] h-[300px] flex flex-col items-center justify-between rounded-2xl border-2 cursor-pointer p-4 transition-all duration-200 ${
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
              className="w-[150px] h-[150px] object-contain"
            />
            <h2 className="font-medium text-lg">I am a Client</h2>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <Button
            styles="text-white p-3 rounded-2xl cursor-pointer font-medium"
            text={isSubmitting ? "Submitting..." : "Continue"}
            onClick={requestProfile}
            isDisabled={userType ? true : false}
          />
        </div>
      </div>
    </main>
  );
};

export default Usertype;
