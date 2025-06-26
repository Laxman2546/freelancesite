import React, { useEffect, useRef, useState } from "react";
import FreelancerNavbar from "../components/FreelancerNavbar";
import Steps from "../components/Steps";
import freelancerCategories from "../utils/categories";
import { ChevronDown } from "react-ionicons";
import { XCircleIcon, ArrowTurnDownLeftIcon } from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import deliveryOptions from "../utils/deliveryDates";
import uploadImage from "../assets/images/upload.png";
import success from "../assets/images/success.svg";
import axios from "axios";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
const Gigupdate = () => {
  const steps = ["Overview", "Pricing", "Description", "Thumbnail", "Publish"];
  const [currentStep, setCurrentStep] = useState(0);
  const [gig, setGig] = useState([]);
  const [title, setTitle] = useState("I will do ");
  const [category, setCategory] = useState("");
  const [searchTags, setsearchTags] = useState("");
  const [selectedsearchTags, setselectedsearchTags] = useState([]);
  const [nextDisable, setNextDisable] = useState(false);
  const [priceTitle, setPriceTitle] = useState("");
  const [standardpriceTitle, setstandardPriceTitle] = useState("");
  const [premiumpriceTitle, setpremiumPriceTitle] = useState("");
  const [priceFeatures, setPriceFeatures] = useState("");
  const [standardpriceFeatures, setstandardPriceFeatures] = useState("");
  const [premiumpriceFeatures, setpremiumPriceFeatures] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [standarddeliveryTime, setstandardDeliveryTime] = useState("");
  const [premiumdeliveryTime, setpremiumDeliveryTime] = useState("");
  const [price, setPrice] = useState("₹");
  const [standardprice, setstandardPrice] = useState("₹");
  const [premiumprice, setpremiumPrice] = useState("₹");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isformChanged, setisformchanged] = useState(false);
  const [initialState, setinitialState] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const getId = () => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("gigid");
    return id;
  };

  const updateGig = async () => {
    setLoading(true);
    try {
      const gigId = getId();
      if (!gigId) {
        console.error("Gig ID is missing");
        return;
      }

      const formData = new FormData();
      formData.append("gigId", gigId);
      formData.append("title", title);
      formData.append("category", category);
      formData.append("searchTags", JSON.stringify(selectedsearchTags));
      formData.append(
        "pricing",
        JSON.stringify({
          basic: {
            priceTitle,
            priceFeatures,
            deliveryTime,
            price,
          },
          standard: {
            priceTitle: standardpriceTitle,
            priceFeatures: standardpriceFeatures,
            deliveryTime: standarddeliveryTime,
            price: standardprice,
          },
          premium: {
            priceTitle: premiumpriceTitle,
            priceFeatures: premiumpriceFeatures,
            deliveryTime: premiumdeliveryTime,
            price: premiumprice,
          },
        })
      );
      formData.append("description", description);

      if (thumbnail) {
        formData.append("thumbnail", thumbnail);
      }

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URI}/gig/update`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate("/userhome");
    } catch (e) {
      console.error("Error updating gig:", e.response?.data || e.message);
    } finally {
      setLoading(false);
    }
  };

  const getGigs = async () => {
    setLoading(true);
    try {
      const gigId = getId();
      const fetchGig = await axios.post(
        `${process.env.REACT_APP_BACKEND_URI}/gig/getone`,
        { gigId },
        { withCredentials: true }
      );
      const gigData = fetchGig.data.gig;
      setData(gigData);
    } catch (e) {
      console.log(e, "something went wrong with the getgigs");
    } finally {
      setLoading(false);
    }
  };
  const setData = (data) => {
    setTitle(data.title || "I will do ");
    setCategory(data.category || "");
    setselectedsearchTags(data.searchTags || []);
    setPriceTitle(data.pricing?.basic?.priceTitle || "");
    setPriceFeatures(data.pricing?.basic?.priceFeatures || "");
    setDeliveryTime(data.pricing?.basic?.deliveryTime || "");
    setPrice(data.pricing?.basic?.price || "₹");
    setstandardPriceTitle(data.pricing?.standard?.priceTitle || "");
    setstandardPriceFeatures(data.pricing?.standard?.priceFeatures || "");
    setstandardDeliveryTime(data.pricing?.standard?.deliveryTime || "");
    setstandardPrice(data.pricing?.standard?.price || "₹");
    setpremiumPriceTitle(data.pricing?.premium?.priceTitle || "");
    setpremiumPriceFeatures(data.pricing?.premium?.priceFeatures || "");
    setpremiumDeliveryTime(data.pricing?.premium?.deliveryTime || "");
    setpremiumPrice(data.pricing?.premium?.price || "₹");
    setDescription(data.description || "");
    if (data.thumbnail) {
      setPhotoPreview(
        `${process.env.REACT_APP_BACKEND_URI}/thumbnails/${data.thumbnail}`
      );
      setThumbnail(
        `${process.env.REACT_APP_BACKEND_URI}/thumbnails/${data.thumbnail}`
      );
    } else {
      setPhotoPreview(null);
      setThumbnail(null);
    }
    setinitialState({
      title: data.title || "I will do ",
      category: data.category || "",
      selectedsearchTags: data.searchTags || [],
      priceTitle: data.pricing?.basic?.priceTitle || "",
      priceFeatures: data.pricing?.basic?.priceFeatures || "",
      deliveryTime: data.pricing?.basic?.deliveryTime || "",
      price: data.pricing?.basic?.price || "₹",
      standardpriceTitle: data.pricing?.standard?.priceTitle || "",
      standardpriceFeatures: data.pricing?.standard?.priceFeatures || "",
      standarddeliveryTime: data.pricing?.standard?.deliveryTime || "",
      standardprice: data.pricing?.standard?.price || "₹",
      premiumpriceTitle: data.pricing?.premium?.priceTitle || "",
      premiumpriceFeatures: data.pricing?.premium?.priceFeatures || "",
      premiumdeliveryTime: data.pricing?.premium?.deliveryTime || "",
      premiumprice: data.pricing?.premium?.price || "₹",
      description: data.description || "",
      thumbnail: data.thumbnail || null,
    });
  };

  useEffect(() => {
    if (!initialState) return;
    const hasUpdated =
      title !== initialState.title ||
      category !== initialState.category ||
      JSON.stringify(selectedsearchTags) !==
        JSON.stringify(initialState.selectedsearchTags) ||
      priceTitle !== initialState.priceTitle ||
      priceFeatures !== initialState.priceFeatures ||
      deliveryTime !== initialState.deliveryTime ||
      price !== initialState.price ||
      standardpriceTitle !== initialState.standardpriceTitle ||
      standardpriceFeatures !== initialState.standardpriceFeatures ||
      standarddeliveryTime !== initialState.standarddeliveryTime ||
      standardprice !== initialState.standardprice ||
      premiumpriceTitle !== initialState.premiumpriceTitle ||
      premiumpriceFeatures !== initialState.premiumpriceFeatures ||
      premiumdeliveryTime !== initialState.premiumdeliveryTime ||
      premiumprice !== initialState.premiumprice ||
      description !== initialState.description;
    setisformchanged(hasUpdated);
  }, [
    title,
    category,
    selectedsearchTags,
    priceTitle,
    priceFeatures,
    deliveryTime,
    price,
    standardpriceTitle,
    standardpriceFeatures,
    standarddeliveryTime,
    standardprice,
    premiumpriceTitle,
    premiumpriceFeatures,
    premiumdeliveryTime,
    premiumprice,
    description,
    initialState,
  ]);

  useEffect(() => {
    getGigs();
  }, []);

  const handleTags = () => {
    const trimmed = searchTags.trim();
    if (
      trimmed &&
      !selectedsearchTags.includes(trimmed) &&
      selectedsearchTags.length < 5
    ) {
      setselectedsearchTags([...selectedsearchTags, trimmed]);
      setsearchTags("");
    }
  };

  const checkNextPage = () => {
    if (
      currentStep === 0 &&
      title.length > 19 &&
      category !== "" &&
      selectedsearchTags.length > 0
    ) {
      setNextDisable(false);
    } else if (
      currentStep === 1
      // priceTitle.trim() !== "" &&
      // priceFeatures.trim() !== "" &&
      // deliveryTime !== "" &&
      // price.trim() !== ""   //optional for future things
    ) {
      setNextDisable(false);
    } else if (
      currentStep === 2 &&
      description != "" &&
      description.length <= 1000
    ) {
      setNextDisable(false);
    } else if (currentStep === 3 && thumbnail) {
      setNextDisable(false);
    } else if (currentStep === 4) {
      setNextDisable(false);
    } else {
      setNextDisable(true);
    }
  };
  const wordCount = description.length;

  const handlePriceChange = (e) => {
    const input = e.target.value;

    if (!input.startsWith("₹")) return;
    const numericPart = input.replace(/[^\d]/g, "");
    setPrice("₹" + numericPart);
  };
  const handlestandardPriceChange = (e) => {
    const input = e.target.value;

    if (!input.startsWith("₹")) return;
    const numericPart = input.replace(/[^\d]/g, "");
    setstandardPrice("₹" + numericPart);
  };
  const handlepremiumPriceChange = (e) => {
    const input = e.target.value;

    if (!input.startsWith("₹")) return;
    const numericPart = input.replace(/[^\d]/g, "");
    setpremiumPrice("₹" + numericPart);
  };
  useEffect(() => {
    checkNextPage();
  }, [checkNextPage]);

  const handleRemoveTags = (tags) => {
    setselectedsearchTags(selectedsearchTags.filter((s) => s !== tags));
  };
  const fileuploadRef = useRef();

  const cacheImage = (e) => {
    try {
      setLoading(true);
      const uploadedFile = e.target.files[0];
      if (uploadedFile) {
        setThumbnail(uploadedFile);
        setisformchanged(true);
        const previewURL = URL.createObjectURL(uploadedFile);
        setPhotoPreview(previewURL);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full min-h-screen">
      <FreelancerNavbar />
      {loading && <Loader />}

      <div className="w-full min-h-screen flex flex-col items-center p-4 sm:p-6 bg-[#F4F2EE]">
        <div className="w-full max-w-5xl p-2 sm:p-3 hidden md:flex">
          <Steps steps={steps} currentStep={currentStep} />
        </div>

        <div className="mt-10 w-full max-w-5xl">
          <form
            method="post"
            encType="multipart/form-data"
            onSubmit={updateGig}
          >
            {currentStep === 0 && (
              <div className="w-full p-4 sm:p-6 md:p-10 flex flex-col gap-8 bg-white rounded-xl">
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
                    <span
                      className={` text-sm ${
                        title.length > 19 ? "hidden" : "block"
                      }`}
                    >
                      Minimum 20 letters
                    </span>
                  </div>
                </div>
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
                <div className="flex flex-col md:flex-row gap-5">
                  <div className="flex md:flex-col flex-row md:max-w-[150px] w-full gap-2">
                    <h1 className="font-bold">Search Tags</h1>
                    <span className="text-sm hidden md:block">
                      Tags are useful as the&nbsp;
                      <b>buzz words</b>&nbsp; that are relevant to the service
                      that you offer
                    </span>
                  </div>
                  <div className="flex-1 relative">
                    <input
                      className={`p-3 w-full border-2 ${
                        selectedsearchTags.length > 4 && searchTags
                          ? "border-red-500"
                          : "border-[#d7d7d7]"
                      } rounded-xl outline-none resize-none  text-lg`}
                      value={searchTags}
                      onChange={(e) => {
                        e.target.value.length < 13 &&
                          setsearchTags(e.target.value);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleTags();
                        }
                      }}
                    />
                    {searchTags.length > 0 && (
                      <>
                        <div
                          className="w-[25px] h-[25px] absolute top-4 right-12 cursor-pointer"
                          onClick={() => setsearchTags("")}
                        >
                          <XCircleIcon className="w-5 h-5" />
                        </div>
                        <div
                          className="w-[25px] h-[25px] absolute top-4 right-3 cursor-pointer"
                          onClick={handleTags}
                        >
                          <ArrowTurnDownLeftIcon className="w-5 h-5" />
                        </div>
                      </>
                    )}
                    <span
                      className={` text-sm ${
                        selectedsearchTags.length > 4 && searchTags
                          ? "text-red-500"
                          : "text-gray-500"
                      }`}
                    >
                      maximum 5 tags and 12 letters use numbers and letters only
                    </span>
                    <div className="w-full grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-5  mt-8">
                      {selectedsearchTags.length > 0 &&
                        selectedsearchTags.map((search, index) => (
                          <div className="w-full  relative" key={index}>
                            <h1 className="p-4  min-w-[180px] text-center bg-lime-900 text-white rounded-2xl font-medium">
                              #{search}
                            </h1>
                            <XMarkIcon
                              className="size-5 absolute right-5 md:right-0 top-4.5 hover:bg-[#d7d7d7] hover:text-black rounded-full cursor-pointer text-white"
                              onClick={() => handleRemoveTags(search)}
                            />
                          </div>
                        ))}
                    </div>
                  </div>
                  <div></div>
                </div>
              </div>
            )}
            {currentStep === 1 && (
              <div className="w-full p-4 sm:p-6 md:p-8 bg-white rounded-xl">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                  <div className="border border-black rounded-lg p-4 gap-4 flex flex-col">
                    <h3 className="text-lg font-semibold mb-2 text-center">
                      Basic
                    </h3>

                    <div className="w-full">
                      <span className="text-md font-medium ml-1">
                        Package Title
                      </span>
                      <textarea
                        className="p-3 w-full border-2 border-[#d7d7d7] rounded-xl outline-none resize-none font-semibold text-md"
                        value={priceTitle}
                        onChange={(e) => setPriceTitle(e.target.value)}
                      />
                    </div>

                    <div className="w-full">
                      <span className="text-md font-medium ml-1">
                        Package features
                      </span>
                      <textarea
                        className="p-3 w-full border-2 border-[#d7d7d7] rounded-xl outline-none resize-none font-medium text-sm"
                        value={priceFeatures}
                        onChange={(e) => setPriceFeatures(e.target.value)}
                      />
                    </div>

                    <div className="w-full">
                      <span className="text-md font-medium ml-1">
                        Delivery Time
                      </span>
                      <div className="relative cursor-pointer">
                        <ChevronDown className="size-6 absolute right-5 top-3 pointer-events-none" />
                        <select
                          className="px-3 py-2 w-full rounded-xl outline-none appearance-none border-2 border-[#d9d9d9] bg-white"
                          value={deliveryTime}
                          onChange={(e) => setDeliveryTime(e.target.value)}
                        >
                          <option>Delivery</option>
                          {deliveryOptions.map((dates) => (
                            <option key={dates.value}>{dates.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="w-full">
                      <span className="text-md font-medium ml-1">Price</span>
                      <input
                        type="text"
                        min={1}
                        className="p-3 w-full border-2 border-[#d7d7d7] rounded-xl outline-none resize-none font-semibold text-md"
                        value={price}
                        onChange={handlePriceChange}
                      />
                    </div>
                  </div>
                  <div className="border border-black rounded-lg p-4 gap-4 flex flex-col">
                    <h3 className="text-lg font-semibold mb-2 text-center">
                      Standard
                    </h3>

                    <div className="w-full">
                      <span className="text-md font-medium ml-1">
                        Package Title
                      </span>
                      <textarea
                        className="p-3 w-full border-2 border-[#d7d7d7] rounded-xl outline-none resize-none font-semibold text-md"
                        value={standardpriceTitle}
                        onChange={(e) => setstandardPriceTitle(e.target.value)}
                      />
                    </div>

                    <div className="w-full">
                      <span className="text-md font-medium ml-1">
                        Package features
                      </span>
                      <textarea
                        className="p-3 w-full border-2 border-[#d7d7d7] rounded-xl outline-none resize-none font-medium text-sm"
                        value={standardpriceFeatures}
                        onChange={(e) =>
                          setstandardPriceFeatures(e.target.value)
                        }
                      />
                    </div>

                    <div className="w-full">
                      <span className="text-md font-medium ml-1">
                        Delivery Time
                      </span>
                      <div className="relative cursor-pointer">
                        <ChevronDown className="size-6 absolute right-5 top-3 pointer-events-none" />
                        <select
                          className="px-3 py-2 w-full rounded-xl outline-none appearance-none border-2 border-[#d9d9d9] bg-white"
                          value={standarddeliveryTime}
                          onChange={(e) =>
                            setstandardDeliveryTime(e.target.value)
                          }
                        >
                          <option>Delivery</option>
                          {deliveryOptions.map((dates) => (
                            <option key={dates.value}>{dates.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="w-full">
                      <span className="text-md font-medium ml-1">Price</span>
                      <input
                        type="text"
                        min={1}
                        className="p-3 w-full border-2 border-[#d7d7d7] rounded-xl outline-none resize-none font-semibold text-md"
                        value={standardprice}
                        onChange={handlestandardPriceChange}
                      />
                    </div>
                  </div>

                  <div className="border border-black rounded-lg p-4 gap-4 flex flex-col">
                    <h3 className="text-lg font-semibold mb-2 text-center">
                      Premium
                    </h3>

                    <div className="w-full">
                      <span className="text-md font-medium ml-1">
                        Package Title
                      </span>
                      <textarea
                        className="p-3 w-full border-2 border-[#d7d7d7] rounded-xl outline-none resize-none font-semibold text-md"
                        value={premiumpriceTitle}
                        onChange={(e) => setpremiumPriceTitle(e.target.value)}
                      />
                    </div>

                    <div className="w-full">
                      <span className="text-md font-medium ml-1">
                        Package features
                      </span>
                      <textarea
                        className="p-3 w-full border-2 border-[#d7d7d7] rounded-xl outline-none resize-none font-medium text-sm"
                        value={premiumpriceFeatures}
                        onChange={(e) =>
                          setpremiumPriceFeatures(e.target.value)
                        }
                      />
                    </div>

                    <div className="w-full">
                      <span className="text-md font-medium ml-1">
                        Delivery Time
                      </span>
                      <div className="relative cursor-pointer">
                        <ChevronDown className="size-6 absolute right-5 top-3 pointer-events-none" />
                        <select
                          className="px-3 py-2 w-full rounded-xl outline-none appearance-none border-2 border-[#d9d9d9] bg-white"
                          value={premiumdeliveryTime}
                          onChange={(e) =>
                            setpremiumDeliveryTime(e.target.value)
                          }
                        >
                          <option>Delivery</option>
                          {deliveryOptions.map((dates) => (
                            <option key={dates.value}>{dates.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="w-full">
                      <span className="text-md font-medium ml-1">Price</span>
                      <input
                        type="text"
                        min={1}
                        className="p-3 w-full border-2 border-[#d7d7d7] rounded-xl outline-none resize-none font-semibold text-md"
                        value={premiumprice}
                        onChange={handlepremiumPriceChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            {currentStep === 2 && (
              <div className="w-full p-4 sm:p-6 md:p-8 bg-white rounded-xl ">
                <h1 className="mb-3 pl-1 font-semibold">
                  Showcase your gig with a compelling description—highlight your
                  skills, process, and what makes your service stand out
                </h1>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={`p-3 w-full min-h-[300px] border-2   ${
                    wordCount > 1000 ? "border-red-500" : "border-[#d7d7d7]"
                  } rounded-xl outline-none resize-none font-normal text-md`}
                />
                <div className="w-full flex  justify-end">
                  <span
                    className={`${
                      wordCount > 1000 ? "text-red-500" : "text-black"
                    }`}
                  >
                    {wordCount}/1000 characters
                  </span>
                </div>
              </div>
            )}
            {currentStep === 3 && (
              <div className="w-full flex items-center justify-center flex-col p-4 sm:p-6 md:p-8 bg-white rounded-xl ">
                <h1 className="mb-3 pl-1 font-semibold">
                  Upload a relevant thumbnail that matches your gig's content
                </h1>
                <label
                  htmlFor="thumbnail"
                  className="max-w-full min-h-full min-w-full max-h-full md:max-h-[430px] md:min-h-[430px] md:min-w-[712px] md:max-w-[712px] overflow-hidden relative cursor-pointer"
                >
                  <div className="flex flex-col items-center justify-center border-1 border-dashed">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="thumbnail"
                      onChange={cacheImage}
                      ref={fileuploadRef}
                    />
                    {(thumbnail || photoPreview) && (
                      <XCircleIcon
                        className="absolute top-2 right-2 size-8 text-white cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setThumbnail(null);
                          setPhotoPreview(null);
                        }}
                      />
                    )}
                    {photoPreview ? (
                      <img
                        src={photoPreview}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <>
                        <img
                          src={uploadImage}
                          className="max-h-[400px] min-h-[400px] min-w-[50px]"
                        />
                        <span className="font-medium text-lg">
                          upload image
                        </span>
                      </>
                    )}
                  </div>
                </label>
              </div>
            )}
            {currentStep === 4 && (
              <div className="w-full  flex items-center justify-center flex-col p-4 sm:p-6 md:p-8 bg-white rounded-xl ">
                <div className="flex flex-col items-center justify-center">
                  <img src={success} className="w-[300px] h-[300px]" />
                  <h1 className="mb-3 pl-1 font-semibold text-2xl">
                    Setup complete!
                  </h1>
                  <span className="text-lg font-medium text-gray-500">
                    Take a final look and publish your gig to start attracting
                    clients.
                  </span>
                </div>
              </div>
            )}
          </form>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-6 items-center">
          <button
            onClick={() => setCurrentStep((prev) => Math.max(prev - 1, -1))}
            className={`px-5 py-2 w-full  rounded text-white ${
              currentStep === 0
                ? `bg-gray-400 cursor-not-allowed`
                : `bg-lime-900 hover:bg-lime-800 cursor-pointer`
            }`}
            disabled={currentStep === 0}
          >
            Previous
          </button>

          <button
            type="button"
            onClick={() => {
              setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
              currentStep === steps.length - 1 && updateGig();
            }}
            className={`px-8 py-2 w-full rounded text-white text-nowrap  ${
              nextDisable ||
              loading ||
              (currentStep === steps.length - 1 && isformChanged === false)
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-lime-900 hover:bg-lime-800 cursor-pointer"
            } `}
            disabled={nextDisable || loading}
          >
            {loading && currentStep === steps.length - 1 ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
                updating...
              </span>
            ) : currentStep === steps.length - 1 ? (
              "Update Gig"
            ) : (
              "Next"
            )}
          </button>
        </div>
      </div>
    </main>
  );
};

export default Gigupdate;
