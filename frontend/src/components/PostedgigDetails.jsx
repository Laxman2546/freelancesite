import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "./Loader";
const PostedgigDetails = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const getId = () => {
    const search = new URLSearchParams(location.search);
    const id = search.get("gigid");
    console.log(id);
    return id;
  };
  const getGigs = async () => {
    setLoading(true);
    try {
      const gigId = getId();
      const fetchGig = await axios.post(
        `${process.env.REACT_APP_BACKEND_URI}/gig/getone`,
        { gigId },
        { withCredentials: true }
      );
      const gigData = fetchGig.data.gig;
      setData(gigData);
    } catch (e) {
      console.log(e, "something went wrong with the getgigs");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getGigs();
  }, []);
  return (
    <div>
      {loading && <Loader />}
      <h1>hello</h1>
    </div>
  );
};

export default PostedgigDetails;
