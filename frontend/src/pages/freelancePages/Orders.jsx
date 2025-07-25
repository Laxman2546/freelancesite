import React, { useEffect, useState } from "react";
import FreelancerNavbar from "../../components/FreelancerNavbar";
import empty from "../../assets/images/empty.svg";
import Errors from "../../components/Errors";
import { useAuth } from "../../hooks/useAuth";
import ClientNavbar from "../../components/ClientNavbar";
import axios from "axios";
const Orders = () => {
  const { checkAuth, user } = useAuth();
  const [showError, setshowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ordersData, setordersData] = useState([]);
  const [error, setError] = useState(
    "something went wrong while fetching orders"
  );

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

  return (
    <main>
      {user?.role === "freelancer" ? (
        <FreelancerNavbar />
      ) : (
        <ClientNavbar isVisible={true} />
      )}

      <Errors
        isError={showError}
        errorText={error}
        errorStyles={`absoulte top-25`}
      />

      {ordersData.length > 0 ? (
        <div>
          <h1>order name</h1>
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
