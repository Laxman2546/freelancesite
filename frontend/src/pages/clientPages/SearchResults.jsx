import React from "react";
import ClientNavbar from "../../components/ClientNavbar";
import { useLocation } from "react-router-dom";
import Footer from "../../components/Footer";
import Gigcards from "../../components/Gigcards.jsx";
const SearchResults = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query");

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

  return (
    <div className="w-full min-h-screen">
      <ClientNavbar isVisible={true} />
      <div className="p-3 md:p-8 flex flex-col">
        <div>
          <h1>
            Search Results for <span className="font-semibold">"{query}"</span>
          </h1>
        </div>
        <div className="flex flex-row flex-wrap gap-3 mt-5">
          {gigs.map((data) => (
            <div key={data.title}>
              <Gigcards data={data} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
