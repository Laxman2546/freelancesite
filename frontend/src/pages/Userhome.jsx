import React, { useState } from "react";
import Usertype from "../components/Usertype";
import { useAuth } from "../hooks/useAuth";

const Userhome = () => {
  const [showPopup, setshowPopup] = useState(false);
  const { user, loading, checkAuth } = useAuth();

  const handlePopupComplete = () => {
    setshowPopup(false);
    checkAuth();
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div>Loading...</div>
      </div>
    );
  }
  if (user && !user.role && !showPopup) {
    setshowPopup(true);
  }

  return (
    <main className="w-full h-full">
      {showPopup && (
        <div className="w-full min-h-full md:h-screen flex justify-center items-center bg-[#00000080] absolute top-0  left-0 z-50">
          <Usertype
            username={user?.userName}
            onComplete={handlePopupComplete}
          />
        </div>
      )}
    </main>
  );
};

export default Userhome;
