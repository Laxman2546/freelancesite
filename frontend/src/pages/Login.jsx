import React from "react";
import { Link } from "react-router-dom";
import loginImage from "../assets/images/login.png";
import { themeColors } from "../../theme.js";
import Button from "../components/Button.jsx";
const login = () => {
  return (
    <>
      <main className="w-full h-screen flex flex-col  md:flex-row">
        <div className="w-full  h-screen  md:w-1/2 flex flex-col items-center justify-center ">
          <div className="w-full flex justify-center md:justify-start md:items-start pl-1 md:pl-24">
            <h1 className="font-medium text-[25px]">Get Started Now</h1>
          </div>
          <form className="w-full  flex flex-col  gap-10 pt-10 items-center ">
            <label className="w-[70%] flex flex-col gap-2 font-medium">
              Name
              <input
                type="text"
                placeholder="enter your name"
                className="pr-2 pl-3 pt-3 pb-3 rounded-[20px] border-1 border-[#D9D9D9] outline-none font-normal"
              />
            </label>
            <label className="w-[70%] flex flex-col gap-2 font-medium">
              Email address
              <input
                type="text"
                placeholder="enter your email"
                className="pr-2 pl-3 pt-3 pb-3 rounded-[20px] border-1 border-[#D9D9D9] outline-none font-normal"
              />
            </label>
            <label className="w-[70%] flex flex-col gap-2 font-medium">
              Password
              <input
                type="text"
                placeholder="enter your password"
                className="pr-2 pl-3 pt-3 pb-3 rounded-[20px] border-1 border-[#D9D9D9] outline-none font-normal"
              />
            </label>
            <div className="w-[70%] flex flex-row items-center gap-2 text-center">
              <input type="checkbox"></input>
              <p className="text-center">
                I agree to the
                <Link href="/" className="underline underline-offset-1 ml-1">
                  terms & policy
                </Link>
              </p>
            </div>
            <Button
              type={"submit"}
              styles={
                "w-[70%] bg-[#3A5B22] p-3 rounded-2xl font-bold text-white cursor-pointer"
              }
              text={"Signup"}
            />
          </form>
          <div className="mt-5">
            <p>
              Have an account?&nbsp;
              <Link style={{ color: themeColors.text.highlight }}>Signin</Link>
            </p>
          </div>
        </div>
        <div
          className="hidden md:block w-1/2 h-screen bg-cover bg-center rounded-tl-4xl rounded-bl-4xl"
          style={{ backgroundImage: `url(${loginImage})` }}
        ></div>
      </main>
    </>
  );
};

export default login;
