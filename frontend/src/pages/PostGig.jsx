import React, { useState } from "react";
import FreelancerNavbar from "../components/FreelancerNavbar";
import Steps from "../components/Steps";
import freelancerCategories from "../utils/categories";
import { ChevronDown } from "react-ionicons";
const PostGig = () => {
  const steps = ["Overview", "Pricing", "Description", "Gallery", "Publish"];
  const [currentStep, setCurrentStep] = useState(0);
  const [title, setTitle] = useState("I'm really good at,");
  const [category, setCategory] = useState("");
  return (
    <main className="w-full min-h-screen">
      <FreelancerNavbar />

      <div className="w-full min-h-screen flex flex-col items-center p-4 sm:p-6 bg-[#F4F2EE]">
        <div className="w-full max-w-5xl p-2 sm:p-3 hidden md:flex">
          <Steps steps={steps} currentStep={currentStep} />
        </div>

        <div className="mt-10 w-full max-w-5xl">
          {currentStep === 0 && (
            <div className="w-full p-4 sm:p-6 md:p-10 flex flex-col gap-8 bg-white rounded-xl">
              {/* Title */}
              <div className="flex flex-col md:flex-row gap-5">
                <div className="flex md:flex-col flex-row md:max-w-[150px] w-full gap-2">
                  <h1 className="font-bold">Gig Title</h1>
                  <span className="text-sm hidden md:block">
                    Title is useful for the&nbsp;
                    <b>buyers to search for the service</b>
                    that are providing by you.
                  </span>
                </div>
                <div className="flex-1">
                  <textarea
                    className="p-3 w-full border-2 border-[#d7d7d7] rounded-xl outline-none resize-none font-semibold text-lg"
                    placeholder="I'm really good at,"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
              </div>

              {/* Category */}
              <div className="flex flex-col md:flex-row gap-5">
                <div className="flex flex-col md:max-w-[150px] gap-2">
                  <h1 className="font-bold">Gig Category</h1>
                  <span className="text-sm">
                    Choose the category&nbsp; that is suitable for your gig
                  </span>
                </div>
                <div className="w-full relative">
                  <ChevronDown className="size-6 absolute right-5 top-4 pointer-events-none" />
                  <select
                    className="w-full p-3 pr-10 rounded-xl outline-none appearance-none border-2 border-[#d9d9d9] bg-white"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option>Select category</option>
                    {freelancerCategories
                      .sort()
                      .map((freelancecategory, index) => (
                        <option value={freelancecategory} key={index}>
                          {freelancecategory}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-6 items-center">
          <button
            onClick={() => setCurrentStep((prev) => Math.max(prev - 1, -1))}
            className={`px-5 py-2 rounded text-white ${
              currentStep === 0
                ? `bg-gray-400 cursor-not-allowed`
                : `bg-lime-900 hover:bg-lime-800 cursor-pointer`
            }`}
            disabled={currentStep === 0}
          >
            Previous
          </button>

          <button
            onClick={() =>
              setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
            }
            className="px-5 py-2 rounded text-white bg-lime-900 hover:bg-lime-800"
          >
            {currentStep === steps.length - 1 ? "Post Gig" : "Next"}
          </button>
        </div>
      </div>
    </main>
  );
};

export default PostGig;
