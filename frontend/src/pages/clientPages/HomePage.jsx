import React, { use, useEffect, useRef, useState } from "react";
import Search from "../../components/Search";
import Gigcards from "../../components/Gigcards.jsx";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  StarIcon,
} from "@heroicons/react/24/solid";
import {
  BarChartSharp,
  CodeSlashSharp,
  ColorPaletteSharp,
  Megaphone,
  PencilSharp,
  Videocam,
} from "react-ionicons";
import Footer from "../../components/Footer.jsx";
import ClientNavbar from "../../components/ClientNavbar.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";
import CardSlider from "../../components/CardsSlider.jsx";
const HomePage = () => {
  const [activeBtn, setactivebtn] = useState("Web Development");
  const [isVisible, setisVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [gigsdata, setgigsData] = useState([]);
  const [localgigs, setlocalGigs] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();

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
          useTransform: false,
        },
      },
    ],
  };

  const cards = [
    {
      title: "Development",
      icon: CodeSlashSharp,
      description: "Custom Websites & Web applications",
    },
    {
      title: "UI/UX Design",
      icon: ColorPaletteSharp,
      description: "Beautiful user interfaces & experiences",
    },
    {
      title: "Content Writing",
      icon: PencilSharp,
      description: "Engaging content for your brand",
    },
    {
      title: "Data Analysis",
      icon: BarChartSharp,
      description: "Insights from your data",
    },
    {
      title: "Video Editing",
      icon: Videocam,
      description: "Professional video production",
    },
    {
      title: "Digital Marketing",
      icon: Megaphone,
      description: "Grow your online presence",
    },
  ];

  const professionals = [
    {
      id: "6839339b23b266df8a9771f1",
      name: "Lakshman",
      role: "Web Developer",
      image: "https://i.ibb.co/20z06dcw/1754118619006-1752901626610-user.png",
      rating: 4.9,
    },
    {
      id: "685b8b1707418405a9313f8e",
      name: "Rishitha",
      role: "Graphics Designer",
      image: "https://i.ibb.co/XrsbMmRT/1750834025456-images.png",
      rating: 5.0,
    },
    {
      id: "687b2f548a74195d7a77f65d",
      name: "Alex",
      role: "Data Analyst",
      image: "https://i.ibb.co/k27mKRzJ/1752903730334-85.png",
      rating: 4.8,
    },
    {
      id: "687b32938a74195d7a77f84d",
      name: "Saraha",
      role: "Data Entry",
      image: "https://i.ibb.co/bMnHFHT9/1752904854116-43.png",
      rating: 4.9,
    },
  ];

  const fetchCategories = async () => {
    setLoading(true);

    try {
      const gigResult = await axios.post(
        `${process.env.REACT_APP_BACKEND_URI}/gig/search`,
        { searchQuery: activeBtn },
        { withCredentials: true }
      );
      setgigsData(gigResult.data.gigs);
    } catch (e) {
      console.log("something went wrong whiler searching", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [activeBtn]);

  const myDivRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setisVisible(false);
        } else {
          setisVisible(true);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0,
      }
    );

    if (myDivRef.current) {
      observer.observe(myDivRef.current);
    }

    return () => {
      if (myDivRef.current) {
        observer.unobserve(myDivRef.current);
      }
    };
  }, []);

  const handleGigdets = (gigId) => {
    const url = `/postdetails?gigid=${gigId}&userid=${user.userId}`;
    navigate(url);
  };

  const getgigsLocal = () => {
    const getGigs = localStorage.getItem("savedGigs");
    const setGigs = getGigs ? JSON.parse(getGigs) : [];
    setlocalGigs(setGigs);
  };

  useEffect(() => {
    getgigsLocal();
  }, []);
  return (
    <main className="w-full min-h-screen">
      <div className="sticky top-0 z-[99999]">
        <ClientNavbar isVisible={isVisible} />
      </div>
      <div className="w-full bg-gray-50 p-3 md:p-8">
        <div className="w-full flex flex-row gap-5 ">
          <div className="w-full md:w-4/5  flex flex-col gap-5">
            <h1 className="text-3xl md:text-6xl font-semibold leading:2 md:leading-18 text-wrap">
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
            <div className="relative" ref={myDivRef}>
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
                  setactivebtn("Graphic Design");
                }}
                className={`p-2 pl-4 pr-4  text-md border-1  text-nowrap border-lime-700 rounded-3xl cursor-pointer hover:bg-lime-700 hover:text-white ${
                  activeBtn === "Graphic Design"
                    ? "bg-lime-700  text-white"
                    : "bg-white "
                }`}
              >
                Graphic Design
              </button>
              <button
                onClick={() => {
                  setactivebtn("Data Analysis");
                }}
                className={`p-2 pl-4 pr-4  text-md border-1 text-nowrap border-lime-700 rounded-3xl cursor-pointer hover:bg-lime-700 hover:text-white ${
                  activeBtn === "Data Analysis"
                    ? "bg-lime-700  text-white"
                    : "bg-white "
                }`}
              >
                Data Analysis
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
              loading="lazy"
            />
          </div>
        </div>
      </div>
      <div className="w-full px-5  md:px-8 py-6">
        <h1 className="text-lg md:text-2xl font-semibold ">
          Popular on {activeBtn}
        </h1>
        <div className="mt-6 overflow-hidden">
          <CardSlider {...settings}>
            {gigsdata.map((data) => (
              <div key={data.title} onClick={() => handleGigdets(data._id)}>
                <Gigcards data={data} />
              </div>
            ))}
          </CardSlider>
        </div>
      </div>
      <div className="w-full flex flex-col items-center justify-center p-3 md:p-8 ">
        <h1 className="text-xl md:text-3xl font-semibold">
          Popular Categories
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center justify-center gap-5 mt-8">
          {cards.map((card, index) => (
            <div
              key={index}
              className="group p-5 pb-10 pt-10 border-2 border-gray-300 hover:border-lime-700 hover:shadow-lg rounded-3xl flex flex-col items-center gap-10 transition"
            >
              <div className="p-5 bg-[#d7d7d7] rounded-full transition-all duration-300 group-hover:bg-lime-700">
                <card.icon
                  className="w-[30px] h-[30px] text-black transition-colors duration-300 group-hover:text-white"
                  style={{
                    width: "30px",
                    height: "30px",
                  }}
                />
              </div>
              <div className="flex flex-col items-center text-center">
                <h1 className="text-lg font-semibold">{card.title}</h1>
                <h2 className="text-md font-medium text-gray-600">
                  {card.description}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full flex flex-col gap-2 items-center justify-center p-3 md:p-8 bg-gray-50 ">
        <h1 className="text-xl md:text-3xl font-semibold">
          Top-Rated Freelancers
        </h1>
        <h1 className="text-md pl-3 md:text-lg text-gray-500">
          Work with the best professionals in their fields
        </h1>
        <div className="flex flex-row flex-wrap items-center justify-center gap-12 mt-8">
          {professionals.map((Professional, index) => (
            <div
              key={index}
              className="group w-full md:w-[260px] p-13 pb-10 pt-10 bg-white shadow-xl  rounded-xl flex flex-col items-center gap-4 transition"
            >
              <div>
                <img
                  src={Professional.image}
                  className="w-[100px] h-[100px] rounded-full object-center"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col items-center text-center">
                <h1 className="text-lg font-semibold">{Professional.name}</h1>
                <h2 className="text-md font-medium text-gray-600">
                  {Professional.role}
                </h2>
              </div>
              <div className="flex flex-row gap-1">
                {Array.from({ length: Professional.rating }, (_, i) => (
                  <StarIcon key={i} className="size-5 text-amber-400" />
                ))}
                <h1 className="text-md">({Professional.rating})</h1>
              </div>
              <button
                onClick={() => navigate(`/profile?id=${Professional.id}`)}
                className="p-3 bg-lime-800 text-white rounded-xl cursor-pointer"
              >
                View Profile
              </button>
            </div>
          ))}
        </div>
      </div>
      {localgigs.length > 0 && localgigs != [] && (
        <div className="w-full p-3 md:p-8">
          <h1 className="text-xl md:text-3xl font-semibold">Recently Viewed</h1>
          <div className="mt-6 overflow-hidden">
            <CardSlider {...settings}>
              {localgigs.map((data) => (
                <div key={data.title} onClick={() => handleGigdets(data._id)}>
                  <Gigcards data={data} />
                </div>
              ))}
            </CardSlider>
          </div>
        </div>
      )}
      <div className="w-full ">
        <Footer />
      </div>
    </main>
  );
};

export default HomePage;
