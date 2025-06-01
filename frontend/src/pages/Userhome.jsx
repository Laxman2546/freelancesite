import React, { useState } from "react";
import Usertype from "../components/Usertype";
import { useAuth } from "../hooks/useAuth";

const Userhome = () => {
  const [showPopup, setshowPopup] = useState(false);
  const { user, loading, checkAuth } = useAuth();

  const handlePopupComplete = () => {
    setshowPopup(false);
    // Refresh user data after role selection
    checkAuth();
  };

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div>Loading...</div>
      </div>
    );
  }

  // Show popup if user exists but has no role
  if (user && !user.role && !showPopup) {
    setshowPopup(true);
  }

  return (
    <main className="w-full h-full">
      {showPopup && (
        <div className="w-full h-screen flex justify-center items-center bg-[#00000080] fixed top-0 left-0 z-50">
          <Usertype
            username={user?.userName}
            onComplete={handlePopupComplete}
          />
        </div>
      )}

      {/* Your main content here */}
      {user && user.role && (
        <div>
          <h1>Welcome, {user.userName}!</h1>
          <p>You are a {user.role}</p>
        </div>
      )}
    </main>
  );
};

export default Userhome;
