import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/images/logo.svg";

const HomePageNav = () => {
  return (
    <div>
      <div className="flex flex-row items-center justify-between gap-8 border-b-1 border-gray-200 sticky top-0 z-50 bg-white shadow-md w-full p-3 md:p-5">
        <Link to={"/"}>
          <div className={`flex flex-row items-center gap-2  `}>
            <img src={Logo} className="size-8 hidden md:block" id="logo" />
            <h1 className="text-lg xsm:text-lg sm:text-xl md:text-2xl font-bold text-center text-[#3A5B22]">
              GigConnect
            </h1>
          </div>
        </Link>
        <div className="flex flex-row gap-5 items-center justify-center">
          <Link to={"/login"}>
            <p className="p-2 pl-5 pr-5 border-1 border-[#d7d7d7] font-medium text-center hover:bg-lime-700 hover:text-white text-black rounded-lg">
              Login
            </p>
          </Link>
          <Link to={"/login"}>
            <p className="p-2 pl-5 pr-5 border-1  font-medium text-center hover:bg-lime-700 text-white bg-lime-800 rounded-lg">
              Get Started
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePageNav;
