import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Loader from "../components/Loader";
import FreelancerNavbar from "../components/FreelancerNavbar";
import ClientNavbar from "../components/ClientNavbar";

const Meesenger = () => {
  const [loading, setLoading] = useState(false);
  const [clientData, setclientData] = useState();
  const { user } = useAuth();

  return (
    <div className="w-full min-h-screen">
      {loading && <Loader />}

      {user?.role === "freelancer" ? (
        <FreelancerNavbar />
      ) : (
        <ClientNavbar isVisible={true} />
      )}

      <h1>Hello from messages</h1>
    </div>
  );
};

export default Meesenger;
