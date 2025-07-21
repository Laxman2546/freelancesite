import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Loader from "../components/Loader";
import FreelancerNavbar from "../components/FreelancerNavbar";
import ClientNavbar from "../components/ClientNavbar";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const Meesenger = () => {
  const [loading, setLoading] = useState(false);
  const [clientData, setclientData] = useState();
  const { user } = useAuth();
  const [SearchFreelancer, setSearchFreelancer] = useState("");
  return (
    <div className="w-full min-h-screen">
      {loading && <Loader />}

      {user?.role === "freelancer" ? (
        <FreelancerNavbar />
      ) : (
        <ClientNavbar isVisible={true} />
      )}
      <div className="w-full flex flex-row gap-14">
        <div className="w-1/3 min-h-screen flex flex-col border-1 border-[#d7d7d7] p-3 md:p-5">
          <div className="w-full flex flex-row items-center justify-between">
            <MagnifyingGlassIcon className="size-6 absolute left-8 text-gray-500" />
            <input
              type="text"
              placeholder="Search Freelancer"
              className="w-full p-2  pl-9 font-medium border-2 border-[#d7d7d7]  outline-none rounded-xl"
              onChange={(e) => setSearchFreelancer(e.target.value)}
              value={SearchFreelancer}
            />
          </div>
        </div>
        <div className="w-full flex flex-col">
          <h1>Lakshman</h1>
        </div>
      </div>
    </div>
  );
};

export default Meesenger;
