import React, { useEffect, useState } from "react";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { Fade as Hamburger } from "hamburger-react";
import { BellIcon } from "@heroicons/react/24/outline";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import GooeyNav from "./GooeyNav";
import { userLogout } from "../utils/userLogout";
import { useNavigate } from "react-router-dom";
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
  return (
    <header className="w-full h-full flex flex-col">
      <Errors
        errorText={error}
        isError={isError}
        errorStyles={"absolute top-25"}
      />
      <nav className="w-full p-8 flex items-center justify-between">
        <div className="flex items-center mr-[30px] md:hidden">
          <Hamburger />
        </div>
        <div
          className="mx-auto md:mx-0"
          onClick={() => {
            setMessageIsOpen(false);
            setNotifcationopen(false);
            setIsOpen(false);
          }}
        >
          <h1 className="text-2xl font-bold">GigConnect</h1>
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
            <li className="cursor-pointer">
              <EnvelopeIcon
                className="size-6"
                onClick={() => {
                  setMessageIsOpen(!isMessageOpen);
                  setNotifcationopen(false);
                  setIsOpen(false);
                }}
              />
              {isMessageOpen && (
                <div className="absolute right-25 top-18 z-20 bg-white rounded-lg shadow-lg border w-80 animate-fade-in">
                  {messages.length < 1 ? (
                    <div className="flex flex-col items-center justify-center p-8 ">
                      <img src={noMessages} />
                      <h1 className="text-center font-medium w-full">
                        no new Messages
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
                            className="flex gap-3 items-start px-4 py-3 hover:bg-green-50 cursor-pointer"
                            onClick={() => navigate(`/messages/${msg.chatId}`)}
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
                        onClick={() => navigate("/messages")}
                      >
                        See All Messages
                      </div>
                    </div>
                  )}
                </div>
              )}
            </li>
            <li className="cursor-pointer">
              <BellIcon
                className="size-6"
                onClick={() => {
                  setIsOpen(false);
                  setMessageIsOpen(false);
                  setNotifcationopen(!isnotificationopen);
                }}
              />
              {isnotificationopen && (
                <div className="notifications absolute right-18 top-20 z-20 bg-white rounded-lg shadow-lg border w-78 max-h-96 overflow-scroll animate-fade-in">
                  {notifications.length < 1 ? (
                    <div className="flex flex-col items-center justify-center p-8">
                      <img src={noNotifications} />
                      <h1 className="text-center font-medium w-full">
                        no new notifications
                      </h1>
                    </div>
                  ) : (
                    <div>
                      {notifications.map((note) => (
                        <div
                          key={note.id}
                          className={`p-3 border-b ${
                            note.isRead ? "bg-white" : "bg-green-50"
                          }`}
                        >
                          <h4 className="font-semibold">{note.title}</h4>
                          <p className="text-sm text-gray-600 ">
                            {note.content}
                          </p>
                          <span className="text-xs text-gray-400">
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
                className="size-6"
                onClick={() => {
                  setIsOpen(!isOpen);
                  setMessageIsOpen(false);
                  setNotifcationopen(false);
                }}
              />
              {isOpen && (
                <div className="absolute right-0 top-8 z-20 bg-white rounded-lg shadow-lg border w-48 animate-fade-in">
                  <ul className="flex flex-col py-2">
                    <li className="hover:bg-gray-100 px-4 py-2 rounded-t transition-colors cursor-pointer">
                      <span className="font-medium">Profile</span>
                      <div className="text-xs text-gray-500">
                        View and update your profile
                      </div>
                    </li>
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
        .animate-fade-in {
          animation: fade-in 0.2s ease;
        }
      `}</style>
    </header>
  );
};

export default FreelancerNavbar;

// Remove invalid StyleSheet usage; use this object for inline styles if needed
export const arrowStyle = {
  border: "solid black",
  borderWidth: "0 3px 3px 0",
  display: "inline-block",
  padding: "3px",
};
