import React, { useEffect, useRef, useState } from "react";
import Search from "../../components/Search";
import Gigcards from "../../components/Gigcards.jsx";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  CodeBracketIcon,
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
import { SpeakerWaveIcon } from "@heroicons/react/24/outline";
import Footer from "../../components/Footer.jsx";
import ClientNavbar from "../../components/ClientNavbar.jsx";
import axios from "axios";
const HomePage = () => {
  const [activeBtn, setactivebtn] = useState("Web Development");
  const [isVisible, setisVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
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
      name: "Lakshman",
      role: "Fullstack Developer",
      image: "https://randomuser.me/api/portraits/men/31.jpg",
      rating: 4.3,
    },
    {
      name: "Ram",
      role: "UI/UX Designer",
      image: "https://randomuser.me/api/portraits/men/20.jpg",
      rating: 5,
    },
    {
      name: "Sita",
      role: "Content Writer",
      image: "https://randomuser.me/api/portraits/women/71.jpg",
      rating: 5,
    },
    {
      name: "Hanuman",
      role: "Data Analyst",
      image: "https://randomuser.me/api/portraits/men/40.jpg",
      rating: 4.8,
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
      setData(gigResult.data.gigs);
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
                  activeBtn === "Data not-odd:Analysis"
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
            />
          </div>
        </div>
      </div>
      <div className="w-full px-4 md:px-8 py-6">
        <h1 className="text-lg md:text-2xl font-semibold ">
          Popular on {activeBtn}
        </h1>
        <div className="mt-6">
          <Slider {...settings}>
            {data.map((data) => (
              <div key={data.title}>
                <Gigcards data={data} />
              </div>
            ))}
          </Slider>
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
        <h1 className="text-md md:text-lg text-gray-500">
          Work with the best professionals in their fields
        </h1>
        <div className="flex flex-row flex-wrap items-center justify-center gap-12 mt-8">
          {professionals.map((Professional, index) => (
            <div
              key={index}
              className="group p-13 pb-10 pt-10 bg-white shadow-xl  rounded-xl flex flex-col items-center gap-4 transition"
            >
              <div>
                <img
                  src={Professional.image}
                  className="w-[100px] h-[100px] rounded-full object-center"
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
              <button className="p-3 w-full bg-lime-800 text-white rounded-xl cursor-pointer">
                View Services
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full p-3 md:p-8">
        <h1 className="text-xl md:text-3xl font-semibold">Recently Viewed</h1>
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
      <div className="w-full ">
        <Footer />
      </div>
    </main>
  );
};

export default HomePage;
