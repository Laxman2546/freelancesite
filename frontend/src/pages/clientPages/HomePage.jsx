import React, { useState } from "react";
import ClientNavbar from "../../components/clientNavbar";
import Search from "../../components/Search";
import Gigcards from "../../components/Gigcards.jsx";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/solid";
const HomePage = () => {
  const [activeBtn, setactivebtn] = useState("Web Development");
  const gigs = [
    {
      thumbnail:
        "https://images.unsplash.com/photo-1583508915901-b5f84c1dcde1?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Professional Logo Design",
      category: "Graphic Design",
      pricing: {
        basic: { price: "₹499" },
        premium: { price: "₹2499" },
      },
    },
    {
      thumbnail:
        "https://plus.unsplash.com/premium_photo-1663050633633-2856e875dcc7?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "E-Commerce Store Setup",
      category: "Web Development",
      pricing: {
        basic: { price: "₹1999" },
        premium: { price: "₹7999" },
      },
    },
    {
      thumbnail:
        "https://images.unsplash.com/photo-1730130054404-c2bd8e7038c2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Instagram Reels Editing",
      category: "Video Editing",
      pricing: {
        basic: { price: "₹299" },
        premium: { price: "₹1499" },
      },
    },
    {
      thumbnail:
        "https://images.unsplash.com/photo-1730130054404-c2bd8e7038c2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Instagram Reels Editing",
      category: "Video Editing",
      pricing: {
        basic: { price: "₹299" },
        premium: { price: "₹1499" },
      },
    },
    {
      thumbnail:
        "https://images.unsplash.com/photo-1730130054404-c2bd8e7038c2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Instagram Reels Editing",
      category: "Video Editing",
      pricing: {
        basic: { price: "₹299" },
        premium: { price: "₹1499" },
      },
    },
    {
      thumbnail:
        "https://images.unsplash.com/photo-1730130054404-c2bd8e7038c2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Instagram Reels Editing",
      category: "Video Editing",
      pricing: {
        basic: { price: "₹299" },
        premium: { price: "₹1499" },
      },
    },
  ];

  function SampleNextArrow(props) {
    const { onClick } = props;
    return (
      <div
        onClick={onClick}
        className="absolute top-1/2 -translate-y-1/2 right-2 z-20 bg-white border border-gray-300 shadow-lg rounded-full p-2 cursor-pointer hover:bg-lime-600 transition"
      >
        <ChevronRightIcon className="w-6 h-6 text-gray-800 hover:text-white" />
      </div>
    );
  }

  function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
      <div
        onClick={onClick}
        className="absolute top-1/2 -translate-y-1/2 left-0 z-20 bg-white border border-gray-300 shadow-lg rounded-full p-2 cursor-pointer hover:bg-lime-600 transition"
      >
        <ChevronLeftIcon className="w-6 h-6 text-gray-800 hover:text-white" />
      </div>
    );
  }

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    lazyLoad: true,
    swipeToSlide: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <main className="w-full min-h-screen">
      <div className="sticky top-0 z-[999999]">
        <ClientNavbar />
      </div>
      <div className="w-full bg-gray-50 p-3 md:p-8">
        <div className="w-full flex flex-row gap-5 ">
          <div className="w-full md:w-2/4  flex flex-col gap-3">
            <h1 className="text-3xl md:text-6xl font-semibold leading:2 md:leading-18">
              Find the right
              <span className="text-lime-800"> freelancer</span>
              &nbsp;for
              <br /> anything.
            </h1>
            <div>
              <h1 className=" text-md md:text-xl font-medium">
                Connect with skilled professionals who can bring your projects
                to life
              </h1>
            </div>
            <div className="relative w-full md:max-w-full">
              <Search />
            </div>
            <div className="flex flex-row flex-wrap gap-4">
              <button
                onClick={() => {
                  setactivebtn("Web Development");
                }}
                className={`p-2 pl-4 pr-4 border-1 text-md text-nowrap border-lime-700 rounded-3xl  cursor-pointer hover:bg-lime-700 hover:text-white ${
                  activeBtn === "Web Development"
                    ? "bg-lime-700  text-white"
                    : "bg-white "
                }`}
              >
                Web Development
              </button>
              <button
                onClick={() => {
                  setactivebtn("Logo Design");
                }}
                className={`p-2 pl-4 pr-4  text-md border-1  text-nowrap border-lime-700 rounded-3xl cursor-pointer hover:bg-lime-700 hover:text-white ${
                  activeBtn === "Logo Design"
                    ? "bg-lime-700  text-white"
                    : "bg-white "
                }`}
              >
                LogoDesign
              </button>
              <button
                onClick={() => {
                  setactivebtn("Data Analysis");
                }}
                className={`p-2 pl-4 pr-4  text-md border-1 text-nowrap border-lime-700 rounded-3xl cursor-pointer hover:bg-lime-700 hover:text-white ${
                  activeBtn === "Data not-odd:Analysis"
                    ? "bg-lime-700  text-white"
                    : "bg-white "
                }`}
              >
                DataAnalysis
              </button>
              <button
                onClick={() => {
                  setactivebtn("Data Entry");
                }}
                className={`p-1 pl-4 pr-4  text-md border-1 text-nowrap border-lime-700 rounded-3xl cursor-pointer hover:bg-lime-700 hover:text-white ${
                  activeBtn === "Data Entry"
                    ? "bg-lime-700  text-white"
                    : "bg-white "
                }`}
              >
                Data Entry
              </button>
            </div>
          </div>
          <div className="hidden w-full md:flex items-center justify-center ">
            <img
              src="https://storage.googleapis.com/uxpilot-auth.appspot.com/e47dcc6cf7-e3e0eab7ebcb1bbd5879.png"
              className=" max-h-[400px] w-[600px] object-cover rounded-3xl"
            />
          </div>
        </div>
      </div>
      <div className="w-full px-4 md:px-8 py-6">
        <h1 className="text-2xl font-semibold ">Popular on {activeBtn}</h1>
        <div className="mt-6 overflow-hidden">
          <Slider {...settings}>
            {gigs.map((data) => (
              <div key={data.title}>
                <Gigcards data={data} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
