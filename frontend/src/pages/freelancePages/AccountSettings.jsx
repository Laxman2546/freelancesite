import React, { useState, useEffect } from "react";
import FreelancerNavbar from "../../components/FreelancerNavbar.jsx";
import { TrashIcon } from "@heroicons/react/24/solid";
import DeleteAccount from "../../components/DeleteAccount.jsx";
import axios from "axios";
import Success from "../../components/Success.jsx";
import { useNavigate } from "react-router-dom";
import Errors from "../../components/Errors.jsx";
import Loader from "../../components/Loader.jsx";
import { useAuth } from "../../hooks/useAuth.js";

const AccountSettings = () => {
  const [showPopup, setshowPopup] = useState(false);
  const [success, setSuccess] = useState(false);
  const [timer, setTimer] = useState(3);
  const [loading, setLoading] = useState(false);
  const [showError, setshowError] = useState(false);
  const [error, setError] = useState("");
  const { checkAuth } = useAuth();
  const popupShow = () => {
    setshowPopup(false);
  };
  const navigate = useNavigate();
  const deleteRequest = async () => {
    try {
      setLoading(true);
      const result = await axios.post(
        `${process.env.REACT_APP_BACKEND_URI}/profile/removeaccount`,
        {},
        { withCredentials: true }
      );
      const { data } = result;
      if (data.success) {
        if (data.profile) {
          console.log("User and profile deleted:", data);
        } else {
          console.log("User deleted but no profile found:", data.message);
        }
        redirectHome();
      } else {
        console.warn("Unexpected response:", data);
      }
    } catch (e) {
      console.log("something went wrong while deleting", e);
      setshowError(true);
      setError("Error while Deleting Acoount , tryagain!");
    } finally {
      setLoading(false);
    }
  };
  const redirectHome = () => {
    setSuccess(true);
    let countdown = 3;
    const interval = setInterval(() => {
      countdown -= 1;
      setTimer(countdown);
      if (countdown <= 0) {
        clearInterval(interval);
        navigate("/login");
      }
    }, 1000);
  };

  useEffect(() => {
    if (!showError) return;
    const timer = setTimeout(() => {
      setshowError(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [showError, error]);
  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <main className="w-full min-h-screen relative">
      <FreelancerNavbar />
      <Success
        successText={`your account is deleted successfully,you are redirecting to Register page in  ${timer} `}
        isSuccess={success}
        successStyles={"absolute top-25"}
      />
      {showError && (
        <Errors
          isError={showError}
          errorText={error}
          errorStyles={`absoulte top-25`}
        />
      )}

      {loading && <Loader />}
      <div className=" p-2 md:p-10 w-full">
        <div className="w-full   bg-[#F4F2EE]  rounded-2xl flex flex-col md:flex-row gap-10 p-2 md:p-10 ">
          <div className=" w-full flex flex-col gap-3">
            <h1 className="font-bold text-xl">Delete freelance Account</h1>
            <h1>
              Permanently remove your Freelance account and all of its
              information from the gig connect platform.
              <br />
              This action is not reversible so please continue with caution
            </h1>
          </div>
          <div
            className="w-full md:w-[250px]  rounded-3xl gap-2 h-[50px] flex flex-row items-center justify-center bg-red-500 hover:bg-red-400 cursor-pointer"
            onClick={() => setshowPopup(true)}
          >
            <h1 className="font-medium text-white text-md text-nowrap">
              Delete my Account
            </h1>
            <TrashIcon className="size-4 text-white" />
          </div>
        </div>
      </div>
      {showPopup && (
        <div className="w-full min-h-full md:h-screen flex justify-center items-center bg-[#00000080] absolute top-0  left-0 z-50 p-5">
          <DeleteAccount showPopup={popupShow} deleteAccount={deleteRequest} />
        </div>
      )}
    </main>
  );
};

export default AccountSettings;
