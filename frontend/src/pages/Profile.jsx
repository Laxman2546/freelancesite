import React, { useEffect, useState } from "react";
import FreelancerNavbar from "../components/FreelancerNavbar";
import axios from "axios";
import defaultImg from "../assets/images/freelancer.png";
import { themeColors } from "../hooks/theme";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { RemoveCircleOutline } from "react-ionicons";
import {
  BriefcaseIcon,
  CalendarIcon,
  CheckCircleIcon,
  NoSymbolIcon,
} from "@heroicons/react/24/solid";
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
  const [mobileNumber, setmobileNumber] = useState("");
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
      mobilenumber: profile.mobilenumber || "No mobile number",
      experience: profile.experience || 0,
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
    setmobileNumber(userData.mobilenumber);

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
      <div className="w-full min-h-screen p-2 md:p-8  pt-5 flex bg-[#F4F2EE]">
        <div className="w-full flex flex-col md:flex-row gap-2">
          <div className="w-full flex flex-col gap-5">
            <div className="bg-white  w-full md:min-w-[300px]  max-h-[280px] p-2 md:p-10 rounded-2xl flex flex-col justify-center items-center text-center gap-5">
              <div className="w-[130px] h-[130px] p-1  rounded-full flex  ">
                <img
                  src={photo}
                  className="w-[120px] h-[120px]  rounded-full"
                />
              </div>
              <div className="flex flex-col items-center  gap-2">
                <h1 className="text-lg font-medium">{userName}</h1>
                <h1 className="text-wrap max-w-[300px] font-light">{job}</h1>
                <div className="flex flex-row gap-2 items-center">
                  {avaliability === "Busy" ? (
                    <>
                      <div className="w-[13px] h-[13px]  rounded-full bg-amber-400 "></div>
                      <div>
                        <h1 className="text-amber-400 font-bold">
                          {avaliability}
                        </h1>
                      </div>
                    </>
                  ) : avaliability === "Available Now" ? (
                    <>
                      <div className="w-[13px] h-[13px]  rounded-full bg-green-400"></div>
                      <div>
                        <h1 className="text-green-400 font-bold">
                          {avaliability}
                        </h1>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-[13px] h-[13px]  rounded-full bg-red-500 "></div>
                      <div>
                        <h1 className="text-red-500 font-bold">
                          {avaliability}
                        </h1>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="bg-white   w-full md:min-w-[300px]  max-h-[280px] p-5  rounded-2xl flex flex-col  gap-5">
              <h1 className="font-bold">contact Infromation</h1>
              <div className="flex flex-row gap-2">
                <EnvelopeIcon className="size-6" />
                <h1>{emailId}</h1>
              </div>
              <div className="flex flex-row gap-2">
                <PhoneIcon className="size-6" />
                <h1>{mobileNumber}</h1>
              </div>
            </div>
            <div className="bg-white   w-full md:min-w-[300px]  max-h-[280px] p-5  rounded-2xl flex flex-col  gap-5">
              <h1 className="font-bold">Top Skills</h1>
              <div className="flex flex-row flex-1 flex-wrap gap-2">
                {selectedSkills.slice(0, 3).map((skill, index) => (
                  <div
                    className="bg-[#3A5B22] text-white mb-2 p-2  rounded-2xl"
                    key={index}
                  >
                    <h1>{skill}</h1>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white  w-full md:min-w-[300px]  max-h-[280px] p-5  rounded-2xl flex flex-col  gap-5">
              <h1 className="font-bold">Languages Known</h1>
              <div className="flex flex-col gap-2">
                {languagesKnown.map((language, index) => (
                  <h1 key={index}>{language}</h1>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col gap-3">
            <div className="bg-white w-full md:min-w-[900px] p-5 md:p-10  rounded-2xl flex flex-col justify-center items-center  gap-5">
              <div className="flex flex-col items-start gap-2 pr-5">
                <h1 className="font-bold">About Me</h1>
                <h1>{bio}</h1>
              </div>
            </div>
            <div className="bg-white w-full md:min-w-[900px] p-5 md:p-10  rounded-2xl flex flex-col  gap-5">
              <div className="flex flex-col items-start justify-items-start gap-8 pr-5">
                <h1 className="font-bold">Professional Information</h1>
                <div className="w-full flex flex-col md:flex-row gap-9">
                  <div className="w-full md:w-[80%] flex flex-col md:flex-col gap-10 md:justify-between pl-5 ">
                    <div className="flex flex-row items-center gap-3">
                      <div className="bg-[#CDEBC1] p-3 rounded-2xl">
                        <BriefcaseIcon className="size-6 text-[#5D7154]" />
                      </div>
                      <div>
                        <h1>Current Role</h1>
                        <h1 className="font-bold break-all  text-[15px]">
                          {job}
                        </h1>
                      </div>
                    </div>
                    <div className="flex flex-row items-center gap-3">
                      <div className="bg-[#CDEBC1] p-3 rounded-2xl">
                        <CalendarIcon className="size-6 text-[#5D7154]" />
                      </div>
                      <div>
                        <h1>Experience</h1>
                        <h1 className="font-bold">
                          {experience === 0
                            ? "beginner"
                            : `${experience}${experience > 1 ? "+" : ""} year${
                                experience > 1 ? "s" : ""
                              }`}
                        </h1>
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-[91%] flex flex-col md:flex-col gap-10 md:justify-between pl-5">
                    <div className="flex flex-row items-center gap-3">
                      <div className="bg-[#CDEBC1] p-3 rounded-2xl">
                        {avaliability === "Available Now" ? (
                          <CheckCircleIcon className="size-6 text-[#5D7154]" />
                        ) : avaliability === "Busy" ? (
                          <RemoveCircleOutline
                            color={"#5D7154"}
                            width={"25px"}
                            height={"25px"}
                          />
                        ) : (
                          <NoSymbolIcon className="size-6 text-[#5D7154]" />
                        )}
                      </div>
                      <div>
                        <h1>Avaliability</h1>
                        <h1 className="font-bold">{avaliability}</h1>
                      </div>
                    </div>
                    <div className="flex flex-row items-center gap-3">
                      <div className="bg-[#CDEBC1] p-3 rounded-2xl">
                        <EnvelopeIcon className="size-6 text-[#5D7154]" />
                      </div>
                      <div>
                        <h1>EmailId</h1>
                        <h1 className="font-bold break-all  text-[15px]">
                          {emailId}
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white w-full md:min-w-[900px] p-5 md:p-10  rounded-2xl flex flex-col  gap-5">
              <div className="flex flex-col items-start gap-2 pr-5">
                <h1 className="font-bold">Skills and Expertise</h1>
                <div className="flex flex-row flex-wrap gap-3">
                  {selectedSkills.map((skills, index) => (
                    <div key={index} className="p-3  bg-[#CDEBC1] rounded-2xl">
                      <h1 className="text-[#294018] font-medium">{skills}</h1>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-white w-full md:min-w-[900px] p-5 md:p-10  rounded-2xl flex flex-col  gap-5">
              <div className="flex flex-col items-start gap-2 pr-5">
                <h1 className="font-bold">Social Links</h1>
                <div className="flex flex-row flex-wrap gap-3">
                  {socialLinks.map((links, index) => (
                    <div key={index} className="p-3  bg-[#C0E6FB] rounded-2xl">
                      <a
                        href={links}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#36ADF2] font-medium break-all"
                      >
                        {links}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
