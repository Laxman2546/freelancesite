import React from "react";

const Gigcards = ({ data }) => {
  return (
    <div className="max-w-[280px]  sm:w-[280px] bg-white border-1 border-gray-300 p-3 rounded-2xl shadow hover:shadow-lg transition duration-300 cursor-pointer overflow-hidden">
      <img
        src={
          `${process.env.REACT_APP_BACKEND_URI}/thumbnails/${data.thumbnail}` ||
          data.thumbnail
        }
        alt={data.title}
        className="w-full h-[180px] object-cover rounded-2xl"
      />
      <div className="p-4">
        <h2 className="text-base font-semibold text-gray-800 line-clamp-2">
          {data.title}
        </h2>
        <p className="text-sm text-gray-500 mt-1">{data.category}</p>
        <p className="text-sm text-lime-600 font-semibold mt-2">
          starting at {data.pricing.basic.price}
        </p>
      </div>
    </div>
  );
};

export default Gigcards;
