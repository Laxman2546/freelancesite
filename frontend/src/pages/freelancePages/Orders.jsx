import React, { useEffect, useState } from "react";
import FreelancerNavbar from "../../components/FreelancerNavbar";
import empty from "../../assets/images/empty.svg";
import Errors from "../../components/Errors";
import { useAuth } from "../../hooks/useAuth";
import ClientNavbar from "../../components/ClientNavbar";
import axios from "axios";
import { TruckIcon } from "@heroicons/react/24/solid";
import { Hourglass, HourglassSharp } from "react-ionicons";
import { Navigate, useNavigate } from "react-router-dom";
const Orders = () => {
  const { checkAuth, user } = useAuth();
  const [showError, setshowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ordersData, setordersData] = useState([]);
  const [error, setError] = useState(
    "something went wrong while fetching orders"
  );

  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    getOrders();
  }, []);
  useEffect(() => {
    if (!showError) return;
    const timer = setTimeout(() => {
      setshowError(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [showError, error]);

  const getOrders = async () => {
    setLoading(true);
    try {
      const userOrders = await axios.get(
        `${process.env.REACT_APP_BACKEND_URI}/orders/getorders`,
        {
          withCredentials: true,
        }
      );
      console.log(userOrders);
      setordersData(userOrders.data.getOrders);
    } catch (e) {
      console.log("something went wrong", e);
    } finally {
      setLoading(false);
    }
  };

  const handleOrder = (data) => {
    navigate(`/orderdetails?id=${data?._id}&freelance=${data?.freelancerId}`);
  };

  return (
    <main>
      {user?.role === "freelancer" ? (
        <FreelancerNavbar />
      ) : (
        <ClientNavbar isVisible={true} />
      )}

      {ordersData.length > 0 ? (
        <div className="w-full p-3 md:pl-8 flex flex-col">
          <div className="w-full ">
            <h1 className="text-xl md:text-3xl font-semibold text-lime-800 ">
              My Orders
            </h1>
          </div>
          <div className="w-full flex flex-col mt-5 gap-5">
            {ordersData.map((order, index) => (
              <div
                key={index}
                className="w-full flex flex-col bg-white shadow-2xs p-4 rounded-xl cursor-pointer hover:bg-gray-100 transition pr-3 md:pr-14"
                onClick={() => handleOrder(order)}
              >
                <div className="w-full flex flex-col md:flex-row gap-4 items-center">
                  <img
                    src={`${process.env.REACT_APP_BACKEND_URI}/thumbnails/${order?.gigId?.thumbnail}`}
                    alt="gig"
                    className="w-full sm:w-[350px] sm:h-[250px]  md:w-35 md:h-25 object-cover rounded-md"
                  />
                  <div>
                    <h1 className="text-lg md:text-xl font-semibold ">
                      {order?.gigId?.title}
                    </h1>
                    <p className="pt-3 pb-3 text-gray-500">
                      Orderd on: {order?.createdAt.split("T")[0]}
                    </p>
                    <div className="relative">
                      <span
                        className={`text-sm  capitalize  p-2 pl-5 rounded-xl  text-center ${
                          order?.status === "pending"
                            ? "bg-amber-200 text-amber-700"
                            : order?.status === "accepted"
                            ? "bg-green-200 text-green-700"
                            : order?.status === "delivered"
                            ? "bg-lime-200 text-lime-900 font-medium pl-8"
                            : order?.status === "in progress"
                            ? "bg-blue-200 text-blue-700 pl-8"
                            : "bg-text-gray-200 text-gray-700"
                        }`}
                      >
                        {order?.status}
                      </span>
                      {order?.status === "delivered" ? (
                        <>
                          <span
                            className={`absolute inline-flex size-5 rounded-full left-2 -top-1`}
                          >
                            <TruckIcon className="size-8 text-lime-800" />
                          </span>
                        </>
                      ) : order?.status === "in progress" ? (
                        <>
                          <span
                            className={`absolute inline-flex size-5 rounded-full left-2 top-1`}
                          >
                            <HourglassSharp
                              width={"17px"}
                              height={"17px"}
                              color={"#1d4ed8"}
                            />
                          </span>
                        </>
                      ) : (
                        <>
                          <span
                            className={`absolute inline-flex size-2 rounded-full ${
                              order?.status === "pending"
                                ? "bg-amber-400"
                                : order?.status === "accepted"
                                ? "bg-green-400"
                                : order?.status === "in progress"
                                ? "bg-blue-400"
                                : "bg-lime-400"
                            }  left-2 top-2`}
                          ></span>
                          <span
                            className={`absolute  w-[25px] h-[25px] animate-ping rounded-full ${
                              order?.status === "pending"
                                ? "bg-amber-400"
                                : order?.status === "accepted"
                                ? "bg-green-400"
                                : order?.status === "in progress"
                                ? "bg-blue-400"
                                : "bg-lime-400"
                            } opacity-75 left-0`}
                          ></span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full flex  items-center justify-center flex-col">
          <img src={empty} className="w-[380px] h-[380px]" />
          <h1 className="text-xl font-semibold text-black">No orders yet!</h1>
        </div>
      )}
    </main>
  );
};

export default Orders;
