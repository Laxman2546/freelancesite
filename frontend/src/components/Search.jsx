import React, { useState } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
const Search = () => {
  const [searchText, setSearchText] = useState("");
  return (
    <div>
      <input
        type="text"
        className="min-w-full p-2 rounded-xl border-2 border-gray-400 pr-16 pl-3 outline-none"
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
      />
      {searchText.length == 0 ? (
        <MagnifyingGlassIcon className="size-7 absolute top-2 right-3" />
      ) : (
        <XMarkIcon
          className="size-7 absolute top-2 right-3 cursor-pointer"
          onClick={() => setSearchText("")}
        />
      )}
    </div>
  );
};

export default Search;
