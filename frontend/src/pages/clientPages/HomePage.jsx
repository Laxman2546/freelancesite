import React from "react";
import ClientNavbar from "../../components/clientNavbar";
const HomePage = () => {
  return (
    <main className="w-full min-h-screen">
      <ClientNavbar />
      <div className="w-full p-3 md:p-8">
        <div className="w-full flex flex-row ">
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
            <div>
              
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
