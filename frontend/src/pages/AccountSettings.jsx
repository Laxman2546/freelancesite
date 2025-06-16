import React from "react";
import FreelancerNavbar from "../components/FreelancerNavbar";
import { TrashIcon } from "@heroicons/react/24/solid";
import DeleteAccount from "../components/DeleteAccount";

const AccountSettings = () => {
  return (
    <main className="w-full h-full relative">
      <FreelancerNavbar />
      <div className=" p-2 md:p-10 w-full">
        <div className="w-full  bg-[#F4F2EE]  rounded-2xl flex flex-col md:flex-row gap-10 items-center p-10 ">
          <div className=" w-full flex flex-col gap-3">
            <h1 className="font-bold text-xl">Delete freelance Account</h1>
            <h1>
              Permanently remove your Freelance account and all of its
              information from the gig connect platform.
              <br />
              This action is not reversible so please continue with caution
            </h1>
          </div>
          <div className="w-full md:w-[250px] p-1 rounded-3xl gap-2 h-[60px] flex flex-row items-center justify-center bg-red-500 cursor-pointer">
            <h1 className="font-medium text-white text-sm">
              Delete my Account
            </h1>
            <TrashIcon className="size-4 text-white" />
          </div>
        </div>
      </div>
      <div className="w-full min-h-full md:h-screen flex justify-center items-center bg-[#00000080] absolute top-0  left-0 z-50">
        <DeleteAccount />
      </div>
    </main>
  );
};

export default AccountSettings;
