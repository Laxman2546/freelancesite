import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
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
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const FreelancerNavbar = ({ isUpdated }) => {
  const Navigate = useNavigate();

  // SEPARATE STATES FOR DIFFERENT MENUS
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
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
  const [closingProfileDropdown, setClosingProfileDropdown] = useState(false);
  const [userName, setuserName] = useState("");
  const location = useLocation();

  const mobileMenuRef = useRef(null);
  const profileDropdownRef = useRef(null);

  const recentMessages = [];

  const notificationData = [];

  const navItems = [
    {
      label: "MyGigs",
      href: "/userhome",
    },
    {
      label: "Post a Gig",
      href: "/postgig",
    },
    {
      label: "Orders",
      href: "/orders",
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
  }, [isUpdated, requestData]);

  useEffect(() => {
    setnotifications(notificationData);
    setMesssages(recentMessages);
  }, []);

  const handleLogout = async () => {
    const result = await userLogout();
    if (result === 201) {
      Navigate("/login");
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

  // SEPARATE MOBILE MENU TOGGLE
  const handleMobileMenuToggle = () => {
    if (isMobileMenuOpen) {
      setClosingMenu(true);
      setTimeout(() => {
        setIsMobileMenuOpen(false);
        setClosingMenu(false);
      }, 200);
    } else {
      setIsMobileMenuOpen(true);
    }
    setMessageIsOpen(false);
    setNotifcationopen(false);
    setIsProfileDropdownOpen(false);
  };

  // SEPARATE PROFILE DROPDOWN TOGGLE
  const handleProfileDropdownToggle = () => {
    if (isProfileDropdownOpen) {
      setClosingProfileDropdown(true);
      setTimeout(() => {
        setIsProfileDropdownOpen(false);
        setClosingProfileDropdown(false);
      }, 200);
    } else {
      setIsProfileDropdownOpen(true);
    }
    setIsMobileMenuOpen(false);
    setMessageIsOpen(false);
    setNotifcationopen(false);
  };

  const handleMessagesToggle = () => {
    if (isMessageOpen) {
      setClosingMessages(true);
      setTimeout(() => {
        setMessageIsOpen(false);
        setClosingMessages(false);
      }, 200);
    } else {
      setMessageIsOpen(true);
    }
    setNotifcationopen(false);
    setIsMobileMenuOpen(false);
    setIsProfileDropdownOpen(false);
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
    setIsMobileMenuOpen(false);
    setMessageIsOpen(false);
    setIsProfileDropdownOpen(false);
  };

  const closeMessage = useRef(null);
  const closeNotification = useRef(null);

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

  // MOBILE MENU CLICK OUTSIDE
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        const hamburgerButton =
          e.target.closest('[data-testid="hamburger"]') ||
          e.target.closest('button[aria-label*="menu"]');

        if (!hamburgerButton && isMobileMenuOpen) {
          setClosingMenu(true);
          setTimeout(() => {
            setIsMobileMenuOpen(false);
            setClosingMenu(false);
          }, 200);
        }
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleProfileClose = (e) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(e.target)
      ) {
        if (isProfileDropdownOpen) {
          setClosingProfileDropdown(true);
          setTimeout(() => {
            setIsProfileDropdownOpen(false);
            setClosingProfileDropdown(false);
          }, 200);
        }
      }
    };

    if (isProfileDropdownOpen) {
      document.addEventListener("mousedown", handleProfileClose);
    }

    return () => document.removeEventListener("mousedown", handleProfileClose);
  }, [isProfileDropdownOpen]);

  useEffect(() => {
    if (location.pathname.includes("userhome")) {
      setActiveNav("MyGigs");
    } else if (location.pathname.includes("postgig")) {
      setActiveNav("Post a Gig");
    } else if (location.pathname.includes("orders")) {
      setActiveNav("Orders");
    }
  }, [location.pathname]);

  return (
    <header className="w-full h-full flex flex-col items-center relative bg-white shadow-gray-400 shadow-sm z-[9999999]">
      <Errors
        errorText={error}
        isError={isError}
        errorStyles={"absolute top-25 z-50"}
      />
      {(isMobileMenuOpen || closingMenu) && (
        <div
          className={`fixed inset-0 bg-[#00000080] bg-opacity-50 z-30 md:hidden ${
            closingMenu ? "animate-fade-out" : "animate-fade-in"
          }`}
          onClick={handleMobileMenuToggle}
        />
      )}

      <nav className="w-full p-5 pl-0 md:p-5 flex flex-row md:flex-row items-center justify-center md:justify-between relative z-40">
        <div className=" z-[80] flex flex-col mr-[20px] md:hidden">
          <Hamburger
            easing="ease-in"
            toggled={isMobileMenuOpen}
            onToggle={handleMobileMenuToggle}
            color="#3A5B22"
            size={24}
          />
          {(isMobileMenuOpen || closingMenu) && (
            <div
              ref={mobileMenuRef}
              className={`fixed top-0 left-0 max-w-[280px] bg-white h-full shadow-xl overflow-scroll z-40 ${
                closingMenu ? "animate-slideOut" : "animate-slideIn"
              }`}
            >
              <div className="absolute top-5 left-3">
                <Hamburger
                  easing="ease-in"
                  toggled={isMobileMenuOpen}
                  onToggle={handleMobileMenuToggle}
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
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`block text-left px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-[#3A5B22] rounded-lg transition-colors duration-200 font-medium ${
                            activeNav === item.label
                              ? "bg-[#3A5B22] text-white"
                              : ""
                          }`}
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
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 w-full text-left px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-[#3A5B22] rounded-lg transition-colors duration-200 font-medium"
                      >
                        <EnvelopeIcon className="size-5" />
                        Messages
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/notifications"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 w-full text-left px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-[#3A5B22] rounded-lg transition-colors duration-200 font-medium"
                      >
                        <BellIcon className="size-5" />
                        Notifications
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/profile"
                        onClick={() => setIsMobileMenuOpen(false)}
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
                        onClick={() => setIsMobileMenuOpen(false)}
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
                      setIsMobileMenuOpen(false);
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

        <div
          onClick={() => {
            setMessageIsOpen(false);
            setNotifcationopen(false);
            setIsMobileMenuOpen(false);
            setIsProfileDropdownOpen(false);
          }}
        >
          <Link to={"/userhome"}>
            <div className="flex flex-row items-center gap-2">
              <img src={logo} className="size-8 hidden md:block" id="logo" />
              <h1 className="text-2xl font-bold text-center text-[#3A5B22]">
                GigConnect
              </h1>
            </div>
          </Link>
        </div>

        <div className="w-full flex items-center justify-center">
          <ul className="hidden flex-row gap-8 md:flex">
            {navItems.map((item, index) => (
              <Link key={index} to={item.href}>
                <li
                  className={`font-medium text-lg p-3 rounded-xl cursor-pointer hover:bg-green-50 hover:text-[#3A5B22] transition-colors ${
                    activeNav === item.label ? "bg-[#3A5B22] text-white" : ""
                  }`}
                >
                  {item.label}
                </li>
              </Link>
            ))}
          </ul>
        </div>

        <div className="hidden md:flex items-center justify-end">
          <ul className="flex flex-row gap-5">
            <li className="cursor-pointer relative" ref={closeMessage}>
              <EnvelopeIcon
                className="size-6 transition-colors hover:text-[#3A5B22]"
                onClick={handleMessagesToggle}
              />
              {(isMessageOpen || closingMessages) && (
                <div
                  className={`absolute right-0 top-8 z-20 bg-white rounded-lg shadow-lg border w-80 ${
                    closingMessages ? "animate-fade-out" : "animate-fade-in"
                  }`}
                >
                  {messages.length < 1 ? (
                    <div className="flex flex-col items-center justify-center p-8">
                      <img
                        src={noMessages}
                        alt="No messages"
                        className="w-16 h-16 opacity-50"
                      />
                      <h1 className="text-center font-medium w-full text-gray-600 mt-2">
                        No new messages
                      </h1>
                      <a href="/messages" className="text-lime-800 underline">
                        start a new conversation
                      </a>
                    </div>
                  ) : (
                    <div>
                      <div className="px-4 py-3 border-b border-gray-100 text-lg font-semibold text-[#3A5B22]">
                        💬 Messages
                      </div>

                      <ul className="messages max-h-80 overflow-y-auto">
                        {messages.map((msg, idx) => (
                          <li
                            key={idx}
                            className="flex gap-3 items-start px-4 py-3 hover:bg-green-50 cursor-pointer transition-colors"
                            onClick={() => Navigate(`/messages/${msg.chatId}`)}
                          >
                            <img
                              src={msg.avatar}
                              alt={msg.senderName}
                              className="w-10 h-10 rounded-full object-cover"
                              onError={(e) => {
                                e.target.style.display = "none";
                              }}
                            />
                            <div className="flex-1">
                              <p className="font-semibold text-sm text-gray-800">
                                {msg.senderName}
                              </p>
                              <p className="text-sm text-gray-600 truncate w-[180px]">
                                {msg.message}
                              </p>
                              <div className="flex justify-between items-center text-xs text-gray-400">
                                <span>{msg.time}</span>
                                {!msg.isRead && (
                                  <span className="text-green-600 font-bold relative bottom-10">
                                    ●
                                  </span>
                                )}
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>

                      <div
                        className="text-center py-2 border-t border-gray-100 text-sm text-[#3A5B22] hover:underline cursor-pointer"
                        onClick={() => Navigate("/messages")}
                      >
                        See All Messages
                      </div>
                    </div>
                  )}
                </div>
              )}
            </li>
            <li className="cursor-pointer relative" ref={closeNotification}>
              <BellIcon
                className="size-6 transition-colors hover:text-[#3A5B22]"
                onClick={handleNotificationsToggle}
              />
              {(isnotificationopen || closingNotifications) && (
                <div
                  className={`notifications absolute right-0 top-8 z-20 bg-white rounded-lg shadow-lg border w-80 max-h-96 overflow-y-auto ${
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
            <li className="cursor-pointer relative" ref={profileDropdownRef}>
              {userPic ? (
                <div
                  className="w-[25px] h-[25px]"
                  onClick={handleProfileDropdownToggle}
                >
                  <img
                    src={userPic}
                    className="w-[25px] h-[25px] rounded-full object-cover hover:ring-2 hover:ring-[#3A5B22] transition-all"
                    alt="Profile"
                  />
                </div>
              ) : (
                <UserCircleIcon
                  className="size-6 transition-colors hover:text-[#3A5B22]"
                  onClick={handleProfileDropdownToggle}
                />
              )}
              {(isProfileDropdownOpen || closingProfileDropdown) && (
                <div
                  className={`absolute right-0 top-8 z-20 bg-white rounded-lg shadow-lg border w-48 ${
                    closingProfileDropdown
                      ? "animate-fade-out"
                      : "animate-fade-in"
                  }`}
                >
                  <ul className="flex flex-col py-2">
                    <Link
                      to="/profile"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      <li className="px-4 py-2 transition-colors cursor-pointer hover:bg-gray-100">
                        <span className="font-medium cursor-pointer">
                          Profile
                        </span>
                        <div className="text-xs text-gray-500">
                          View your profile
                        </div>
                      </li>
                    </Link>
                    <Link
                      to="/profileupdate"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      <li className="px-4 py-2 transition-colors cursor-pointer hover:bg-gray-100">
                        <span className="font-medium cursor-pointer">
                          Update Profile
                        </span>
                        <div className="text-xs text-gray-500">
                          update your profile
                        </div>
                      </li>
                    </Link>
                    <Link
                      to="/account"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      <li className="hover:bg-gray-100 px-4 py-2 transition-colors cursor-pointer">
                        <span className="font-medium">Account Settings</span>
                        <div className="text-xs text-gray-500">
                          Manage your account
                        </div>
                      </li>
                    </Link>
                    <li
                      className="hover:bg-gray-100 px-4 py-2 rounded-b transition-colors cursor-pointer text-red-600"
                      onClick={() => {
                        setIsProfileDropdownOpen(false);
                        handleLogout();
                      }}
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

export default memo(FreelancerNavbar);

export const arrowStyle = {
  border: "solid black",
  borderWidth: "0 3px 3px 0",
  display: "inline-block",
  padding: "3px",
};
