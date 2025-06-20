import React, { useRef, useState, useEffect } from "react";
import { Link, Navigate, Router, useNavigate } from "react-router-dom";
import loginImage from "../assets/images/login.png";
import { themeColors } from "../hooks/theme.js";
import Errors from "../components/Errors.jsx";
import Button from "../components/Button.jsx";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import axios from "axios";
import { EyeOutline, EyeOffSharp } from "react-ionicons";

const Login = () => {
  const [registerOpen, setRegisterOpen] = useState(false);
  const [showPassword, setshowPassword] = useState(false);
  const [showError, setshowError] = useState(false);
  const [error, setError] = useState("");
  const [username, setuserName] = useState("");
  const [email, setEmail] = useState("laxman@gmail.com");
  const [password, setpassword] = useState("laxman");
  const [isChecked, setisChecked] = useState(false);
  const imageRef = useRef(null);
  const Navigate = useNavigate();
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
  useEffect(() => {
    if (!showError) return;
    const timer = setTimeout(() => {
      setshowError(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [showError, error]);

  const checkFields = (type) => {
    if (!email || email === "") {
      setError("Email field is required");
      setshowError(true);
      return true;
    } else if (type == "Register" && username === "") {
      setError("username is required");
      setshowError(true);
      return true;
    } else if (password === "") {
      setError("Password is required");
      setshowError(true);
      return true;
    } else if (type == "Register" && isChecked === false) {
      setError("Agree terms & conditions");
      setshowError(true);
      return true;
    }
    return false;
  };
  const handelRegisterSubmit = (e) => {
    const type = "Register";
    e.preventDefault();
    if (checkFields(type)) return;
    const submitData = axios
      .post(
        `${process.env.REACT_APP_BACKEND_URI}/create`,
        {
          emailId: email,
          userName: username,
          password: password,
        },
        {
          withCredentials: true,
        }
      )
      .then((result) => {
        console.log(result);
        if (result.status === 200) {
          Navigate("/userhome");
        }
      })
      .catch((e) => {
        if (e.status === 400) {
          setError(e.response.data.error);
          setshowError(true);
        }
        console.log(e);
      });
    console.log(submitData);
  };
  const handelLoginSubmit = (e) => {
    e.preventDefault();
    if (checkFields()) return;
    const submitData = axios
      .post(
        `${process.env.REACT_APP_BACKEND_URI}/login`,
        {
          emailId: email,
          password,
        },
        {
          withCredentials: true,
        }
      )
      .then((result) => {
        if (result.status === 200) {
          Navigate("/userhome");
        } else if (result.status === 400) {
          setError(result.data.error);
          setshowError(true);
        }
      })
      .catch((e) => {
        if (e.status === 400) {
          setError(e.response.data.error);
          setshowError(true);
        }
        console.log(e);
      });
    console.log(submitData);
  };

  const handlePageshift = () => {
    setRegisterOpen(!registerOpen);
    setEmail("");
    setpassword("");
    setuserName("");
  };

  return (
    <main className="w-full h-screen flex flex-col md:flex-row">
      {registerOpen && (
        <div className="w-full h-screen md:w-1/2 flex flex-col items-center justify-center">
          <Errors isError={showError} errorText={error} />

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
                placeholder="Enter your name"
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
                placeholder="Enter your email"
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
                placeholder="Enter your password"
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
              <input
                type="checkbox"
                checked={isChecked}
                onChange={(e) => setisChecked(e.target.checked)}
              />
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
                onClick={() => handlePageshift()}
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
          <Errors isError={showError} errorText={error} />
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
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pr-2 pl-5 pt-3 pb-3 rounded-[20px] border border-[#D9D9D9] outline-none font-normal"
              />
            </label>
            <label className="w-[90%] md:w-[70%] flex flex-col gap-2 font-medium relative">
              Password
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                className="pr-[50px] pl-5 pt-3 pb-3 rounded-[20px] border border-[#D9D9D9] outline-none font-normal"
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
            <div className="w-[90%] md:w-[70%] flex justify-end select-none">
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
                onClick={() => {
                  handlePageshift();
                }}
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
