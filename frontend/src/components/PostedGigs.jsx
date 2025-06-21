import React, { useEffect } from "react";
import axios from "axios";

const PostedGigs = () => {
  const getGigs = async () => {
    const fetchGig = await axios.get(
      `${process.env.REACT_APP_BACKEND_URI}/gig/get`,
      {},
      { withCredentials: true }
    );
    if (!fetchGig) {
      console.log("error");
    }
    console.log(fetchGig);
  };

  useEffect(() => {
    getGigs();
  }, []);

  return (
    <main>
      <div>
        <h1>hello</h1>
      </div>
    </main>
  );
};

export default PostedGigs;
