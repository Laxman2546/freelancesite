import React from "react";

const Pricing = ({ title, price }) => {
  return (
    <div>
      <div className="flex flex-row justify-between">
        <div className="max-w-3/4 bg-amber-400">
          <h1 className="w-full text-wrap overflow-ellipsis font-semibold">
            {title}ssssssssssssssssssssssssssssss
          </h1>
        </div>
        <div>
          <h1 className="font-bold">{price}</h1>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
