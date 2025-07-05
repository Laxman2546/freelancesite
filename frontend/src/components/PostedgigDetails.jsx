import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import FreelancerNavbar from "./FreelancerNavbar";
import { Cart, Star, TimeSharp, Eye, PencilSharp } from "react-ionicons";
import { PaperAirplaneIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import Pricing from "../components/Pricing";
const PostedgigDetails = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isActivePrice, setActivePrice] = useState("Basic");
  const [creatordata, setcreatorData] = useState("");
  const location = useLocation();
  const navigation = useNavigate();
  const getId = () => {
    const search = new URLSearchParams(location.search);
    const id = search.get("gigid");
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
      getUser(gigData.userId);
      console.log(gigData);
    } catch (e) {
      console.log(e, "something went wrong with the getgigs");
    } finally {
      setLoading(false);
    }
  };

  const getUser = async (userId) => {
    setLoading(true);

    if (!userId) {
      console.error("User ID is missing");
      setLoading(false);
      return;
    }
    try {
      const fetchUser = await axios.post(
        `${process.env.REACT_APP_BACKEND_URI}/profile/creator`,
        { userId },
        { withCredentials: true }
      );
      const userData = fetchUser.data;
      setcreatorData(userData);
      console.log(fetchUser.data);
    } catch (e) {
      console.error("Something went wrong with getUser:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getGigs();
  }, []);
  const countDays = (date) => {
    const givenDate = new Date(date);
    const now = new Date();

    const timeDiffMs = now - givenDate;

    const seconds = Math.floor((timeDiffMs / 1000) % 60);
    const minutes = Math.floor((timeDiffMs / (1000 * 60)) % 60);
    const hours = Math.floor((timeDiffMs / (1000 * 60 * 60)) % 24);
    const days = Math.floor(timeDiffMs / (1000 * 60 * 60 * 24));

    if (seconds < 60 && minutes < 1) {
      return `updated ${seconds} Second${seconds !== 1 ? "s" : ""} ago`;
    } else if (minutes < 60 && hours < 1) {
      return `updated ${minutes} Minute${minutes !== 1 ? "s" : ""} ago`;
    } else if (hours < 24 && days < 1) {
      return `updated ${hours} Hour${hours !== 1 ? "s" : ""} ago`;
    }
    return `updated ${days} Day${days !== 1 ? "s" : ""} ago`;
  };
  const handleEdit = () => {
    navigation(`/gigupdate?gigid=${getId()}`);
  };
  return (
    <div className="w-full min-h-screen">
      {loading && <Loader />}
      <FreelancerNavbar />
      <div className="w-full min-h-screen flex flex-col  bg-[#F4F2EE] p-2 md:p-8 ">
        <div className="w-full flex flex-row justify-between pr-5">
          <div className="flex flex-col  gap-5">
            <div className="w-full h-full   flex flex-row  gap-3 items-center overflow-hidden">
              <div className=" hidden md:block p-2 pl-4 pr-4 bg-[#C0E6FB] text-[#36ADF2] rounded-3xl text-center">
                <span className="font-semibold text-sm md:text-md">Active</span>
              </div>
              <div className=" p-2 pl-2 pr-2 sm:pl-4 sm:pr-4 bg-[#CDEBC1]  text-[#294018] rounded-3xl text-center text-nowrap">
                <span className="font-semibold text-sm md:text-md">
                  {data.category}
                </span>
              </div>
            </div>
            <div className="mt-2  md:max-w-3/2">
              <h1 className=" text-2xl md:text-3xl font-semibold ">
                {data.title}
              </h1>
            </div>
            <div className="w-full flex flex-col md:flex-row gap-5">
              <div className=" flex flex-row   gap-1 items-center">
                <div className="flex flex-row items-start mb-1">
                  <Star width={"18px"} height={"19px"} color={"#ffc550"} />
                  <Star width={"18px"} height={"19px"} color={"#ffc550"} />
                  <Star width={"18px"} height={"19px"} color={"#ffc550"} />
                  <Star width={"18px"} height={"19px"} color={"#ffc550"} />
                  <Star width={"18px"} height={"19px"} color={"#ffc550"} />
                </div>
                <span className="text-md  text-gray-600">
                  4.8 (
                  <span className="underline cursor-pointer">127 reviews</span>)
                </span>
              </div>
              <div className=" hidden md:flex flex-row gap-1 items-center">
                <Eye width={"18px"} height={"18px"} />
                <span className="text-md  text-gray-600">2,425 views</span>
              </div>
              <div className=" hidden md:flex flex-row gap-1 items-center">
                <Cart width={"18px"} height={"18px"} />
                <span className="text-md  text-gray-600">
                  250 orders in queue
                </span>
              </div>
              <div className=" flex flex-row gap-1 items-center">
                <TimeSharp width={"18px"} height={"18px"} />
                <span className="text-md text-gray-600">
                  {countDays(data.updatedAt)}
                </span>
              </div>
            </div>
          </div>

          <div className="hidden md:block ">
            <button
              className="p-3 bg-lime-800 text-white rounded-xl flex flex-row gap-2 cursor-pointer  active:scale-95"
              onClick={() => handleEdit()}
            >
              <PencilSquareIcon className="size-6" />
              EditGig
            </button>
          </div>
        </div>
        <div className="w-full mt-8  flex flex-col md:flex-row gap-4 justify-between">
          <div className="w-full md:w-2/3 flex flex-col bg-white ">
            <div>
              <img
                src={`${process.env.REACT_APP_BACKEND_URI}/thumbnails/${data.thumbnail}`}
                alt={data.title}
                className=" object-cover rounded-2xl"
              />
            </div>
            <div className="flex flex-col gap-2 mt-8 pl-5">
              <div className="flex flex-row gap-2 ">
                <div>
                  <img
                    className="w-[35px] h-[35px] object-center"
                    src={`${process.env.REACT_APP_BACKEND_URI}/profilePics/${creatordata?.profile?.profilePic}`}
                  />
                </div>
                <div className="flex flex-col cursor-pointer">
                  <h1 className="text-xl font-semibold">
                    {creatordata?.fetchUser?.userName || "fetchingname..."}
                  </h1>
                  <h1 className="text-sm text-gray-400 font-normal">
                    {creatordata?.profile?.job || "Loading..."}
                  </h1>
                </div>
              </div>
            </div>
            <div className="flex flex-col mt-8 p-5 gap-5">
              <h1 className="text-xl md:text-2xl font-semibold">
                About this Gig
              </h1>
              <h1>{data.description} </h1>
            </div>
            <div className="flex flex-col mt-3 p-5 gap-5">
              <div className="flex ">
                <h1 className="text-xl font-semibold">
                  Customer Reviews (150)
                </h1>
              </div>
              <div className="flex flex-col pl-1 md:pl-8 gap-5">
                <div className=" flex flex-row items-center gap-3">
                  <div>
                    <img
                      className="w-[50px] h-[50px] rounded-full"
                      src={`${process.env.REACT_APP_BACKEND_URI}/thumbnails/${data.thumbnail}`}
                    />
                  </div>
                  <div>
                    <h1 className="text-lg font-medium">Sarah Jhon</h1>
                    <h1 className="text-gray-400 text-sm font-normal">
                      2 days ago
                    </h1>
                  </div>
                </div>
                <div className="pl-3 md:pl-15">
                  <h1>
                    Absolutely amazing work! The designer understood exactly
                    what I was looking for and delivered a logo that perfectly
                    represents my brand. Fast delivery and excellent
                    communication throughout the process.
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 max-w-[700px] h-auto max-h-[500px] md:sticky top-5 flex flex-col bg-white rounded-2xl p-2 md:p-6">
            <div className="w-full flex flex-row justify-between mt-3 border-b-2 border-gray-300">
              <div
                className={`font-semibold cursor-pointer  ${
                  isActivePrice === "Basic"
                    ? "text-lime-800 border-b-3"
                    : "text-black"
                }`}
                onClick={() => setActivePrice("Basic")}
              >
                Basic
              </div>
              <div
                className={`font-semibold cursor-pointer ${
                  isActivePrice === "Standard"
                    ? "text-lime-800 border-b-3"
                    : "text-black"
                }`}
                onClick={() => setActivePrice("Standard")}
              >
                Standard
              </div>
              <div
                className={`font-semibold cursor-pointer ${
                  isActivePrice === "Premium"
                    ? "text-lime-800 border-b-3"
                    : "text-black"
                }`}
                onClick={() => setActivePrice("Premium")}
              >
                Premium
              </div>
            </div>
            <div className="mt-5">
              {data?.pricing?.basic ? (
                <Pricing
                  title={data.pricing[isActivePrice.toLowerCase()].priceTitle}
                  price={data.pricing[isActivePrice.toLowerCase()].price}
                  features={
                    data.pricing[isActivePrice.toLowerCase()].priceFeatures
                  }
                  delivery={
                    data.pricing[isActivePrice.toLowerCase()].deliveryTime
                  }
                />
              ) : (
                <p>Loading price info...</p>
              )}
            </div>
            <div className=" flex flex-row items-end h-auto mt-5 md:h-full   text-center">
              <button className="w-full mb-5 rounded-2xl flex flex-row items-center justify-center gap-3  p-3 bg-lime-700 text-white active:scale-95 cursor-pointer">
                Contact me
                <PaperAirplaneIcon className="size-5 text-white -rotate-50" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostedgigDetails;
