import { CheckCircleIcon } from "@heroicons/react/24/solid";
import React from "react";

const Steps = ({ steps, currentStep }) => {
  return (
    <div className="w-full flex justify-center items-center ">
      <div className="max-w-full flex flex-row justify-between items-center  w-full ml-0 md:ml-[200px]">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center w-full">
            <div className="flex flex-col items-center ">
              <div
                className={`w-10 h-10   rounded-full flex items-center justify-center text-white font-bold 
              ${index <= currentStep ? "bg-[#3A5B22]" : "bg-gray-300"}`}
              >
                {index <= currentStep - 1 ? (
                  <CheckCircleIcon className="size-6" />
                ) : (
                  index + 1
                )}
              </div>
              <span
                className={`text-md mt-1  ${
                  index <= currentStep ? "font-semibold" : "font-normal"
                } ${index <= currentStep - 1 ? "text-lime-900" : "text-black"}`}
              >
                {step}
              </span>
            </div>
            {index !== steps.length - 1 && (
              <div
                className={`flex-1 h-1 mx-2 mb-3 ${
                  index < currentStep ? "bg-[#3A5B22]" : "bg-gray-300"
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Steps;
