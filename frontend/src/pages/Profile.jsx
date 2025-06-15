import React, { useEffect, useState } from "react";
import FreelancerNavbar from "../components/FreelancerNavbar";
import axios from "axios";
import defaultImg from "../assets/images/freelancer.png";
const Profile = () => {
  const [userName, setuserName] = useState("");
  const [emailId, setEmailID] = useState("");
  const [bio, setBio] = useState("");
  const [job, setJob] = useState("");
  const [experience, setExperience] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [languagesKnown, setLanguagesKnown] = useState([]);
  const [socialLinks, setsocialLinks] = useState([]);
  const [socialLinksInput, setsocialLinksInput] = useState("");
  const [avaliability, setAvaliability] = useState("");
  const [photo, setPhoto] = useState(defaultImg);

  useEffect(() => {
    userProfile();
  }, []);

  const userProfile = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BACKEND_URI}/profile`,
        { withCredentials: true }
      );
      if (!result) {
        throw new Error("something went wrong");
      }
      setuserName(result.data.fetchUser.userName);
      setEmailID(result.data.fetchUser.emailId);
      setUserdata(result.data.profile, result.data.fetchUser);
      console.log(result);
    } catch (e) {
      console.log(e, "error while fetching user profile data");
    }
  };
  const setUserdata = (profile, fetchUser) => {
    if (!profile || !fetchUser) {
      setshowError(true);
      setError("update your profile pic to save details");
      return;
    }

    const skills = Array.isArray(profile.skills) ? profile.skills : [];
    const langs = Array.isArray(profile.languagesKnown)
      ? profile.languagesKnown
      : [];
    const social = Array.isArray(profile.socialLinks)
      ? profile.socialLinks
      : [];

    const userData = {
      userName: fetchUser.userName || "",
      emailId: fetchUser.emailId || "",
      bio: profile.bio || "",
      job: profile.job || "",
      experience: profile.experience || "",
      selectedSkills: skills,
      languagesKnown: langs,
      socialLinks: social,
      avaliability: profile.avaliability || "",
    };

    setuserName(userData.userName);
    setEmailID(userData.emailId);
    setBio(userData.bio);
    setJob(userData.job);
    setExperience(userData.experience);
    setSelectedSkills(userData.selectedSkills);
    setLanguagesKnown(userData.languagesKnown);
    setsocialLinks(userData.socialLinks);
    setAvaliability(userData.avaliability);

    if (profile.profilePic) {
      setPhoto(
        `${process.env.REACT_APP_BACKEND_URI}/profilePics/${profile.profilePic}`
      );
    } else {
      setPhoto(defaultImg);
    }
  };

  return (
    <main className="w-full h-full">
      <div>
        <FreelancerNavbar />
      </div>
    </main>
  );
};

export default Profile;
