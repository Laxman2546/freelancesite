import React, { useEffect, useRef, useState } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import freelancerCategories from "../utils/categories";
import { useNavigate } from "react-router-dom";

const Search = ({ isSearchvisible, showSearch, navBarSearch }) => {
  const [searchText, setSearchText] = useState("");
  const [Showsugessions, setShowsugessions] = useState(false);
  const [filterdSearch, setFilteredSearch] = useState([]);
  const suggestions = useRef();
  const Navigate = useNavigate();
  useEffect(() => {
    const handleCloseSuggestions = (event) => {
      if (suggestions.current && !suggestions.current.contains(event.target)) {
        setShowsugessions(false);
      }
    };
    document.addEventListener("mousedown", handleCloseSuggestions);
    return () =>
      document.removeEventListener("mousedown", handleCloseSuggestions);
  }, []);

  useEffect(() => {
    if (searchText.trim() === "") {
      setFilteredSearch([]);
    } else {
      const result = freelancerCategories.filter((e) =>
        e.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredSearch(result);
    }
  }, [searchText]);

  const searchNavigation = (suggest) => {
    Navigate(`/searchresults?query=${suggest}`);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      searchNavigation(searchText);
    }
  };
  
  return (
    <div>
      {navBarSearch ? (
        <div className="relative">
          {showSearch && (
            <input
              type="text"
              className="w-full p-3 pl-13 font-medium rounded-xl border-2 border-gray-400 pr-10 outline-none"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onClick={() => setShowsugessions(true)}
              onKeyDown={handleEnter}
              placeholder="Search for a Service"
            />
          )}

          {searchText.length === 0 ? (
            <MagnifyingGlassIcon
              className="size-7 absolute top-3 right-3 text-gray-700 z-10 cursor-pointer"
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
            className="w-full p-3 font-medium rounded-xl border-2 border-gray-400 pr-10 pl-5 outline-none"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onClick={() => {
              setShowsugessions(true);
            }}
            onKeyDown={handleEnter}
            placeholder="Search for a service"
          />

          {searchText.length === 0 ? (
            <MagnifyingGlassIcon
              className="size-7 absolute top-3 right-3 text-gray-700 z-10 cursor-pointer"
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

      {Showsugessions && searchText.length > 0 && (
        <div
          ref={suggestions}
          className="bg-white rounded-md w-full absolute flex flex-col z-[80] p-2 shadow-md transition-all duration-200 animate-fade-in"
        >
          {filterdSearch.slice(0, 5).map((suggest, index) => {
            const lowerCaseSuggest = suggest.toLowerCase();
            const lowerCaseSearch = searchText.toLowerCase();

            const startIndex = lowerCaseSuggest.indexOf(lowerCaseSearch);
            const endIndex = startIndex + lowerCaseSearch.length;

            let highlightedText;
            if (startIndex !== -1) {
              const before = suggest.slice(0, startIndex);
              const match = suggest.slice(startIndex, endIndex);
              const after = suggest.slice(endIndex);
              highlightedText = `${before}<span class="font-semibold">${match}</span>${after}`;
            } else {
              highlightedText = suggest;
            }

            return (
              <div key={index}>
                <h1
                  className={`p-3 hover:bg-gray-200 rounded-md cursor-pointer ${
                    navBarSearch ? "pl-12" : ""
                  } `}
                  onClick={() => {
                    setSearchText(suggest);
                    searchNavigation(suggest);
                    setShowsugessions(false);
                  }}
                  dangerouslySetInnerHTML={{ __html: highlightedText }}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Search;
