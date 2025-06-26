import React from "react";
import { Commet } from "react-loading-indicators";

const Loader = () => {
  return (
    <div className="w-full h-screen bg-[#F4F2EE] realtive flex items-center justify-center">
      <div className="absolute top-50">
        <Commet
          color="#3A5B22"
          size="medium"
          text="Loading..."
          textColor="#000"
        />
      </div>
    </div>
  );
};

export default Loader;
