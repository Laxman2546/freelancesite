import React, { useState } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
const Search = ({ isSearchvisible, showSearch, navBarSearch }) => {
  const [searchText, setSearchText] = useState("");

  return (
    <div>
      {navBarSearch ? (
        <div className="relative">
          {showSearch && (
            <input
              type="text"
              className="w-[100%] md:min-w-full p-3 pl-8 font-semibold rounded-xl border-2 border-gray-400 pr-10  md:pr-10  outline-none"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
              placeholder="Search for a Service"
            />
          )}

          {searchText.length == 0 ? (
            <MagnifyingGlassIcon
              className="size-7 absolute top-3 right-3 text-gray-700 z-10"
              onClick={isSearchvisible}
            />
          ) : (
            <XMarkIcon
              className="size-6 absolute top-3 right-3 cursor-pointer text-gray-700 z-10"
              onClick={() => setSearchText("")}
            />
          )}
        </div>
      ) : (
        <div className="relative">
          <input
            type="text"
            className="w-[100%] md:min-w-full p-3 font-semibold rounded-xl border-2 border-gray-400 pr-0 md:pr-10 pl-3 outline-none"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            placeholder="Search for a service"
          />

          {searchText.length == 0 ? (
            <MagnifyingGlassIcon
              className="size-7 absolute top-3 right-3 text-gray-700 z-10"
              onClick={isSearchvisible}
            />
          ) : (
            <XMarkIcon
              className="size-6 absolute top-3 right-3 cursor-pointer text-gray-700 z-10"
              onClick={() => setSearchText("")}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
