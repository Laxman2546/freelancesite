import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import ClientNavbar from "../../components/ClientNavbar";
import FreelancerNavbar from "../../components/FreelancerNavbar";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { SaveSharp } from "react-ionicons";

const OrderDetails = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState([]);
  const [clientData, setClientData] = useState([]);
  const [deliveryFiles, setDeliveryFiles] = useState([]);
  const [deliveryLinks, setDeliveryLinks] = useState("");
  const [specsText, setspecsText] = useState("");
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const fetchId = (type) => {
    const search = new URLSearchParams(location.search);
    return type === "order" ? search.get("id") : search.get("freelance");
  };

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const orderId = fetchId("order");
      if (!orderId) throw new Error("Order ID is missing");

      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URI}/orders/getone`,
        { orderId },
        { withCredentials: true }
      );
      console.log(res.data.getOrders);
      setOrderData(res.data.getOrders);
    } catch (e) {
      console.error("Failed to fetch order:", e);
    } finally {
      setLoading(false);
    }
  };

  const getFreelancer = async () => {
    try {
      setLoading(true);
      const userId = fetchId("freelancer");
      if (!userId) throw new Error("Freelancer ID is missing");

      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URI}/profile/creator`,
        { userId },
        { withCredentials: true }
      );

      setClientData(res.data);
    } catch (e) {
      console.error("Failed to fetch freelancer:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleTextUpdate = async () => {
    try {
      setLoading(true);
      const updateRequirements = await axios.post(
        `${process.env.REACT_APP_BACKEND_URI}/orders/update`,
        {
          requirements: specsText,
          orderId: fetchId("order"),
        },
        { withCredentials: true }
      );
      fetchOrder();
      setspecsText("");
    } catch (e) {
      console.error("Failed to update specs:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
    getFreelancer();
  }, [location.search]);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "accepted":
        return "bg-lime-100 text-lime-800 border-lime-200";
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "accepted":
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path
              fillRule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "completed":
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path
              fillRule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "pending":
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z"
              clipRule="evenodd"
            />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path
              fillRule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
              clipRule="evenodd"
            />
          </svg>
        );
    }
  };

  const handleSaveLink = () => {
    if (!deliveryLinks.trim()) return;
    const updatedFiles = [...deliveryFiles, deliveryLinks];
    setDeliveryFiles(updatedFiles);
    setDeliveryLinks("");
    handleDelivery(updatedFiles);
  };

  const handleDelivery = async (files) => {
    console.log("these are delivery files", files);
    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URI}/orders/update`,
        {
          files: files,
          orderId: fetchId("order"),
        },
        { withCredentials: true }
      );
      console.log(res);
      fetchOrder();
    } catch (e) {
      console.error("Failed to update delivery:", e);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div>
        {user?.role === "freelancer" ? (
          <FreelancerNavbar />
        ) : (
          <ClientNavbar isVisible={true} />
        )}
        <div className="min-h-screen bg-lime-50/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
            <div className="flex items-center justify-center min-h-96">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lime-600"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      {user?.role === "freelancer" ? (
        <FreelancerNavbar />
      ) : (
        <ClientNavbar isVisible={true} />
      )}

      <div className="min-h-screen bg-lime-50/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-lime-800 mb-2">
              Order Details
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Track your order progress
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
            <div className="xl:col-span-2 space-y-4 sm:space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-lime-100 p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-4">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800 flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-lime-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="hidden sm:inline">Order Status</span>
                    <span className="sm:hidden">Status</span>
                  </h2>
                  <div
                    className={`px-3 py-2 rounded-full border text-sm font-medium flex items-center gap-2 w-fit ${getStatusColor(
                      orderData.status
                    )}`}
                  >
                    {getStatusIcon(orderData.status)}
                    <span>
                      {orderData.status
                        ? orderData.status.charAt(0).toUpperCase() +
                          orderData.status.slice(1)
                        : "Unknown"}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div className="bg-lime-50 p-3 sm:p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-lime-700 mb-1">
                      <svg
                        className="w-4 h-4 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8.25 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9.75 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM10.5 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12.75 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM14.25 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 13.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
                        <path
                          fillRule="evenodd"
                          d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="font-medium text-sm sm:text-base">
                        Order Created
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm sm:text-base break-words">
                      {formatDate(orderData.createdAt)}
                    </p>
                  </div>

                  <div className="bg-lime-50 p-3 sm:p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-lime-700 mb-1">
                      <svg
                        className="w-4 h-4 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="font-medium text-sm sm:text-base">
                        Last Updated
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm sm:text-base break-words">
                      {formatDate(orderData.updatedAt)}
                    </p>
                  </div>
                </div>

                <div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2 text-sm sm:text-base">
                    Order ID
                  </h3>
                  <p className="text-xs sm:text-sm font-mono text-gray-600 bg-white px-3 py-2 rounded border break-all">
                    {orderData._id || "N/A"}
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-lime-100 p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
                  Project Requirements
                </h2>
                {user?.role === "freelancer" ? (
                  <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                      {orderData.requirements ||
                        "No specific requirements provided for this order."}
                    </p>
                  </div>
                ) : (
                  <div className=" p-3 sm:p-4 rounded-lg flex flex-col gap-5 relative">
                    <input
                      className="text-black w-full p-3 pr-14 rounded-lg outline-none border-1 border-gray-400"
                      type="text"
                      placeholder="Enter your specifications"
                      value={specsText}
                      onChange={(e) => setspecsText(e.target.value)}
                    />
                    {specsText.length > 0 && (
                      <div
                        className="absolute right-8 top-7 cursor-pointer"
                        onClick={handleTextUpdate}
                      >
                        <SaveSharp
                          width={"20px"}
                          height={"20px"}
                          color={"#333"}
                        />
                      </div>
                    )}

                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                      {orderData.requirements ||
                        "No specific requirements provided for this order."}
                    </p>
                  </div>
                )}
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-lime-100 p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
                  Progress Updates
                </h2>
                {orderData.progressUpdates &&
                orderData.progressUpdates.length > 0 ? (
                  <div className="space-y-3">
                    {orderData.progressUpdates.map((update, index) => (
                      <div
                        key={index}
                        className="border-l-4 border-lime-400 bg-lime-50 p-3 sm:p-4 rounded-r-lg"
                      >
                        <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                          {update}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 sm:py-8 text-gray-500">
                    <svg
                      className="w-10 sm:w-12 h-10 sm:h-12 mx-auto mb-3 text-gray-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="text-sm sm:text-base">
                      No progress updates yet
                    </p>
                  </div>
                )}
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-lime-100 p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
                  Delivery
                </h2>

                {user?.role === "freelancer" &&
                  orderData.status === "accepted" && (
                    <div className="p-3 relative">
                      <input
                        type="text"
                        placeholder="Add the delivery link"
                        className="p-3 bg-gray-200 outline-none rounded-lg w-full pr-14 text-sm md:text-md"
                        onChange={(e) => setDeliveryLinks(e.target.value)}
                        value={deliveryLinks}
                      />
                      {deliveryLinks.length > 0 && (
                        <div
                          className="absolute right-8 top-7 cursor-pointer"
                          onClick={handleSaveLink}
                        >
                          <SaveSharp width="20px" height="20px" color="#333" />
                        </div>
                      )}
                    </div>
                  )}

                {orderData?.delivery?.files?.length > 0 ? (
                  <div className="space-y-2 mt-4">
                    {orderData.delivery.files.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-lime-50 rounded-lg"
                      >
                        <svg
                          className="w-5 h-5 text-lime-600 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-gray-700 text-sm sm:text-base break-all">
                          {file}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 sm:py-8 text-gray-500">
                    <svg
                      className="w-10 sm:w-12 h-10 sm:h-12 mx-auto mb-3 text-gray-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="text-sm sm:text-base">
                      No files delivered yet
                    </p>
                  </div>
                )}
              </div>
            </div>
            {user?.role === "client" && (
              <div className="xl:col-span-1">
                <div className="bg-white rounded-xl shadow-sm border border-lime-100 p-4 sm:p-6 xl:sticky xl:top-6">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6">
                    Freelancer Profile
                  </h2>

                  <div className="text-center mb-4 sm:mb-6">
                    {clientData.profile?.profilePic ? (
                      <img
                        src={`${process.env.REACT_APP_BACKEND_URI}/profilePics/${clientData.profile.profilePic}`}
                        alt={clientData.fetchUser?.userName}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mx-auto mb-3 object-cover border-4 border-lime-100"
                      />
                    ) : (
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mx-auto mb-3 bg-lime-100 flex items-center justify-center">
                        <svg
                          className="w-6 sm:w-8 h-6 sm:h-8 text-lime-600"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 break-words">
                      {clientData.fetchUser?.userName || "Unknown User"}
                    </h3>
                    <p className="text-lime-600 font-medium text-sm sm:text-base">
                      {clientData.profile?.job || "Freelancer"}
                    </p>
                  </div>
                  <div className="space-y-3 mb-4 sm:mb-6">
                    <div className="flex items-start gap-3 text-gray-600">
                      <svg
                        className="w-4 h-4 mt-0.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                        <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                      </svg>
                      <span className="text-xs sm:text-sm break-all">
                        {clientData.fetchUser?.emailId}
                      </span>
                    </div>
                    <div className="flex items-start gap-3 text-gray-600">
                      <svg
                        className="w-4 h-4 mt-0.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-xs sm:text-sm break-words">
                        {clientData.profile?.avaliability || "Not specified"}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2 text-sm sm:text-base">
                      Experience
                    </h4>
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-yellow-500 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-xs sm:text-sm text-gray-600">
                        {clientData.profile?.experience || 0} years
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
