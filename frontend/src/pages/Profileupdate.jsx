import { useState, useEffect } from "react";
import FreelanceNavbar from "../components/FreelancerNavbar.jsx";
import skillsList from "../utils/skills.js";
import languages from "../utils/languages.js";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { ArrowTurnDownLeftIcon } from "@heroicons/react/24/solid";
import Button from "../components/Button.jsx";
const profileUpdate = () => {
  const [userName, setuserName] = useState("Lakshman");
  const [emailId] = useState("Laxman@gmail.com");
  const [bio, setBio] = useState("");
  const [job, setJob] = useState("");
  const [experience, setExperience] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [languagesKnown, setLanguagesKnown] = useState([]);
  const [socialLinks, setsocialLinks] = useState([]);
  const [socialLinksInput, setsocialLinksInput] = useState("");
  const [avaliability, setAvaliability] = useState("");
  const [isFormChanged, setIsFormChanged] = useState(false);

  // const requestData = axios.get(`${process.env.REACT_APP_BACKEND_URI}/`);
  const updateData = axios.post(
    `${process.env.REACT_APP_BACKEND_URI}/profile/update`,
    {
      bio: bio,
      skill: selectedSkills,
      job: job,
      socialLinks: socialLinks,
      experience: experience,
      avaliability: avaliability,
      languagesKnown: languagesKnown,
    },
    {
      withCredentials: true,
    }
      .then((result) => {
        console.log(result);
      })
      .catch((e) => {
        console.log(e);
      })
  );

  const initialState = {
    userName: "Lakshman",
    emailId: "Laxman@gmail.com",
    bio: "",
    job: "",
    experience: "",
    selectedSkills: [],
    languagesKnown: [],
    socialLinks: [],
    avaliability: "",
  };

  useEffect(() => {
    const hasChanged =
      userName !== initialState.userName ||
      bio !== initialState.bio ||
      job !== initialState.job ||
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
  ]);

  const handleSkillSelect = (skill) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };
  const handleLanguageSelect = (language) => {
    if (!languagesKnown.includes(language) && language != "Select a language") {
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
  console.log(socialLinks);
  return (
    <main className="w-full h-full">
      <div className="w-full bg-white shadow-sm  fixed top-0 z-40">
        <div className="container mx-auto">
          <FreelanceNavbar />
        </div>
      </div>
      <div className="w-full min-h-screen p-8 bg-[#F4F2EE] mt-24">
        <div>
          <h1 className="text-2xl font-medium">Let's Update your profile</h1>
        </div>

        <div className="w-full h-full flex flex-col gap-8 mt-5">
          <div className="flex flex-col md:flex-row gap-15 w-full items-center  ">
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
                placeholder="Enter your name"
                value={emailId}
                className="pr-2 pl-3 pt-3 pb-3 rounded-[20px] bg-[#ced4da] outline-none font-normal"
              />
            </div>
          </div>
          <div className=" w-full md:w-3/4 flex flex-col gap-3">
            <label>Job Details</label>
            <input
              type="text"
              placeholder="Ex: WebDeveloper, DataAnalyst,Finance,Marketing,etc"
              value={job}
              onChange={(e) => setJob(e.target.value)}
              className="pr-2 pl-3 pt-3 pb-3 rounded-[20px] bg-[#d9d9d9] outline-none font-normal p-4"
            />
          </div>
          <div className="w-full md:w-3/4 flex flex-col gap-3 ">
            <label>Bio</label>
            <textarea
              className="max-h-[180px] min-h-[180px] resize-none bg-[#d9d9d9] p-5 overflow-y-hidden outline-none rounded-2xl"
              name="bio"
              placeholder="Tell us about your self (Max 500 words)"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            ></textarea>
          </div>
          <div className="w-full md:w-3/4 flex flex-col gap-3 ">
            <label>Add your Skills</label>
            <div className="flex flex-wrap gap-2 ">
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
                placeholder="no of years experience"
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
          <div className=" w-full md:max-w-3/4 flex flex-wrap gap-2">
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
          <div className="w-full md:w-3/4 flex flex-col gap-3">
            <label>Social links</label>
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Ex: portfolio links,Linkedin,Github"
                value={socialLinksInput}
                onChange={(e) => setsocialLinksInput(e.target.value)}
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    handleaddSociallinks();
                  }
                }}
                className="w-full pr-2 pl-3 pt-3 pb-3 rounded-[20px] bg-[#d9d9d9] outline-none font-normal p-4 relative"
              />
              {socialLinksInput.length > 0 && (
                <>
                  <div
                    className="w-[25px] h-[25px] absolute top-3 right-5 cursor-pointer"
                    onClick={() => setsocialLinksInput("")}
                  >
                    <XCircleIcon size={5} />
                  </div>
                  <div
                    className="w-[25px] h-[25px] absolute top-3 right-15 cursor-pointer"
                    onClick={handleaddSociallinks}
                  >
                    <ArrowTurnDownLeftIcon size={5} />
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="w-1/3 bg-slate-200 rounded-2xl">
            {socialLinks.map((links, idx) => (
              <span
                key={idx}
                className="w-full md:w-1/3  flex items-center  text-blue-500 px-3 py-2 rounded-full text-sm mr-2  outline-none"
              >
                {links}
                <button
                  type="button"
                  className="ml-2 text-[#84C318] hover:text-red-600 cursor-pointer"
                  onClick={() =>
                    setsocialLinks(socialLinks.filter((l) => l != links))
                  }
                  aria-label={`Remove ${links}`}
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
          <div className="w-full md:w-3/4 flex flex-col mb-[30px]">
            <label htmlFor="avaliability">Avaliability Status</label>
            <select
              className="bg-[#d9d9d9] p-3 rounded-[15px] mt-2"
              name="avaliability"
              id="avaliability"
              onChange={(e) => setAvaliability(e.target.value)}
            >
              <option>Avaliable Now</option>
              <option>Busy</option>
              <option>Avaliable Soon</option>
            </select>
          </div>
          {isFormChanged && (
            <div>
              <button className="p-4 bg-[#3A5B22] hover:bg-[#2E471A] cursor-pointer rounded-4xl text-white">
                Save Details
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default profileUpdate;
