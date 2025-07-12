import React, { useState } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
const Search = () => {
  const [searchText, setSearchText] = useState("");
  return (
    <div>
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
        <MagnifyingGlassIcon className="size-7 absolute top-3 right-3" />
      ) : (
        <XMarkIcon
          className="size-6 absolute top-3 right-3 cursor-pointer"
          onClick={() => setSearchText("")}
        />
      )}
    </div>
  );
};

export default Search;
