import { useState, useEffect, useRef } from "react";
import axios from "axios";
import FreelanceNavbar from "../components/FreelancerNavbar.jsx";
import skillsList from "../utils/skills.js";
import languages from "../utils/languages.js";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { ArrowTurnDownLeftIcon } from "@heroicons/react/24/solid";
import { PencilIcon } from "@heroicons/react/24/solid";
import defaultImg from "../assets/images/freelancer.png";
import Button from "../components/Button.jsx";
import Errors from "../components/Errors.jsx";

const profileUpdate = () => {
  const [userName, setuserName] = useState("");
  const [emailId, setEmailID] = useState("");
  const [bio, setBio] = useState("");
  const [job, setJob] = useState("");
  const [mobileNumber, setMobilenumber] = useState("");
  const [experience, setExperience] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [languagesKnown, setLanguagesKnown] = useState([]);
  const [socialLinks, setsocialLinks] = useState([]);
  const [socialLinksInput, setsocialLinksInput] = useState("");
  const [avaliability, setAvaliability] = useState("");
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [photo, setPhoto] = useState(defaultImg);
  const [initialState, setInitialState] = useState(null);
  const [showError, setshowError] = useState(false);
  const [error, setError] = useState("");
  const requestData = async () => {
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
  useEffect(() => {
    if (!showError) return;
    const timer = setTimeout(() => {
      setshowError(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [showError, error]);

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
      mobilenumber: profile.mobilenumber || "",
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
    setMobilenumber(userData.mobilenumber);

    if (profile.profilePic) {
      setPhoto(
        `${process.env.REACT_APP_BACKEND_URI}/profilePics/${profile.profilePic}`
      );
    } else {
      setPhoto(defaultImg);
    }

    setInitialState(userData);
  };

  useEffect(() => {
    requestData();
  }, []);

  const updateData = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("bio", bio);
    formData.append("skills", JSON.stringify(selectedSkills));
    formData.append("job", job);
    formData.append("mobilenumber", mobileNumber);
    formData.append("socialLinks", JSON.stringify(socialLinks));
    formData.append("experience", experience);
    formData.append("avaliability", avaliability);
    formData.append("languagesKnown", JSON.stringify(languagesKnown));
    if (fileUpload.current.files[0]) {
      formData.append("profilePic", fileUpload.current.files[0]);
    }

    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BACKEND_URI}/profile/update`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(result);
      if (initialState) {
        setInitialState({
          userName,
          bio,
          job,
          mobileNumber,
          experience,
          selectedSkills: [...selectedSkills],
          languagesKnown: [...languagesKnown],
          socialLinks: [...socialLinks],
          photo,
          avaliability,
        });
      }
      setIsFormChanged(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!initialState) return;

    const hasChanged =
      userName !== initialState.userName ||
      bio !== initialState.bio ||
      job !== initialState.job ||
      mobileNumber !== initialState.mobileNumber ||
      photo !== initialState.photo ||
      experience !== initialState.experience ||
      avaliability !== initialState.avaliability ||
      JSON.stringify(selectedSkills) !==
        JSON.stringify(initialState.selectedSkills) ||
      JSON.stringify(languagesKnown) !==
        JSON.stringify(initialState.languagesKnown) ||
      JSON.stringify(socialLinks) !== JSON.stringify(initialState.socialLinks);

    setIsFormChanged(hasChanged);
  }, [
    userName,
    bio,
    job,
    experience,
    selectedSkills,
    languagesKnown,
    socialLinks,
    avaliability,
    mobileNumber,
    initialState,
  ]);

  const handleSkillSelect = (skill) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleLanguageSelect = (language) => {
    if (
      !languagesKnown.includes(language) &&
      language !== "Select a language"
    ) {
      setLanguagesKnown([...languagesKnown, language]);
    }
  };

  const handleaddSociallinks = () => {
    const trimmed = socialLinksInput.trim();
    if (trimmed && !socialLinks.includes(trimmed)) {
      setsocialLinks([...socialLinks, trimmed]);
      setsocialLinksInput("");
    }
  };

  const handleSkillRemove = (skill) => {
    setSelectedSkills(selectedSkills.filter((s) => s !== skill));
  };

  const handleLanguageRemove = (language) => {
    setLanguagesKnown(languagesKnown.filter((s) => s !== language));
  };

  const fileUpload = useRef();

  const imageUpload = (e) => {
    e.preventDefault();
    fileUpload.current.click();
  };

  const uploadimage = async () => {
    const uploadedFile = fileUpload.current.files[0];
    if (uploadedFile) {
      const cachedURL = URL.createObjectURL(uploadedFile);
      setPhoto(cachedURL);
      setIsFormChanged(true);
    }
  };

  return (
    <main className="w-full h-full">
      <div className="w-full bg-white shadow-sm fixed top-0 z-40">
        <div className="container mx-auto">
          <FreelanceNavbar />
        </div>
      </div>

      <div className="w-full min-h-screen p-8 bg-[#F4F2EE] mt-24">
        <Errors
          isError={showError}
          errorText={error}
          errorStyles={`absoulte`}
        />
        <div>
          <h1 className="text-2xl font-medium">Let's Update your profile</h1>
        </div>
        <form onSubmit={updateData} encType="multipart/form-data" method="post">
          <div className="w-full h-full flex flex-col gap-8 mt-5">
            <div className="w-[90%] flex flex-col-reverse md:flex-row items-center justify-between">
              <div className="w-full flex flex-col gap-10">
                <div className="flex flex-col md:flex-row gap-15 w-full items-center">
                  <div className="w-full md:w-1/3 flex flex-col gap-3">
                    <label>Name</label>
                    <input
                      type="text"
                      name="userName"
                      placeholder="Enter your name"
                      value={userName}
                      onChange={(e) => setuserName(e.target.value)}
                      className="pr-2 pl-3 pt-3 pb-3 rounded-[20px] bg-[#d9d9d9] outline-none font-normal"
                    />
                  </div>
                  <div className="w-full md:w-1/3 flex flex-col gap-3">
                    <label>Email Address</label>
                    <input
                      type="text"
                      disabled
                      placeholder="Enter your email"
                      value={emailId}
                      className="pr-2 pl-3 pt-3 pb-3 rounded-[20px] bg-[#ced4da] outline-none font-normal"
                    />
                  </div>
                </div>
                <div className="w-full md:w-3/4 flex flex-col gap-3">
                  <label>Conatct Information</label>
                  <input
                    type="number"
                    placeholder="Enter your mobile number"
                    value={mobileNumber}
                    onChange={(e) => setMobilenumber(e.target.value)}
                    className="pr-2 pl-3 pt-3 pb-3 rounded-[20px] bg-[#d9d9d9] outline-none font-normal p-4"
                  />
                </div>
                <div className="w-full md:w-3/4 flex flex-col gap-3">
                  <label>Job Details</label>
                  <input
                    type="text"
                    placeholder="Ex: WebDeveloper, DataAnalyst,Finance,Marketing,etc"
                    value={job}
                    onChange={(e) => setJob(e.target.value)}
                    className="pr-2 pl-3 pt-3 pb-3 rounded-[20px] bg-[#d9d9d9] outline-none font-normal p-4"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-5">
                <img
                  src={photo}
                  alt="Profile"
                  className="max-w-[150px] max-h-[150px] min-w-[150px] min-h-[150px] bg-[#d9d9d9] rounded-full object-cover"
                />
                <input
                  type="file"
                  id="fileInput"
                  name="profilePic"
                  ref={fileUpload}
                  onChange={uploadimage}
                  className="hidden"
                  accept="image/*"
                />
                <label
                  htmlFor="fileInput"
                  onClick={imageUpload}
                  className="cursor-pointer bg-[#d9d9d9] p-2 text-center rounded-2xl hover:bg-[#3A5B22] hover:text-white"
                >
                  Update Image
                </label>
              </div>
            </div>
            <div className="w-full md:w-3/4 flex flex-col gap-3">
              <label>Bio</label>
              <textarea
                className="max-h-[180px] min-h-[180px] resize-none bg-[#d9d9d9] p-5 overflow-y-auto outline-none rounded-2xl"
                name="bio"
                placeholder="Tell us about yourself (Max 500 words)"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              ></textarea>
            </div>
            <div className="w-full md:w-3/4 flex flex-col gap-3">
              <label>Add your Skills</label>
              {selectedSkills.length > 0 && selectedSkills != "[]" && (
                <div className="flex flex-wrap gap-2">
                  {selectedSkills.map((skill) => (
                    <span
                      key={skill}
                      className="flex items-center bg-[#3A5B22] text-white px-3 py-1 rounded-full text-sm mr-2 border-2"
                    >
                      {skill}
                      <button
                        type="button"
                        className="ml-2 text-[#84C318] hover:text-red-600 cursor-pointer"
                        onClick={() => handleSkillRemove(skill)}
                        aria-label={`Remove ${skill}`}
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                {skillsList
                  .filter((skill) => !selectedSkills.includes(skill))
                  .map((skill) => (
                    <button
                      key={skill}
                      type="button"
                      className="bg-gray-200 hover:bg-[#E4F5C7] text-gray-800 px-3 py-1 rounded-full text-sm"
                      onClick={() => handleSkillSelect(skill)}
                    >
                      {skill}
                    </button>
                  ))}
              </div>
            </div>
            <div className="w-full md:w-3/4 flex flex-col gap-3">
              <div className="flex flex-col gap-3">
                <label>Experience</label>
                <input
                  type="number"
                  min={0}
                  placeholder="Number of years experience"
                  className="pr-2 pl-3 pt-3 pb-3 rounded-[20px] bg-[#d9d9d9] outline-none font-normal p-4"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                />
              </div>
              <label htmlFor="languages">Languages Known</label>
              <select
                className="bg-[#d9d9d9] p-3 rounded-[15px]"
                name="languages"
                id="languages"
                value="Select a language"
                onChange={(e) => handleLanguageSelect(e.target.value)}
              >
                <option>Select a language</option>
                {languages.sort().map((language, index) => (
                  <option value={language} key={index}>
                    {language}
                  </option>
                ))}
              </select>
            </div>
            {languagesKnown.length > 0 &&
              languagesKnown != "[]" &&
              languagesKnown != [] && (
                <div className="w-full md:max-w-3/4 flex flex-wrap gap-2">
                  {languagesKnown.map((language) => (
                    <span
                      key={language}
                      className="flex items-center bg-[#3A5B22] text-white px-3 py-1 rounded-full text-sm mr-2 border-2"
                    >
                      {language}
                      <button
                        type="button"
                        className="ml-2 text-[#84C318] hover:text-red-600 cursor-pointer"
                        onClick={() => handleLanguageRemove(language)}
                        aria-label={`Remove ${language}`}
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
              )}
            <div className="w-full md:w-3/4 flex flex-col gap-3">
              <label>Social links</label>
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Ex: portfolio links, LinkedIn, Github"
                  value={socialLinksInput}
                  onChange={(e) => setsocialLinksInput(e.target.value)}
                  onKeyUp={(e) => {
                    if (e.key === "Enter") {
                      handleaddSociallinks();
                    }
                  }}
                  className="w-full pr-16 pl-3 pt-3 pb-3 rounded-[20px] bg-[#d9d9d9] outline-none font-normal"
                />
                {socialLinksInput.length > 0 && (
                  <>
                    <div
                      className="w-[25px] h-[25px] absolute top-3 right-12 cursor-pointer"
                      onClick={() => setsocialLinksInput("")}
                    >
                      <XCircleIcon className="w-5 h-5" />
                    </div>
                    <div
                      className="w-[25px] h-[25px] absolute top-3 right-3 cursor-pointer"
                      onClick={handleaddSociallinks}
                    >
                      <ArrowTurnDownLeftIcon className="w-5 h-5" />
                    </div>
                  </>
                )}
              </div>
            </div>
            {socialLinks.length > 0 &&
              socialLinks != "[]" &&
              socialLinks != [] && (
                <div className="w-full md:w-3/4 bg-slate-200 rounded-2xl p-2">
                  {socialLinks.map((links, idx) => (
                    <span
                      key={idx}
                      className="flex items-center text-blue-500 px-3 py-2 rounded-full text-sm mr-2 outline-none"
                    >
                      {links}
                      <button
                        type="button"
                        className="ml-2 text-[#84C318] hover:text-red-600 cursor-pointer"
                        onClick={() =>
                          setsocialLinks(socialLinks.filter((l) => l !== links))
                        }
                        aria-label={`Remove ${links}`}
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
              )}
            <div className="w-full md:w-3/4 flex flex-col mb-[30px]">
              <label htmlFor="avaliability">Availability Status</label>
              <select
                className="bg-[#d9d9d9] p-3 rounded-[15px] mt-2"
                name="avaliability"
                id="avaliability"
                value={avaliability}
                onChange={(e) => setAvaliability(e.target.value)}
              >
                <option value="">Select availability</option>
                <option value="Available Now">Available Now</option>
                <option value="Busy">Busy</option>
                <option value="Unavaliable">Unavaliable</option>
              </select>
            </div>
            {isFormChanged && (
              <div>
                <button
                  type="submit"
                  className="p-4 bg-[#3A5B22] hover:bg-[#2E471A] cursor-pointer rounded-xl text-white"
                >
                  Save Details
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </main>
  );
};

export default profileUpdate;
