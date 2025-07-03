import { CheckIcon, TruckIcon } from "@heroicons/react/24/solid";
import React from "react";

const Pricing = ({ title, price, features, delivery }) => {
  return (
    <div>
      <div className="w-full flex flex-col gap-8">
        <div className="flex flex-row justify-between">
          <div className="max-w-3/2 pr-8">
            <h1 className="max-w-full text-wrap truncate text-md md:text-lg font-semibold ">
              {title}
            </h1>
          </div>
          <div>
            <h1 className="font-bold text-2xl">{price}</h1>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="font-semibold">Features</h1>
          <div className="flex flex-row gap-2">
            <CheckIcon width={"25px"} height={"25px"} color="	#3A5B22" />
            <h1>{features}</h1>
          </div>
          <div className="flex flex-row gap-2">
            <TruckIcon width={"25px"} height={"25px"} color="	#3A5B22" />
            <h1>{delivery}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
