import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import loginImage from "../assets/images/login.png";
import { themeColors } from "../../theme.js";
import Button from "../components/Button.jsx";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import axios from "axios";
import { EyeOutline, EyeOffSharp } from "react-ionicons";
const Login = () => {
  const [registerOpen, setRegisterOpen] = useState(true);
  const [showPassword, setshowPassword] = useState(false);
  const [username, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const imageRef = useRef(null);

  useGSAP(() => {
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        {
          x: registerOpen ? -200 : 200,
          opacity: 0,
          scaleX: registerOpen ? -1 : 1,
        },
        {
          x: 0,
          opacity: 1,
          scaleX: registerOpen ? 1 : -1,
          duration: 1,
          ease: "power3.out",
        }
      );
    }
  }, [registerOpen]);

  const handelRegisterSubmit = (e) => {
    e.preventDefault();
    const submitData = axios
      .post(`${process.env.BACKEND_URI}/create`, {
        emailId: email,
        userName: username,
        password: password,
      })
      .then((result) => {
        console.log(result);
      })
      .catch((e) => console.log(e));
    console.log(submitData);
  };
  const handelLoginSubmit = (e) => {
    e.preventDefault();
    const submitData = axios
      .post(`${process.env.BACKEND_URI}/login`, {
        emailId: email,
        password,
      })
      .then((result) => {
        console.log(result);
      })
      .catch((e) => console.log(e));
    console.log(submitData);
  };

  return (
    <main className="w-full h-screen flex flex-col md:flex-row">
      {registerOpen && (
        <div className="w-full h-screen md:w-1/2 flex flex-col items-center justify-center">
          <div className="w-full flex justify-center md:justify-start md:items-start pl-1 md:pl-24">
            <h1 className="font-medium text-[25px]">Get Started Now</h1>
          </div>
          <form
            className="w-full flex flex-col gap-10 pt-10 items-center"
            onSubmit={handelRegisterSubmit}
          >
            <label className="w-[90%] md:w-[70%] flex flex-col gap-2 font-medium">
              Name
              <input
                type="text"
                name="userName"
                placeholder="enter your name"
                value={username}
                onChange={(e) => setuserName(e.target.value)}
                className="pr-2 pl-3 pt-3 pb-3 rounded-[20px] border border-[#D9D9D9] outline-none font-normal"
              />
            </label>
            <label className="w-[90%] md:w-[70%] flex flex-col gap-2 font-medium">
              Email address
              <input
                type="text"
                name="emailId"
                placeholder="enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pr-2 pl-3 pt-3 pb-3 rounded-[20px] border border-[#D9D9D9] outline-none font-normal"
              />
            </label>
            <label className="w-[90%] md:w-[70%] flex flex-col gap-2 font-medium relative">
              Password
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="enter your password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                className="pr-[50px] pl-3 pt-3 pb-3 rounded-[20px] border border-[#D9D9D9] outline-none font-normal"
              />
              {showPassword ? (
                <EyeOutline
                  color={"#A0A0A0"}
                  height="25px"
                  width="25px"
                  className="absolute bottom-2.5 right-5 cursor-pointer"
                  onClick={() => setshowPassword(false)}
                />
              ) : (
                <EyeOffSharp
                  color={"#A0A0A0"}
                  height="25px"
                  width="25px"
                  className="absolute bottom-2.5 right-5 cursor-pointer"
                  onClick={() => setshowPassword(true)}
                />
              )}
            </label>
            <div className="w-[90%] md:w-[70%] flex flex-row items-center gap-2 text-center">
              <input type="checkbox" />
              <p className="text-center">
                I agree to the
                <Link to="/" className="underline underline-offset-1 ml-1">
                  terms & policy
                </Link>
              </p>
            </div>
            <Button
              type="submit"
              styles="w-[90%] md:w-[70%] bg-[#3A5B22] p-3 rounded-2xl font-bold text-white cursor-pointer"
              text="Signup"
            />
          </form>
          <div className="mt-5">
            <p>
              Have an account?&nbsp;
              <Link
                style={{ color: themeColors.text.secondary }}
                onClick={() => setRegisterOpen(false)}
              >
                Signin
              </Link>
            </p>
          </div>
        </div>
      )}

      <div
        ref={imageRef}
        className="hidden md:block w-1/2 h-screen bg-cover bg-center rounded-tl-4xl rounded-bl-4xl"
        style={{
          backgroundImage: `url(${loginImage})`,
        }}
      ></div>

      {!registerOpen && (
        <div className="w-full h-screen md:w-1/2 flex flex-col items-center justify-center">
          <div className="w-full flex justify-center md:justify-start md:items-start pl-1 md:pl-24">
            <h1 className="font-medium text-[25px]">Welcome back!</h1>
          </div>
          <form
            onSubmit={handelLoginSubmit}
            className="w-full flex flex-col gap-10 pt-10 items-center"
          >
            <label className="w-[90%] md:w-[70%] flex flex-col gap-2 font-medium">
              Email address
              <input
                type="text"
                placeholder="enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pr-2 pl-3 pt-3 pb-3 rounded-[20px] border border-[#D9D9D9] outline-none font-normal"
              />
            </label>
            <label className="w-[90%] md:w-[70%] flex flex-col gap-2 font-medium relative">
              Password
              <input
                type={showPassword ? "text" : "password"}
                placeholder="enter your password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                className="pr-[50px] pl-3 pt-3 pb-3 rounded-[20px] border border-[#D9D9D9] outline-none font-normal"
              />
              {showPassword ? (
                <EyeOutline
                  color={"#A0A0A0"}
                  height="25px"
                  width="25px"
                  className="absolute bottom-2.5 right-5 cursor-pointer"
                  onClick={() => setshowPassword(false)}
                />
              ) : (
                <EyeOffSharp
                  color={"#A0A0A0"}
                  height="25px"
                  width="25px"
                  className="absolute bottom-2.5 right-5 cursor-pointer"
                  onClick={() => setshowPassword(true)}
                />
              )}
            </label>
            <div className="w-[90%] md:w-[70%] flex justify-end">
              <button
                className="cursor-pointer"
                style={{ color: themeColors.text.secondary }}
              >
                forgot password
              </button>
            </div>
            <Button
              type="submit"
              styles="w-[90%] md:w-[70%] bg-[#3A5B22] p-3 rounded-2xl font-bold text-white cursor-pointer"
              text="Login"
            />
          </form>
          <div className="mt-5">
            <p>
              Don't have an account yet?&nbsp;
              <Link
                style={{ color: themeColors.text.secondary }}
                onClick={() => setRegisterOpen(true)}
              >
                Signup
              </Link>
            </p>
          </div>
        </div>
      )}
    </main>
  );
};

export default Login;
