import React, { useEffect, useState } from "react";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { BellIcon } from "@heroicons/react/24/outline";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import GooeyNav from "./GooeyNav";
import { userLogout } from "../utils/userLogout";
import { useNavigate } from "react-router-dom";
import Errors from "./Errors";
const FreelancerNavbar = () => {
  const Navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isMessageOpen, setMessageIsOpen] = useState(false);
  const [isnotificationopen, setNotifcationopne] = useState(false);
  const [notifications, setnotifications] = useState([]);
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
        <div>
          <h1 className="text-2xl font-bold">GigConnect</h1>
        </div>
        <div className="w-full flex items-center justify-center">
          <ul className="flex flex-row gap-5">
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
        <div className="flex items-center justify-end">
          <ul className="flex flex-row gap-5">
            <li className="cursor-pointer">
              <EnvelopeIcon className="size-6" />
              {isMessageOpen && (
                <div className="absolute right-0 top-8 z-20 bg-white rounded-lg shadow-lg border w-48 animate-fade-in">
                  <ul className="flex flex-col py-2">
                    <li className="hover:bg-gray-100 px-4 py-2 rounded-t transition-colors cursor-pointer">
                      <span className="font-medium">Profile</span>
                      <div className="text-xs text-gray-500">
                        View your profile
                      </div>
                    </li>
                    <li className="hover:bg-gray-100 px-4 py-2 transition-colors cursor-pointer">
                      <span className="font-medium">Edit profile</span>
                      <div className="text-xs text-gray-500">
                        Edit your Details
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
            <li className="cursor-pointer">
              <BellIcon
                className="size-6"
                onClick={() => setNotifcationopne(!isnotificationopen)}
              />
              {isnotificationopen && (
                <div className="absolute right-20 top-20 z-20 bg-white rounded-lg shadow-lg border w-48 animate-fade-in">
                  {notifications.length < 1 ? (
                    <div className="flex items-center justify-center ">
                      <h1>no new notifications</h1>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
              )}
            </li>
            <li className="cursor-pointer relative">
              <UserCircleIcon
                className="size-6"
                onClick={() => setIsOpen(!isOpen)}
              />
              {isOpen && (
                <div className="absolute right-0 top-8 z-20 bg-white rounded-lg shadow-lg border w-48 animate-fade-in">
                  <ul className="flex flex-col py-2">
                    <li className="hover:bg-gray-100 px-4 py-2 rounded-t transition-colors cursor-pointer">
                      <span className="font-medium">Profile</span>
                      <div className="text-xs text-gray-500">
                        View your profile
                      </div>
                    </li>
                    <li className="hover:bg-gray-100 px-4 py-2 transition-colors cursor-pointer">
                      <span className="font-medium">Edit profile</span>
                      <div className="text-xs text-gray-500">
                        Edit your Details
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
