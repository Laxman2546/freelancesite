import React, { useEffect, useState } from "react";
import FreelancerNavbar from "../components/FreelancerNavbar";
import empty from "../assets/images/empty.svg";
import Errors from "../components/Errors";
const Orders = () => {
  const [showError, setshowError] = useState(false);
  const [error, setError] = useState(
    "something went wrong while fetching orders"
  );

  useEffect(() => {
    if (!showError) return;
    const timer = setTimeout(() => {
      setshowError(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [showError, error]);
  return (
    <main>
      <FreelancerNavbar />
      <Errors
        isError={showError}
        errorText={error}
        errorStyles={`absoulte top-25`}
      />
      <div className="w-full flex  items-center justify-center flex-col">
        <img src={empty} className="w-[380px] h-[380px]" />
        <h1 className="text-xl font-semibold text-black">No orders yet!</h1>
      </div>
    </main>
  );
};

export default Orders;
