import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { TrashBinSharp } from "react-ionicons";
import trashIcon from "../assets/images/trash.png";
const PostedGigs = () => {
  const [gigs, setgigs] = useState([]);
  const [activeCard, setActiveCard] = useState(null);
  const [showmore, setShowmore] = useState(false);
  const moreMenuRefs = useRef({});
  const getGigs = async () => {
    const fetchGig = await axios.get(
      `${process.env.REACT_APP_BACKEND_URI}/gig/get`,
      { withCredentials: true }
    );
    if (!fetchGig) {
      console.log("error");
    }
    console.log(fetchGig.data.getGigs);
    setgigs(fetchGig.data.getGigs);
  };

  useEffect(() => {
    getGigs();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        activeCard !== null &&
        moreMenuRefs.current[activeCard] &&
        !moreMenuRefs.current[activeCard].contains(event.target)
      ) {
        setShowmore(false);
        setActiveCard(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeCard]);

  return (
    <main className="w-full h-full flex flex-col p-0 md:p-8">
      <div className="w-full text-center md:text-start">
        <h1 className="text-xl font-bold">Posted Gigs</h1>
      </div>
      <div className="w-full  px-4 py-8 flex flex-wrap  gap-6">
        {gigs.map((data, index) => (
          <div
            key={index}
            className="w-full sm:w-[300px] bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
          >
            <img
              src={`${process.env.REACT_APP_BACKEND_URI}/thumbnails/${data.thumbnail}`}
              alt={data.title}
              className="w-full h-[180px] object-cover"
            />
            <div className="w-full flex flex-row items-start justify-between">
              <div className="p-4 flex flex-col gap-2">
                <h1 className="text-lg font-semibold text-gray-800">
                  {data.title}
                </h1>
                <p className="text-sm text-gray-500">{data.category}</p>
                <div className="text-sm text-lime-700 font-semibold mt-2">
                  {data.pricing.basic.price} - {data.pricing.premium.price}
                </div>
              </div>
              <div
                className="pt-4 pr-2 relative"
                ref={(el) => (moreMenuRefs.current[index] = el)}
              >
                <EllipsisVerticalIcon
                  className="size-6 text-gray-600 hover:text-gray-800 cursor-pointer"
                  onClick={() => {
                    setShowmore(!showmore);
                    setActiveCard(activeCard === index ? null : index);
                  }}
                />

                {showmore && activeCard === index && (
                  <div className="absolute right-3 mt-2 w-32 bg-white rounded-lg shadow-xl border border-gray-300 z-10 p-2">
                    <div className="flex flex-row items-center hover:bg-[#d7d7d7] rounded-lg hover:text-black pl-2">
                      <PencilSquareIcon className="w-[35px] h-[30px]" />
                      <button className="w-full text-sm text-gray-700 hover:text-black px-4 py-2 text-left transition">
                        Edit
                      </button>
                    </div>
                    <hr className="border-t border-gray-200 my-1" />
                    <div className="flex flex-row items-center text-center hover:bg-[#d7d7d7] font-medium rounded-lg hover:text-black pl-2">
                      <img src={trashIcon} className="w-[20px] h-[20px]" />
                      <button className="w-full text-sm  text-[#F85959] font-medium px-4 py-2 transition text-center">
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default PostedGigs;
