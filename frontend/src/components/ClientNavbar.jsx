import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import {
  EnvelopeIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Fade as Hamburger } from "hamburger-react";
import { BellIcon } from "@heroicons/react/24/outline";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import logo from "../assets/images/logo.svg";
import { userLogout } from "../utils/userLogout";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Errors from "./Errors";
import noNotifications from "../assets/images/download.svg";
import noMessages from "../assets/images/messages.svg";
import axios from "axios";
import Search from "./Search";

const ClientNavbar = ({ isUpdated, isVisible }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isMessageOpen, setMessageIsOpen] = useState(false);
  const [isnotificationopen, setNotifcationopen] = useState(false);
  const [notifications, setnotifications] = useState([]);
  const [messages, setMesssages] = useState([]);
  const [isError, setisError] = useState(false);
  const [menuOpen, setmenuOpen] = useState(false);
  const [error, seterror] = useState("");
  const [userPic, setuserPic] = useState("");
  const [activeNav, setActiveNav] = useState("");
  const [closingMenu, setClosingMenu] = useState(false);
  const [closingMessages, setClosingMessages] = useState(false);
  const [closingNotifications, setClosingNotifications] = useState(false);
  const [isSearchvisible, setSearchvisible] = useState(false);
  const [userName, setuserName] = useState("");
  const location = useLocation();

  // Refs for click outside detection
  const mobileMenuRef = useRef(null);

  const notificationData = [];

  const navItems = [
    {
      label: "Explore",
      href: "/userhome",
    },
    {
      label: "Orders",
      href: "/postgig",
    },
  ];

  const requestData = useCallback(async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BACKEND_URI}/profile`,
        { withCredentials: true }
      );
      if (!result) {
        return;
      }
      const profilePic = `${process.env.REACT_APP_BACKEND_URI}/profilePics/${result.data.profile.profilePic}`;
      setuserPic(profilePic);
      setuserName(result.data.fetchUser.userName);
    } catch (e) {
      console.warn(e, "error while fetching user profile data");
    }
  }, []);

  useEffect(() => {
    requestData();
  }, [isUpdated]);

  useEffect(() => {
    setnotifications(notificationData);
    setMesssages("");
  }, []);

  const handleLogout = async () => {
    const result = await userLogout();
    if (result === 201) {
      navigate("/login");
    }
    seterror(result);
    setisError(true);
  };

  useEffect(() => {
    const ShowError = setTimeout(() => {
      setisError(false);
    }, 2000);
    return () => clearTimeout(ShowError);
  }, [error]);

  const handleMenuToggle = () => {
    if (isOpen) {
      setClosingMenu(true);
      setTimeout(() => {
        setIsOpen(false);
        setClosingMenu(false);
      }, 200);
    } else {
      setIsOpen(true);
    }

    setMessageIsOpen(false);
    setNotifcationopen(false);
  };

  const handleMessagesToggle = () => {
    navigate("/messages");
  };

  const handleNotificationsToggle = () => {
    if (isnotificationopen) {
      setClosingNotifications(true);
      setTimeout(() => {
        setNotifcationopen(false);
        setClosingNotifications(false);
      }, 200);
    } else {
      setNotifcationopen(true);
    }
    setIsOpen(false);
    setMessageIsOpen(false);
  };

  const handleNavItemClick = (href) => {
    console.log("Navigation clicked:", href);

    setIsOpen(false);
    setClosingMenu(false);

    setTimeout(() => {
      if (href !== "#") {
        console.log("Navigating to:", href);
        navigate(href);
      }
    }, 50);
  };

  const isVisble = () => {
    setSearchvisible(!isSearchvisible);
  };

  const mobileSearch = useRef(null);

  useEffect(() => {
    const handleSearchClose = (e) => {
      if (mobileSearch.current && !mobileSearch.current.contains(e.target)) {
        setSearchvisible(false);
      }
    };
    document.addEventListener("mousedown", handleSearchClose);
    return () => document.removeEventListener("mousedown", handleSearchClose);
  }, []);

  const closeMessage = useRef(null);
  const closeNotification = useRef(null);
  const profileClose = useRef(null);

  useEffect(() => {
    const handleMessgageClose = (e) => {
      if (closeMessage.current && !closeMessage.current.contains(e.target)) {
        setMessageIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleMessgageClose);
    return () => document.removeEventListener("mousedown", handleMessgageClose);
  }, []);

  useEffect(() => {
    const handleNotificationClose = (e) => {
      if (
        closeNotification.current &&
        !closeNotification.current.contains(e.target)
      ) {
        setNotifcationopen(false);
      }
    };
    document.addEventListener("mousedown", handleNotificationClose);
    return () =>
      document.removeEventListener("mousedown", handleNotificationClose);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        const hamburgerButton =
          e.target.closest('[data-testid="hamburger"]') ||
          e.target.closest('button[aria-label*="menu"]');

        if (!hamburgerButton && isOpen) {
          setClosingMenu(true);
          setTimeout(() => {
            setIsOpen(false);
            setClosingMenu(false);
          }, 200);
        }
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    const handleProfilecolse = (e) => {
      if (profileClose.current && !profileClose.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleProfilecolse);
    return () => document.removeEventListener("mousedown", handleProfilecolse);
  }, []);

  return (
    <header className="w-full h-full flex flex-col items-center relative bg-white shadow-gray-400 shadow-sm z-[9999999]">
      <Errors
        errorText={error}
        isError={isError}
        errorStyles={"absolute top-25 z-50 "}
      />

      {(isOpen || closingMenu) && (
        <div
          className={`fixed inset-0 bg-[#00000080] bg-opacity-50 md:hidden ${
            closingMenu ? "animate-fade-out" : "animate-fade-in"
          }`}
        />
      )}

      <nav className="w-full p-3 pl-0 md:p-5 flex flex-row md:flex-row items-center justify-center relative">
        <div className="flex flex-col mr-[20px] md:hidden">
          <Hamburger
            easing="ease-in"
            toggled={isOpen}
            onToggle={handleMenuToggle}
            color="#3A5B22"
            size={24}
          />

          {isOpen && (
            <div
              ref={mobileMenuRef}
              className="fixed top-0 left-0 w-[280px] bg-white  h-full shadow-xl overflow-scroll animate-slideIn"
            >
              <div className="absolute top-5 left-3">
                <Hamburger
                  easing="ease-in"
                  toggled={isOpen}
                  onToggle={handleMenuToggle}
                  color="#3A5B22"
                  size={24}
                />
              </div>

              <div className="h-full flex flex-col">
                <div className="flex flex-row items-center justify-center mt-[80px] gap-3 p-6 border-b border-gray-200">
                  {userPic ? (
                    <div className="w-[25px] h-[25px]">
                      <img
                        src={userPic}
                        className="w-[25px] h-[25px] rounded-full object-cover"
                        alt="Profile"
                      />
                    </div>
                  ) : (
                    <UserCircleIcon className="size-6 transition-colors" />
                  )}
                  <h1 className="text-lg font-semibold text-gray-800">
                    {userName}
                  </h1>
                </div>

                <div className="flex-1 py-6">
                  <ul className="space-y-2 px-4">
                    {navItems.map((item, index) => (
                      <li key={index}>
                        <Link
                          to={item.href}
                          onClick={() => {
                            setIsOpen(false);
                          }}
                          className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-[#3A5B22] rounded-lg transition-colors duration-200 font-medium"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <div className="border-t border-gray-200 my-6 mx-4"></div>

                  <ul className="space-y-2 px-4">
                    <li>
                      <Link
                        to="/messages"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 w-full text-left px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-[#3A5B22] rounded-lg transition-colors duration-200 font-medium"
                      >
                        <EnvelopeIcon className="size-5" />
                        Messages
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/notifications"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 w-full text-left px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-[#3A5B22] rounded-lg transition-colors duration-200 font-medium"
                      >
                        <BellIcon className="size-5" />
                        Notifications
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/profile"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 w-full text-left px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-[#3A5B22] rounded-lg transition-colors duration-200 font-medium"
                      >
                        {userPic ? (
                          <div className="w-[25px] h-[25px]">
                            <img
                              src={userPic}
                              className="w-[25px] h-[25px] rounded-full object-cover"
                              alt="Profile"
                            />
                          </div>
                        ) : (
                          <UserCircleIcon className="size-5 transition-colors" />
                        )}
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/profileupdate"
                        onClick={() => {
                          console.log("clicked profile update");
                          setIsOpen(false);
                        }}
                        className="flex items-center gap-3 w-full text-left px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-[#3A5B22] rounded-lg transition-colors duration-200 font-medium"
                      >
                        <PencilSquareIcon className="size-5" />
                        Update Profile
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="p-4 border-t border-gray-200">
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      setTimeout(() => handleLogout(), 50);
                    }}
                    className="w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 font-medium text-left"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-row items-center gap-8">
          <Link to={"/userhome"}>
            <div
              className={`flex flex-row items-center gap-2 ${
                !isSearchvisible ? "md:flex" : "hidden md:flex"
              }`}
            >
              <img src={logo} className="size-8 hidden md:block" id="logo" />
              <h1 className="text-lg xsm:text-lg sm:text-xl md:text-2xl font-bold text-center text-[#3A5B22]">
                GigConnect
              </h1>
            </div>
          </Link>
          <div
            ref={mobileSearch}
            className={`md:hidden w-full absolute bg-white  ${
              isSearchvisible ? "right-1" : "right-1 top-2.5"
            }`}
          >
            <Search
              isSearchvisible={isVisble}
              showSearch={isSearchvisible}
              navBarSearch={true}
            />
          </div>
        </div>

        <div
          className="w-full flex items-center justify-center"
          onClick={() => {
            setMessageIsOpen(false);
            setNotifcationopen(false);
            setIsOpen(false);
          }}
        >
          <ul className="hidden w-3/4 flex-row gap-8 md:flex items-center relative">
            {isVisible && (
              <li
                className={`${
                  isVisible ? " animate-fade-in w-full" : "animate-fade-in "
                }`}
              >
                <Search />
              </li>
            )}
          </ul>
        </div>

        <div className="hidden md:flex items-center justify-end">
          <ul className="flex flex-row gap-5 items-center">
            <Link to={"/orders"}>
              <li
                className={`font-medium text-lg p-3 rounded-xl cursor-pointer ${
                  activeNav === "Orders" && `bg-[#3A5B22] text-white`
                }`}
              >
                Orders
              </li>
            </Link>
            <li className="cursor-pointer relative">
              <EnvelopeIcon
                className="size-6 transition-colors"
                onClick={handleMessagesToggle}
              />
            </li>
            <li className="cursor-pointer relative">
              <BellIcon
                className="size-6 transition-colors"
                onClick={handleNotificationsToggle}
                ref={closeNotification}
              />
              {(isnotificationopen || closingNotifications) && (
                <div
                  className={`notifications absolute right-0 top-8  bg-white rounded-lg shadow-lg border w-80 max-h-96 overflow-y-auto ${
                    closingNotifications
                      ? "animate-fade-out"
                      : "animate-fade-in"
                  }`}
                >
                  {notifications.length < 1 ? (
                    <div className="flex flex-col items-center justify-center p-8">
                      <img
                        src={noNotifications}
                        alt="No notifications"
                        className="w-16 h-16 opacity-50"
                      />
                      <h1 className="text-center font-medium w-full text-gray-600 mt-2">
                        No new notifications
                      </h1>
                    </div>
                  ) : (
                    <div>
                      <div className="px-4 py-3 border-b border-gray-100 text-lg font-semibold text-[#3A5B22]">
                        🔔 Notifications
                      </div>
                      {notifications.map((note) => (
                        <div
                          key={note.id}
                          className={`p-4 border-b hover:bg-gray-50 cursor-pointer transition-colors ${
                            note.isRead ? "bg-white" : "bg-green-50"
                          }`}
                        >
                          <h4 className="font-semibold text-gray-800">
                            {note.title}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {note.content}
                          </p>
                          <span className="text-xs text-gray-400 mt-2 block">
                            {new Date(note.timestamp).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </li>
            <li className="cursor-pointer relative" ref={profileClose}>
              {userPic ? (
                <div className="w-[25px] h-[25px]" onClick={handleMenuToggle}>
                  <img
                    src={userPic}
                    className="w-[25px] h-[25px] rounded-full object-cover"
                    alt="Profile"
                  />
                </div>
              ) : (
                <UserCircleIcon
                  className="size-6 transition-colors"
                  onClick={handleMenuToggle}
                />
              )}
              {(isOpen || closingMenu) && (
                <div
                  className={`absolute right-0 top-8  bg-white rounded-lg shadow-lg border w-48 ${
                    closingMenu ? "animate-fade-out" : "animate-fade-in"
                  }`}
                >
                  <ul className="flex flex-col py-2">
                    <Link to={"/profile"}>
                      <li className="px-4 py-2 transition-colors cursor-pointer hover:bg-gray-100">
                        <span className="font-medium cursor-pointer">
                          Profile
                        </span>
                        <div className="text-xs text-gray-500">
                          View your profile
                        </div>
                      </li>
                    </Link>
                    <Link to={"/profileupdate"}>
                      <li className="px-4 py-2 transition-colors cursor-pointer hover:bg-gray-100">
                        <span className="font-medium cursor-pointer">
                          Update Profile
                        </span>
                        <div className="text-xs text-gray-500">
                          update your profile
                        </div>
                      </li>
                    </Link>
                    <Link to={"/account"}>
                      <li className="hover:bg-gray-100 px-4 py-2 transition-colors cursor-pointer">
                        <span className="font-medium">Account Settings</span>
                        <div className="text-xs text-gray-500">
                          Manage your account
                        </div>
                      </li>
                    </Link>
                    <li
                      className="hover:bg-gray-100 px-4 py-2 rounded-b transition-colors cursor-pointer text-red-600"
                      onClick={handleLogout}
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </li>
          </ul>
        </div>
      </nav>

      <style>{`
        .notifications::-webkit-scrollbar {
          display: none;
        }
        .notifications {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        .messages::-webkit-scrollbar {
          display: none;
        }
        .messages {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px);}
          to { opacity: 1; transform: translateY(0);}
        }
        @keyframes fade-out {
          from { opacity: 1; transform: translateY(0);}
          to { opacity: 0; transform: translateY(-10px);}
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease;
        }
        .animate-fade-out {
          animation: fade-out 0.2s ease;
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-100%);}
          to { opacity: 1; transform: translateX(0);}
        }
        @keyframes slideOut {
          from { opacity: 1; transform: translateX(0);}
          to { opacity: 0; transform: translateX(-100%);}
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
        .animate-slideOut {
          animation: slideOut 0.2s ease-in;
        }
        @keyframes rotateIn {
           to {
               transform: rotate(360deg);
          }         
        }
          #logo:hover {
            animation: mymove 1s ease-in-out;
          }
          @keyframes mymove {
              0% {
                transform: rotate(0deg);
                scale:1;
              }
              100% {
                transform: rotate(360deg);
                scale:1.2;
              }
            }

      `}</style>
    </header>
  );
};

export default memo(ClientNavbar);
