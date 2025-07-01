import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import FreelancerNavbar from "./FreelancerNavbar";
import { Cart, TimeSharp } from "react-ionicons";
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
    <div className="w-full min-h-screen">
      {loading && <Loader />}
      <FreelancerNavbar />
      <div className="w-full min-h-screen flex flex-col gap-5 bg-[#F4F2EE] p-2 md:p-8 ">
        <div className="w-full h-full   flex flex-row  gap-3 items-center">
          <div className="p-2 pl-4 pr-4 bg-[#C0E6FB] text-[#36ADF2] rounded-3xl text-center">
            <span className="font-semibold text-sm md:text-md">Active</span>
          </div>
          <div className="p-2 pl-2 pr-2 sm:pl-4 sm:pr-4 bg-[#CDEBC1] overflow-hidden text-[#294018] rounded-3xl text-center text-nowrap">
            <span className="font-semibold text-sm md:text-md">
              {data.category}
            </span>
          </div>
        </div>
        <div className="mt-2 w-full md:max-w-2/3">
          <h1 className=" text-2xl md:text-3xl font-semibold ">{data.title}</h1>
        </div>
        <div className="w-full flex flex-row">
          <div className="w-full flex flex-row gap-2 items-center">
            <Cart width={"18px"} height={"18px"} />
            <span className="text-md  text-gray-600">250 orders in queue</span>
          </div>
          <div className="w-full flex flex-row gap-2 items-center">
            <TimeSharp width={"18px"} height={"18px"} />
            <span className="text-md  text-gray-600">Last updated</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostedgigDetails;
