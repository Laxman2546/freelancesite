import axios from "axios";
import React, { use, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import FreelancerNavbar from "./FreelancerNavbar";
import { Cart, Star, TimeSharp, Eye, PencilSharp } from "react-ionicons";
import { PaperAirplaneIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import Pricing from "../components/Pricing";
import Success from "../assets/images/Success.gif";
import ClientNavbar from "./ClientNavbar";
const PostedgigDetails = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isActivePrice, setActivePrice] = useState("Basic");
  const [creatordata, setcreatorData] = useState([]);
  const [clientData, setclientData] = useState();
  const [showOrder, setShowOrder] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [isOrder, setisOrder] = useState([]);
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

  const getUserid = () => {
    const searchUserId = new URLSearchParams(location.search);
    const userId = searchUserId.get("userid");
    console.log(userId);
    return userId;
  };

  const getClientDet = async () => {
    const userId = getUserid();
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
      const userData = fetchUser?.data;
      setclientData(userData);
    } catch (e) {
      console.error("Something went wrong with getUser:", e);
    } finally {
      setLoading(false);
    }
  };

  const handlePlaceOrder = async () => {
    handleOrder();
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
      const userData = fetchUser?.data;
      setcreatorData(userData);
    } catch (e) {
      console.error("Something went wrong with getUser:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleOrder = async () => {
    setShowOrder(false);
    setShowConfirmation(true);
    try {
      const gigId = getId();
      const freelancerId = creatordata?.fetchUser?.userId;
      const placeOrder = await axios.post(
        `${process.env.REACT_APP_BACKEND_URI}/orders`,
        { gigId, freelancerId },
        { withCredentials: true }
      );
      console.log(placeOrder);
    } catch (e) {
      console.log("something went wrong while plcing order", e);
    }
  };

  useEffect(() => {
    getGigs();
    getClientDet();
    clientOrder();
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

  const handlefreelanceProfile = () => {
    navigation(`/profile?id=${creatordata?.fetchUser?.userId}`);
  };
  const handleContact = (userId) => {
    navigation(`/messages?id=${userId}`);
  };

  const handleOrders = () => {
    setShowOrder(true);
  };

  useEffect(() => {
    if (showConfirmation) {
      const timer = setTimeout(() => {
        setShowConfirmation(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showConfirmation]);

  useEffect(() => {
    const messageTimer = setTimeout(() => {
      setShowMessage(true);
    }, 3000);

    return () => clearTimeout(messageTimer);
  }, [showConfirmation]);

  const clientOrder = async () => {
    try {
      setLoading(true);
      const clientOrders = await axios.post(
        `${process.env.REACT_APP_BACKEND_URI}/orders/clientorder`,
        { gigId: getId() },
        { withCredentials: true }
      );
      console.log("this i sclient orders", clientOrders);
      setisOrder(clientOrders.data.getOrders);
    } catch (e) {
      console.log("this i sckient order error", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen">
      {loading && <Loader />}

      {clientData?.fetchUser?.role === "freelancer" ? (
        <FreelancerNavbar />
      ) : (
        <ClientNavbar isVisible={true} />
      )}

      {showConfirmation && (
        <div className="w-full min-h-full md:h-screen flex justify-center items-center bg-black/60 fixed top-0 left-0 z-50 p-5 ">
          <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-xl">
            <img
              src={Success}
              alt="Success"
              className="w-[150px] h-[150px] mx-auto"
            />
            {showMessage && (
              <p className="text-lg font-medium mx-auto text-center">
                Your order has been successfully placed
              </p>
            )}
          </div>
        </div>
      )}

      {showOrder && (
        <div>
          <div className="w-full min-h-full md:h-screen flex justify-center items-center bg-black/60 fixed top-0 left-0 z-50 p-5 ">
            <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-xl">
              <p className="text-xl font-bold text-gray-800 mb-4">
                Confirm Your Order
              </p>

              <div className="border  rounded-xl p-4 mb-6">
                <h2 className="text-lg font-semibold text-lime-700 mb-2">
                  {data.pricing[isActivePrice.toLowerCase()].priceTitle}
                </h2>
                <p className="text-sm text-gray-600 mb-1">
                  Price: {data.pricing[isActivePrice.toLowerCase()].price}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  Delivery Time:
                  {data.pricing[isActivePrice.toLowerCase()].deliveryTime} days
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  Features:&nbsp;
                  {data.pricing[isActivePrice.toLowerCase()].priceFeatures} days
                </p>
              </div>

              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowOrder(false)}
                  className="px-4 py-2 rounded-lg border border-gray-400 text-gray-700 hover:bg-gray-100 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handlePlaceOrder()}
                  className="px-4 py-2 rounded-lg bg-lime-700 text-white hover:bg-lime-800 transition text-sm md:text-md cursor-pointer"
                >
                  Confirm Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
            <div className="mt-2  md:max-w-3/4">
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
          {clientData?.fetchUser?.role === "freelancer" &&
            clientData?.fetchUser?.userId === data?.userId && (
              <div className="hidden md:block">
                <button
                  className="p-3 bg-lime-800 text-white rounded-xl flex flex-row gap-2 cursor-pointer active:scale-95"
                  onClick={() => handleEdit()}
                >
                  <PencilSquareIcon className="size-6" /> EditGig
                </button>
              </div>
            )}
        </div>
        <div className="w-full mt-8  flex flex-col md:flex-row gap-4 justify-between">
          <div className="w-full md:w-2/3 flex flex-col bg-white ">
            <div>
              <img
                src={`${process.env.REACT_APP_BACKEND_URI}/thumbnails/${data.thumbnail}`}
                alt={data.title}
                className="max-h-[450px] min-w-full object-cover rounded-2xl"
              />
            </div>
            <div
              className="flex flex-col gap-2 mt-8 pl-5 "
              onClick={handlefreelanceProfile}
            >
              <div className="flex flex-row gap-2 ">
                <div>
                  <img
                    className="w-[35px] h-[35px] object-center rounded-full"
                    src={`${process.env.REACT_APP_BACKEND_URI}/profilePics/${creatordata?.profile?.profilePic}`}
                  />
                </div>
                <div className="flex flex-col cursor-pointer">
                  <h1 className="text-xl font-semibold">
                    {creatordata?.fetchUser?.userName || "Freelancer"}
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
          <div className="w-full md:w-1/3 max-w-[700px] h-auto max-h-[500px] md:sticky top-5 flex flex-col bg-white rounded-2xl p-4 shadow-lg">
            <div className="w-full flex justify-between border-b border-gray-300 pb-2">
              {["Basic", "Standard", "Premium"].map((plan) => (
                <div
                  key={plan}
                  className={`text-sm md:text-base font-semibold pb-2 px-1 cursor-pointer transition-all duration-200 ${
                    isActivePrice === plan
                      ? "text-lime-700 border-b-4 border-lime-700"
                      : "text-gray-700 hover:text-lime-700"
                  }`}
                  onClick={() => setActivePrice(plan)}
                >
                  {plan}
                </div>
              ))}
            </div>

            <div className="mt-6">
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
                <p className="text-center text-gray-500">
                  Loading price info...
                </p>
              )}
            </div>

            <div
              className={`mt-6 space-y-4
              ${
                clientData?.fetchUser?.role === "freelancer"
                  ? "hidden"
                  : "block"
              }
              `}
            >
              <button
                onClick={() => handleOrders(isActivePrice)}
                className={`w-full flex items-center justify-center gap-2 px-5 py-3 cursor-pointer  rounded-xl text-sm md:text-base font-medium  active:scale-95 transition-all ${
                  isOrder.length > 0
                    ? "bg-lime-700 text-white hover:bg-lime-800"
                    : "bg-gray-400 text-white"
                }`}
              >
                {isOrder.length > 0 ? "Place Order" : "Order Placed"}
              </button>

              <button
                onClick={() => handleContact(creatordata?.fetchUser?.userId)}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 cursor-pointer rounded-xl bg-white border border-lime-700 text-lime-700 font-medium hover:bg-lime-50 active:scale-95 transition-all"
              >
                Message Me
                <PaperAirplaneIcon className="size-5 -rotate-45 text-lime-700" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostedgigDetails;
