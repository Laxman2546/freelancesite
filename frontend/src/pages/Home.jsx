import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  Search,
  Star,
  MessageCircle,
  Package,
  Truck,
  ArrowRight,
  Quote,
  Zap,
  Crown,
} from "lucide-react";
import {
  Link,
  LogoFacebook,
  LogoGithub,
  LogoLinkedin,
  LogoTwitter,
} from "react-ionicons";
import Logo from "../assets/images/logo.svg";
import CardSwiper from "../components/CardSwiper";
import { useNavigate } from "react-router-dom";

const FreelanceMarketplace = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      icon: <Package className="w-8 h-8" />,
      title: "Post Gigs Easily",
      description: "Freelancers can showcase their skills",
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: "Gig Discovery",
      description: "Find the right talent or gig instantly",
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Built-in Messaging",
      description: "Chat, collaborate, and track work in one place",
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Order Tracking",
      description: "Track status and updates clearly",
    },
  ];

  const popularGigs = [
    {
      id: 1,
      title: "Complete website development",
      freelancer: "Lakshman",
      rating: 4.9,
      reviews: 245,
      price: 3500,
      image:
        "https://i.ibb.co/rKFJNxXm/1752902551827-7c11893a5c56233d9c7d3d1a6762b3a2.png",
      category: "Development",
    },
    {
      id: 2,
      title: "Custom posters designs",
      freelancer: "Rishitha",
      rating: 5.0,
      reviews: 187,
      price: 1200,
      image:
        "https://i.ibb.co/KcCDNQFg/1752902807896-3764a6693ca47d8bb5071c28e65089f4.png",
      category: "Design",
    },
    {
      id: 3,
      title: "Premium Data dashboards",
      freelancer: "Alex",
      rating: 4.8,
      reviews: 156,
      price: 2800,
      image:
        "https://i.ibb.co/xKTLz94G/1752904052863-design-monthly-financial-budget.png",
      category: "Data Analysis",
    },
    {
      id: 4,
      title: "Data Entry Services",
      freelancer: "Saraha",
      rating: 4.9,
      reviews: 203,
      price: 450,
      image:
        "https://i.ibb.co/rfsTyc13/1752905300125-enter-data-extremely-fast-and-fl.png",
      category: "Data Entry",
    },
  ];

  const testimonials = [
    {
      name: "Lakshman",
      role: "Web Developer",
      content:
        "Building complete websites for clients has been so rewarding here. This platform helped me reach more clients than ever before!",
      avatar: "https://i.ibb.co/20z06dcw/1754118619006-1752901626610-user.png",
    },
    {
      name: "Rishitha",
      role: "Graphics Designer",
      content:
        "I love the exposure I get for my poster designs. Clients are clear, communication is smooth, and payments are always on time.",
      avatar: "https://i.ibb.co/XrsbMmRT/1750834025456-images.png",
    },
    {
      name: "Alex",
      role: "Data Analyst",
      content:
        "This platform made showcasing my dashboards easy. Clients now trust me with large data projects, all thanks to the visibility here.",
      avatar: "https://i.ibb.co/k27mKRzJ/1752903730334-85.png",
    },
  ];

  const categories = [
    "All",
    "Design",
    "Development",
    "Data Entry",
    "Data Analysis",
  ];

  const filteredGigs =
    activeFilter === "All"
      ? popularGigs
      : popularGigs.filter((gig) => gig.category === activeFilter);

  const workRef = useRef(null);
  const popularRef = useRef(null);
  const success = useRef(null);
  const ScrollWork = () => {
    if (workRef.current) {
      workRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const ScrollPopular = () => {
    if (popularRef) {
      popularRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const ScrollSucess = () => {
    if (success) {
      success.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleRegister = () => {
    navigate("/login?register=true");
  };

  return (
    <div className="min-h-screen bg-white">
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8  rounded-full flex items-center justify-center shadow-lg">
                <img src={Logo} />
              </div>
              <h1 className="text-lg xsm:text-lg sm:text-xl md:text-2xl font-bold text-center text-lime-800">
                GigConnect
              </h1>
            </div>

            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a
                  href="#"
                  className="text-gray-900 hover:text-lime-700 transition-colors font-medium"
                >
                  Home
                </a>
                <a
                  onClick={ScrollPopular}
                  className="text-gray-600 hover:text-lime-700 transition-colors"
                >
                  Popular Gigs
                </a>
                <a
                  onClick={ScrollWork}
                  className="text-gray-600 hover:text-lime-700 transition-colors"
                >
                  How It Works
                </a>
                <a
                  onClick={ScrollSucess}
                  className="text-gray-600 hover:text-lime-700 transition-colors"
                >
                  Stories
                </a>
              </div>
            </div>

            <div
              className="hidden md:flex items-center space-x-4"
              onClick={() => navigate("/login")}
            >
              <button className="p-2 pl-5 pr-5 border-1 border-[#d7d7d7] font-medium text-center hover:bg-lime-700 hover:text-white text-black rounded-lg cursor-pointer">
                Login
              </button>

              <button
                onClick={handleRegister}
                className=" cursor-pointer bg-lime-800 text-white font-medium  px-3 py-2 rounded-lg hover:from-lime-800 hover:to-lime-900 transition-all duration-300 transform active:scale-90 shadow-lg"
              >
                Sign Up
              </button>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-gray-900"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-200">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <a
                  href="#"
                  className="block px-3 py-2 text-gray-900 font-medium"
                >
                  Home
                </a>
                <a
                  onClick={() => {
                    setIsMenuOpen(false);
                    ScrollPopular();
                  }}
                  className="block px-3 py-2 text-gray-600"
                >
                  Popular Gigs
                </a>
                <a
                  onClick={() => {
                    setIsMenuOpen(false);
                    ScrollWork();
                  }}
                  className="block px-3 py-2 text-gray-600"
                >
                  How It Works
                </a>
                <a
                  onClick={() => {
                    setIsMenuOpen(false);
                    ScrollSucess();
                  }}
                  className="block px-3 py-2 text-gray-600"
                >
                  Stories
                </a>
                <div className="px-3 py-2 space-y-2">
                  <button
                    className="w-full text-left text-gray-600"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </button>
                  <button
                    onClick={() => navigate("/login?register=true")}
                    className="w-full bg-lime-700 text-white px-4 py-2 rounded-lg"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      <section className="pt-20 pb-16 bg-gradient-to-br from-slate-50 via-white to-lime-50 overflow-hidden relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-lime-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-lime-100 to-green-100 px-4 py-2 rounded-full mb-6">
                <Crown className="w-5 h-5 text-lime-700" />
                <span className="text-lime-800 font-semibold">
                  Premium Marketplace
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Where Dreams Meet{" "}
                <span className="bg-gradient-to-r from-lime-700 to-lime-800 bg-clip-text text-transparent">
                  Opportunity
                </span>{" "}
                — Transform Ideas into Reality
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl leading-relaxed">
                Connect with world-class talent or showcase your expertise. Join
                a thriving ecosystem where creativity flourishes and success
                stories begin.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={ScrollPopular}
                  className="bg-gradient-to-r from-lime-700 to-lime-800 text-white px-5 py-3 cursor-pointer rounded-xl hover:from-lime-800 hover:to-lime-900 transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold text-lg flex items-center justify-center space-x-2"
                >
                  <Zap className="w-5 h-5" />
                  <span>Explore Gigs</span>
                </button>
                <button
                  onClick={() => navigate("/login?register=true")}
                  className="border-2 border-lime-700 text-lime-700 px-5 py-3 rounded-xl cursor-pointer hover:bg-lime-50 transition-all duration-300 font-semibold text-lg"
                >
                  Start Selling
                </button>
              </div>
            </div>
            <div className="relative">
              <CardSwiper />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful tools and features designed to help freelancers and
              clients connect, collaborate, and grow together.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group text-center p-8 rounded-2xl hover:bg-gradient-to-br hover:from-lime-50 hover:to-green-50 transition-all duration-300 hover:shadow-lg hover:scale-105 border border-transparent hover:border-lime-200"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-lime-100 to-green-100 text-lime-700 rounded-2xl mb-6 group-hover:from-lime-200 group-hover:to-green-200 transition-all duration-300 shadow-md">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="py-20 bg-gradient-to-br from-slate-50 to-lime-50"
        ref={workRef}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">Simple steps to get started</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-lime-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center flex items-center justify-center space-x-2">
                <Crown className="w-6 h-6 text-lime-700" />
                <span>For Freelancers</span>
              </h3>
              <div className="space-y-6">
                {[
                  "Create your professional profile",
                  "Post compelling gigs with portfolios",
                  "Accept orders and collaborate",
                  "Deliver excellence and grow",
                ].map((step, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-lime-700 to-lime-800 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md">
                      {index + 1}
                    </div>
                    <span className="text-lg text-gray-700">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-blue-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center flex items-center justify-center space-x-2">
                <Search className="w-6 h-6 text-blue-600" />
                <span>For Clients</span>
              </h3>
              <div className="space-y-6">
                {[
                  "Browse curated talent marketplace",
                  "Choose perfect match and hire",
                  "Collaborate through built-in tools",
                  "Track progress and receive results",
                ].map((step, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-lime-500 to-lime-600 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md">
                      {index + 1}
                    </div>
                    <span className="text-lg text-gray-700">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-white" ref={popularRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Popular Gigs
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Discover top-rated services from talented freelancers
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-6 py-2 rounded-full transition-all duration-300 ${
                    activeFilter === category
                      ? "bg-gradient-to-r from-lime-700 to-lime-800 text-white shadow-lg"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredGigs.map((gig) => (
              <div
                onClick={() => navigate("/login?register=true")}
                key={gig.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:scale-105 border border-gray-100"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={gig.image}
                    alt={gig.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full border border-lime-200">
                    <span className="text-xs font-semibold text-lime-700">
                      {gig.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {gig.title}
                  </h3>
                  <p className="text-gray-600 mb-3">{gig.freelancer}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{gig.rating}</span>
                      <span className="text-sm text-gray-500">
                        ({gig.reviews})
                      </span>
                    </div>
                    <div className="text-xl font-bold text-lime-700">
                      ₹{gig.price}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="py-20 bg-gradient-to-br from-lime-50 to-green-50"
        ref={success}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Success Stories That Inspire
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of satisfied freelancers and clients
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-lime-200"
              >
                <Quote className="w-8 h-8 text-lime-700 mb-4" />
                <p className="text-gray-700 mb-6 italic text-lg leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center space-x-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-lime-200"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-lime-700 to-lime-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Your Next Big Opportunity Awaits
          </h2>
          <p className="text-xl text-lime-100 mb-8 leading-relaxed">
            Join our thriving community where talent meets opportunity and
            dreams become reality
          </p>
          <button
            onClick={() => navigate("/login?register=true")}
            className="bg-white text-lime-700 px-8 py-4 rounded-xl hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold text-lg inline-flex items-center space-x-2"
          >
            <span>Start Your Journey</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8  rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 flex items-center justify-center ">
                    <img src={Logo} />
                  </div>
                </div>
                <span className="text-xl font-bold">Gigconnect</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md text-wrap">
                The ultimate freelance marketplace connecting talented
                professionals with clients worldwide, creating opportunities
                that transform careers.
              </p>
            </div>
            <div className="w-full flex flex-col md:flex-row gap-8 ">
              <div>
                <h3 className="font-semibold mb-4">Quick Links</h3>
                <div className="space-y-2">
                  <a
                    href="#"
                    className="block text-gray-400 hover:text-white transition-colors"
                  >
                    About
                  </a>
                  <a
                    href="#"
                    className="block text-gray-400 hover:text-white transition-colors"
                  >
                    Terms
                  </a>
                  <a
                    href="#"
                    className="block text-gray-400 hover:text-white transition-colors"
                  >
                    Privacy
                  </a>
                  <a
                    href="#"
                    className="block text-gray-400 hover:text-white transition-colors"
                  >
                    Blog
                  </a>
                  <a
                    href="#"
                    className="block text-gray-400 hover:text-white transition-colors"
                  >
                    Contact
                  </a>
                </div>
              </div>
              <div>
                <h3 className="font-semibold ">Follow Us</h3>
                <div className="flex  flex-row gap-2">
                  <a href="https://github.com/Laxman2546" target="_blank">
                    <div className="p-3 rounded-full hover:bg-white cursor-pointer">
                      <LogoGithub width="25px" height="25px" color="#3A5B22" />
                    </div>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/lakshman-25L46"
                    target="_blank"
                  >
                    <div className="p-3 rounded-full hover:bg-white cursor-pointer">
                      <LogoLinkedin
                        width="25px"
                        height="25px"
                        color="#3A5B22"
                      />
                    </div>
                  </a>
                  <a href="https://x.com" target="_blank">
                    <div className="p-3 rounded-full hover:bg-white cursor-pointer">
                      <LogoTwitter width="25px" height="25px" color="#3A5B22" />
                    </div>
                  </a>
                  <a href="https://facebook.com" target="_blank">
                    <div className="p-3 rounded-full hover:bg-white cursor-pointer">
                      <LogoFacebook
                        width="25px"
                        height="25px"
                        color="#3A5B22"
                      />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Gigconnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FreelanceMarketplace;
