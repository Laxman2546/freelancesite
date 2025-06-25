import React from "react";
import FreelancerNavbar from "../components/FreelancerNavbar";
import empty from "../assets/images/empty.svg";
const Orders = () => {
  return (
    <main>
      <FreelancerNavbar />
      <div className="w-full flex  items-center justify-center flex-col">
        <img src={empty} className="w-[380px] h-[380px]" />
        <h1 className="text-xl font-semibold text-black">No orders yet!</h1>
      </div>
    </main>
  );
};

export default Orders;
