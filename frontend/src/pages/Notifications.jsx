import React from "react";
import notications from "../assets/images/download.svg";
import { useAuth } from "../hooks/useAuth";
import FreelancerNavbar from "../components/FreelancerNavbar";
import ClientNavbar from "../components/ClientNavbar";
const Notifications = () => {
  const { user } = useAuth();
  return (
    <div>
      {user?.role === "freelancer" ? <FreelancerNavbar /> : <ClientNavbar />}
      <div className="w-full  flex  flex-col items-center justify-center ">
        <img
          src={notications}
          className="w-[250px] h-[250px]"
          alt="No notifications"
        />
        <p className="text-xl font-medium">no new notications</p>
      </div>
    </div>
  );
};

export default Notifications;
