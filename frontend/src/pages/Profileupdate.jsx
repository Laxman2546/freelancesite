import React, { useState } from "react";
import FreelanceNavbar from "../components/FreelancerNavbar.jsx";
import skillsList from "../utils/skills.js";
import languages from "../utils/languages.js";
const profileUpdate = () => {
  const [userName, setuserName] = useState("Lakshman");
  const [emailId, setemailId] = useState("Laxman@gmail.com");
  const [bio, setBio] = useState("");
  const [job, setJob] = useState("");
  const [experience, setExperience] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [languagesKnown, setLanguagesKnown] = useState([]);

  const handleSkillSelect = (skill) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };
  const handleLanguageSelect = (language) => {
    if (!languagesKnown.includes(language)) {
      setLanguagesKnown([...languagesKnown, language]);
    }
  };

  const handleSkillRemove = (skill) => {
    setSelectedSkills(selectedSkills.filter((s) => s !== skill));
  };
  const handleLanguageRemove = (language) => {
    setLanguagesKnown(languagesKnown.filter((s) => s !== language));
  };
  console.log(languagesKnown);

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
          <div className="flex flex-row gap-15 w-full items-center  ">
            <div className="w-1/3 flex flex-col gap-3">
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
            <div className="w-1/3 flex flex-col gap-3">
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
          <div className="w-3/4 flex flex-col gap-3">
            <label>Job Details</label>
            <input
              type="text"
              placeholder="Ex: WebDeveloper, DataAnalyst,Finance,Marketing,etc"
              value={job}
              onChange={(e) => setJob(e.target.value)}
              className="pr-2 pl-3 pt-3 pb-3 rounded-[20px] bg-[#d9d9d9] outline-none font-normal p-4"
            />
          </div>
          <div className="w-3/4 flex flex-col gap-3 ">
            <label>Bio</label>
            <textarea
              className="max-h-[180px] min-h-[180px] resize-none bg-[#d9d9d9] p-5 overflow-y-hidden outline-none rounded-2xl"
              name="bio"
              placeholder="Tell us about your self (Max 500 words)"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            ></textarea>
          </div>
          <div className="w-3/4 flex flex-col gap-3 ">
            <label>Add your Skills</label>
            <div className="flex flex-wrap gap-2 mb-2">
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
                    className="bg-gray-200 hover:bg-blue-300 text-gray-800 px-3 py-1 rounded-full text-sm"
                    onClick={() => handleSkillSelect(skill)}
                  >
                    {skill}
                  </button>
                ))}
            </div>
          </div>
          <div className="w-3/4 flex flex-col gap-3">
            <label>Experience</label>
            <input
              type="number"
              placeholder="no of years experience"
              value={job}
              onChange={(e) => setJob(e.target.value)}
              className="pr-2 pl-3 pt-3 pb-3 rounded-[20px] bg-[#d9d9d9] outline-none font-normal p-4"
            />
          </div>
          <div className="w-3/4 flex flex-col gap-3">
            <label htmlFor="languages">Languages Known</label>
            <select
              name="languages"
              id="languages"
              onChange={(e) => handleLanguageSelect(e.target.value)}
            >
              <option disabled defaultValue="">
                Select a language
              </option>
              {languages
                .filter((language) => !languagesKnown.includes(language))
                .map((language, index) => (
                  <option value={language} key={index}>
                    {language}
                  </option>
                ))}
            </select>
          </div>
          <div className="mt-5 w-1/2">
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
        </div>
      </div>
    </main>
  );
};

export default profileUpdate;
