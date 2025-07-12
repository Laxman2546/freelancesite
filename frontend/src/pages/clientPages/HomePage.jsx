import React, { useState } from "react";
import ClientNavbar from "../../components/clientNavbar";
import Search from "../../components/Search";
import FreelancerImg from "../../assets/images/landing2.webp";
const HomePage = () => {
  const [activeBtn, setactivebtn] = useState("");
  return (
    <main className="w-full min-h-screen">
      <ClientNavbar />
      <div className="w-full p-3 md:p-8">
        <div className="w-full flex flex-row gap-5">
          <div className="w-2/4  flex flex-col gap-3">
            <h1 className="text-6xl font-semibold leading-18">
              Find the right
              <br />
              <span className="text-lime-800">freelancer</span>
              &nbsp;for
              <br /> anything.
            </h1>
            <div>
              <h1 className="text-xl font-medium">
                Connect with skilled professionals who can bring your projects
                to life
              </h1>
            </div>
            <div className="relative max-w-full">
              <Search />
            </div>
            <div className="flex flex-row gap-4">
              <button
                onClick={() => {
                  setactivebtn("Web Development");
                }}
                className={`p-2 pl-4 pr-4 border-1 text-md text-nowrap border-lime-700 rounded-3xl   ${
                  activeBtn === "Web Development"
                    ? "bg-lime-700  text-white"
                    : "bg-white "
                }`}
              >
                Web Development
              </button>
              <button
                onClick={() => {
                  setactivebtn("Logodesign");
                }}
                className={`p-2 pl-4 pr-4  text-md border-1  text-nowrap border-lime-700 rounded-3xl  ${
                  activeBtn === "Logodesign"
                    ? "bg-lime-700  text-white"
                    : "bg-white "
                }`}
              >
                Logodesign
              </button>
              <button
                onClick={() => {
                  setactivebtn("DataAnalysis");
                }}
                className={`p-2 pl-4 pr-4  text-md border-1 text-nowrap border-lime-700 rounded-3xl  ${
                  activeBtn === "DataAnalysis"
                    ? "bg-lime-700  text-white"
                    : "bg-white "
                }`}
              >
                DataAnalysis
              </button>
              <button
                onClick={() => {
                  setactivebtn("Data Entry");
                }}
                className={`p-1 pl-4 pr-4  text-md border-1 text-nowrap border-lime-700 rounded-3xl  ${
                  activeBtn === "Data Entry"
                    ? "bg-lime-700  text-white"
                    : "bg-white "
                }`}
              >
                Data Entry
              </button>
            </div>
          </div>
          <div className="hidden w-full md:flex items-center justify-center ">
            <img
              src="https://storage.googleapis.com/uxpilot-auth.appspot.com/e47dcc6cf7-e3e0eab7ebcb1bbd5879.png"
              className=" max-h-[400px] w-[600px] object-cover rounded-3xl"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
