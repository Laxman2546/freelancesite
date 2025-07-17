import React, { useEffect, useState } from "react";
import ClientNavbar from "../../components/ClientNavbar";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import Gigcards from "../../components/Gigcards.jsx";
import Loader from "../../components/Loader.jsx";
import Nosearch from "../../assets/images/nosearch.svg";
import axios from "axios";
const SearchResults = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [notFound, setnotFound] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (query === "") {
      navigate("/userhome");
    }
  }, [query, navigate]);

  useEffect(() => {
    fetchSearch();
  }, [query]);

  const fetchSearch = async () => {
    setLoading(true);
    setnotFound(false);
    try {
      const gigResult = await axios.post(
        `${process.env.REACT_APP_BACKEND_URI}/gig/search`,
        { searchQuery: query },
        { withCredentials: true }
      );
      setData(gigResult.data.gigs);
    } catch (e) {
      console.log("something went wrong whiler searching", e);
      setnotFound(true);
    } finally {
      setLoading(false);
    }
  };

  const handelGigDetails = (gigId) => {
    const url = `/postdetails?gigid=${gigId}`;
    navigate(url);
  };

  return (
    <div className="w-full min-h-screen">
      <ClientNavbar isVisible={true} />
      {loading ? (
        <Loader />
      ) : (
        <div className="p-3 md:p-8 flex flex-col">
          {notFound ? (
            <div className="flex flex-col items-center mt-8">
              <img src={Nosearch} className="w-[500px] md:w-[500px]" />
              <h1 className="font-semibold text-lg pl-2 md:pl-0 md:text-2xl mt-5">
                No Gigs found for {query}
              </h1>
            </div>
          ) : (
            <div>
              <div>
                <h1>
                  Search Results for{" "}
                  <span className="font-semibold">"{query}"</span>
                </h1>
              </div>
              <div className="flex flex-row flex-wrap gap-3 mt-5">
                {data.map((data, index) => (
                  <div key={index} onClick={() => handelGigDetails(data._id)}>
                    <Gigcards data={data} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
