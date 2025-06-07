import React, { useEffect, useState } from "react";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { Fade as Hamburger } from "hamburger-react";
import { BellIcon } from "@heroicons/react/24/outline";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import GooeyNav from "./GooeyNav";
import { userLogout } from "../utils/userLogout";
import { Link, useNavigate } from "react-router-dom";
import Errors from "./Errors";
import noNotifications from "../assets/images/download.svg";
import noMessages from "../assets/images/messages.svg";

const FreelancerNavbar = () => {
  const Navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isMessageOpen, setMessageIsOpen] = useState(false);
  const [isnotificationopen, setNotifcationopen] = useState(false);
  const [notifications, setnotifications] = useState([]);
  const [messages, setMesssages] = useState([]);
  const [isError, setisError] = useState(false);
  const [menuOpen, setmenuOpen] = useState(false);
  const [error, seterror] = useState("");
  const navItems = [
    {
      label: "My Services",
      href: "#",
    },
    {
      label: "Post a Service",
      href: "#",
    },
    {
      label: "Orders",
      href: "#",
    },
  ];
  const recentMessages = [
    {
      senderName: "John Doe",
      avatar: "/avatars/john.png",
      message: "Hey! Are you available to work on a landing page?",
      time: "10:45 AM",
      isRead: false,
      chatId: "chat123",
    },
    {
      senderName: "Sarah Williams",
      avatar: "/avatars/sarah.png",
      message: "Can you help me with React Native?",
      time: "Yesterday",
      isRead: true,
      chatId: "chat456",
    },
  ];

  const notificationData = [
    {
      id: 1,
      type: "message",
      title: "New Message",
      content:
        "John Doe sent you a new message: 'Hey, I liked your profile. Are you available?'",
      timestamp: "2025-05-26T12:30:00Z",
      isRead: false,
    },
    {
      id: 2,
      type: "order",
      title: "New Job Request",
      content:
        "You received a new job request from Sarah Williams for 'Build a Portfolio Website'.",
      timestamp: "2025-05-25T17:45:00Z",
      isRead: false,
    },
    {
      id: 3,
      type: "review",
      title: "Client Review",
      content: "Alex Smith left a 5-star review on your recent project.",
      timestamp: "2025-05-25T08:20:00Z",
      isRead: true,
    },
    {
      id: 4,
      type: "system",
      title: "Withdrawal Successful",
      content:
        "Your ₹4,000 withdrawal to UPI ID xxxxx@okaxis has been processed.",
      timestamp: "2025-05-24T15:05:00Z",
      isRead: true,
    },
    {
      id: 5,
      type: "warning",
      title: "Profile Incomplete",
      content: "Complete your profile to appear in more search results.",
      timestamp: "2025-05-23T11:10:00Z",
      isRead: false,
    },
  ];

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

  const [closingMenu, setClosingMenu] = useState(false);
  const [closingMessages, setClosingMessages] = useState(false);
  const [closingNotifications, setClosingNotifications] = useState(false);

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
    setIsOpen(false);
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
    setClosingMenu(true);
    setTimeout(() => {
      setIsOpen(false);
      setClosingMenu(false);
      if (href !== "#") {
        Navigate(href);
      }
    }, 200);
  };

  return (
    <header className="w-full h-full flex flex-col items-center relative">
      <Errors
        errorText={error}
        isError={isError}
        errorStyles={"absolute top-25 z-50"}
      />
      {(isOpen || closingMenu) && (
        <div
          className={`fixed inset-0 bg-[#00000080] bg-opacity-50 z-30 md:hidden ${
            closingMenu ? "animate-fade-out" : "animate-fade-in"
          }`}
          onClick={handleMenuToggle}
        />
      )}

      <nav className="w-full p-5 pl-0 md:p-8 flex flex-row md:flex-row items-center justify-center md:justify-between relative z-40">
        <div className="absoulte z-[80] flex flex-col mr-[20px] md:hidden">
          <Hamburger
            easing="ease-in"
            toggled={isOpen}
            onToggle={handleMenuToggle}
            color="#3A5B22"
            size={24}
          />
          {(isOpen || closingMenu) && (
            <div
              className={`fixed top-0 left-0 w-[280px]  bg-white h-full shadow-xl overflow-scroll  z-40 mr-[40px] ${
                closingMenu ? "animate-slideOut" : "animate-slideIn"
              }`}
            >
              <div className="absolute top-5">
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
                  <UserCircleIcon className="size-8 text-[#3A5B22]" />
                  <h1 className="text-lg font-semibold text-gray-800">
                    Lakshman
                  </h1>
                </div>

                <div className="flex-1 py-6">
                  <ul className="space-y-2 px-4">
                    {navItems.map((item, index) => (
                      <li key={index}>
                        <button
                          onClick={() => handleNavItemClick(item.href)}
                          className="w-full text-left px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-[#3A5B22] rounded-lg transition-colors duration-200 font-medium"
                        >
                          {item.label}
                        </button>
                      </li>
                    ))}
                  </ul>

                  <div className="border-t border-gray-200 my-6 mx-4"></div>

                  <ul className="space-y-2 px-4">
                    <li>
                      <button
                        onClick={() => handleNavItemClick("/messages")}
                        className="w-full text-left px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-[#3A5B22] rounded-lg transition-colors duration-200 font-medium flex items-center gap-3"
                      >
                        <EnvelopeIcon className="size-5" />
                        Messages
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => handleNavItemClick("/notifications")}
                        className="w-full text-left px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-[#3A5B22] rounded-lg transition-colors duration-200 font-medium flex items-center gap-3"
                      >
                        <BellIcon className="size-5" />
                        Notifications
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => handleNavItemClick("/profile")}
                        className="w-full text-left px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-[#3A5B22] rounded-lg transition-colors duration-200 font-medium flex items-center gap-3"
                      >
                        <UserCircleIcon className="size-5" />
                        Profile
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => handleNavItemClick("/profileupdate")}
                        className="w-full text-left px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-[#3A5B22] rounded-lg transition-colors duration-200 font-medium flex items-center gap-3"
                      >
                        <PencilSquareIcon className="size-5" />
                        Update Profile
                      </button>
                    </li>
                  </ul>
                </div>

                <div className="p-4 border-t border-gray-200">
                  <button
                    onClick={handleLogout}
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
            setIsOpen(false);
          }}
        >
          <Link to={"/userhome"}>
            <h1 className="text-2xl font-bold text-center text-[#3A5B22]">
              GigConnect
            </h1>
          </Link>
        </div>

        <div
          className="w-full flex items-center justify-center"
          onClick={() => {
            setMessageIsOpen(false);
            setNotifcationopen(false);
            setIsOpen(false);
          }}
        >
          <ul className="hidden flex-row gap-5 md:flex">
            <GooeyNav
              items={navItems}
              particleCount={15}
              particleDistances={[90, 10]}
              particleR={100}
              initialActiveIndex={0}
              animationTime={600}
              timeVariance={300}
              colors={[1, 1, 1, 1, 1, 1, 1, 1]}
            />
          </ul>
        </div>

        <div className="hidden md:flex items-center justify-end">
          <ul className="flex flex-row gap-5">
            <li className="cursor-pointer relative">
              <EnvelopeIcon
                className="size-6  transition-colors"
                onClick={handleMessagesToggle}
              />
              {(isMessageOpen || closingMessages) && (
                <div
                  className={`absolute right-0 top-8 z-20 bg-white rounded-lg shadow-lg border w-80 ${
                    closingMessages ? "animate-fade-out" : "animate-fade-in"
                  }`}
                >
                  {messages.length < 1 ? (
                    <div className="flex flex-col items-center justify-center p-8 ">
                      <img
                        src={noMessages}
                        alt="No messages"
                        className="w-16 h-16 opacity-50"
                      />
                      <h1 className="text-center font-medium w-full text-gray-600 mt-2">
                        No new messages
                      </h1>
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
                            />
                            <div className="flex-1">
                              <p className="font-semibold text-sm text-gray-800 ">
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
            <li className="cursor-pointer relative">
              <BellIcon
                className="size-6  transition-colors"
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
            <li className="cursor-pointer relative">
              <UserCircleIcon
                className="size-6  transition-colors"
                onClick={handleMenuToggle}
              />
              {(isOpen || closingMenu) && (
                <div
                  className={`absolute right-0 top-8 z-20 bg-white rounded-lg shadow-lg border w-48 ${
                    closingMenu ? "animate-fade-out" : "animate-fade-in"
                  }`}
                >
                  <ul className="flex flex-col py-2">
                    <Link to={"/profile"}>
                      <li className=" px-4 py-2 transition-colors cursor-pointer hover:bg-gray-100">
                        <span className="font-medium cursor-pointer">
                          Profile
                        </span>
                        <div className="text-xs text-gray-500">
                          View your profile
                        </div>
                      </li>
                    </Link>
                    <Link to={"/profileupdate"}>
                      <li className=" px-4 py-2 transition-colors cursor-pointer hover:bg-gray-100">
                        <span className="font-medium cursor-pointer">
                          Update Profile
                        </span>
                        <div className="text-xs text-gray-500">
                          update your profile
                        </div>
                      </li>
                    </Link>
                    <li className="hover:bg-gray-100 px-4 py-2 transition-colors cursor-pointer">
                      <span className="font-medium">Account Settings</span>
                      <div className="text-xs text-gray-500">
                        Manage your account
                      </div>
                    </li>
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
      `}</style>
    </header>
  );
};

export default FreelancerNavbar;

export const arrowStyle = {
  border: "solid black",
  borderWidth: "0 3px 3px 0",
  display: "inline-block",
  padding: "3px",
};
