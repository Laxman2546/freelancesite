import React from "react";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { BellIcon } from "@heroicons/react/24/outline";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { themeColors } from "../hooks/theme";
const FreelancerNavbar = () => {
  return (
    <header className="w-full h-full  flex flex-col">
      <nav className="w-full p-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">GigConnect</h1>
        </div>
        <div className="w-full flex items-center justify-center">
          <ul className="flex flex-row gap-5">
            <li className="cursor-pointer hover:text-[#3A5B22] font-medium">
              My Services
            </li>
            <li className="cursor-pointer hover:text-[#3A5B22] font-medium">
              Posted a Services
            </li>
            <li className="cursor-pointer hover:text-[#3A5B22] font-medium">
              Orders
            </li>
          </ul>
        </div>
        <div className=" flex items-center justify-end">
          <ul className="flex flex-row gap-5">
            <li className="cursor-pointer">
              <EnvelopeIcon className="size-6" />
            </li>
            <li className="cursor-pointer">
              <BellIcon className="size-6" />
            </li>
            <li className="cursor-pointer">
              <UserCircleIcon className="size-6" />
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default FreelancerNavbar;
