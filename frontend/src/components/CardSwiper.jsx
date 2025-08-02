import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import { Star, Trophy, Users, Clock } from "lucide-react";
import "swiper/css";
import "swiper/css/effect-cards";
import { useNavigate } from "react-router-dom";
const dummyGigs = [
  {
    name: "Lakshman",
    role: "Web Developer",
    profilepic:
      "https://i.ibb.co/20z06dcw/1754118619006-1752901626610-user.png",
    image:
      "https://i.ibb.co/rKFJNxXm/1752902551827-7c11893a5c56233d9c7d3d1a6762b3a2.png",
    title: "Complete website development",
    rating: "4.9",
    reviews: 245,
    price: "₹3500",
    deliveryTime: "5 days",
    category: "Development",
  },
  {
    name: "Rishitha",
    role: "Graphics Designer",
    profilepic: "https://i.ibb.co/XrsbMmRT/1750834025456-images.png",
    image:
      "https://i.ibb.co/KcCDNQFg/1752902807896-3764a6693ca47d8bb5071c28e65089f4.png",
    title: "Custom posters designs",
    rating: "5.0",
    reviews: 187,
    price: "₹1,200",
    deliveryTime: "14 days",
    category: "Design",
  },
  {
    name: "Alex",
    role: "Data Analyst",
    profilepic: "https://i.ibb.co/k27mKRzJ/1752903730334-85.png",
    image:
      "https://i.ibb.co/xKTLz94G/1752904052863-design-monthly-financial-budget.png",
    title: "Premium Data dashboards",
    rating: "4.8",
    reviews: 156,
    price: "₹2800",
    deliveryTime: "7 days",
    category: "Data Analysis",
  },
  {
    name: "Saraha",
    role: "Data Entry",
    profilepic: "https://i.ibb.co/bMnHFHT9/1752904854116-43.png",
    image:
      "https://i.ibb.co/rfsTyc13/1752905300125-enter-data-extremely-fast-and-fl.png",
    title: "Data Entry Services",
    rating: "4.9",
    reviews: 203,
    price: "₹450",
    deliveryTime: "3 days",
    category: "Data Entry",
  },
  {
    name: "Maya Patel",
    profilepic: "https://i.ibb.co/LX4jh9w4/1750775752513-image-4096x4096.png",
    role: "Content Strategist",
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=250&fit=crop",
    title: "Social Media Content Strategy",
    rating: "4.7",
    reviews: 134,
    price: "₹180",
    deliveryTime: "3 days",
    category: "Marketing",
  },
];

const cardGradients = [
  "from-lime-500/10 via-lime-400/5 to-lime-300/10",
  "from-emerald-500/10 via-teal-500/5 to-cyan-500/10",
  "from-orange-500/10 via-amber-500/5 to-yellow-500/10",
  "from-blue-500/10 via-indigo-500/5 to-purple-500/10",
  "from-rose-500/10 via-pink-500/5 to-violet-500/10",
];

const CardSwiper = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex justify-center py-12 ">
      <div className="max-w-md">
        <Swiper
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards]}
          className="w-[340px] h-[480px]"
          cardsEffect={{
            perSlideOffset: 8,
            perSlideRotate: 2,
            rotate: true,
            slideShadows: true,
          }}
        >
          {dummyGigs.map((gig, index) => (
            <SwiperSlide key={index}>
              <div
                className={`relative bg-gradient-to-br ₹{
                  cardGradients[index % cardGradients.length]
                } backdrop-blur-sm border border-white/20 rounded-3xl shadow-xl hover:shadow-2xl p-6 h-full transition-all duration-300 hover:scale-[1.02] bg-white`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-lime-700 to-lime-800 rounded-full flex items-center justify-center shadow-lg">
                      <img
                        src={gig.profilepic}
                        alt="profilepic"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <div>
                      <div className="font-bold text-gray-800 text-sm">
                        {gig.name}
                      </div>
                      <div className="text-xs text-gray-500 font-medium">
                        {gig.role}
                      </div>
                    </div>
                  </div>
                  <div className="bg-lime-100 text-lime-800 px-2 py-1 rounded-full text-xs font-semibold">
                    {gig.category}
                  </div>
                </div>

                <div className="relative mb-4 overflow-hidden rounded-2xl shadow-md">
                  <img
                    src={gig.image}
                    alt="Service preview"
                    className="w-full h-40 object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                <h3 className="text-base font-bold text-gray-800 mb-4 leading-tight">
                  {gig.title}
                </h3>

                <div className="flex items-center justify-between mb-4 text-sm">
                  <div className="flex items-center space-x-1 bg-yellow-50 px-2 py-1 rounded-lg">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-semibold text-gray-700">
                      {gig.rating}
                    </span>
                    <span className="text-gray-500">({gig.reviews})</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span className="text-xs font-medium">
                      {gig.deliveryTime}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-end pt-4 border-t border-gray-200/50">
                  <div className="text-2xl font-bold bg-gradient-to-r from-lime-700 to-lime-800 bg-clip-text text-transparent">
                    {gig.price}
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-br from-lime-700/0 to-lime-800/0 hover:from-lime-700/5 hover:to-lime-800/5 rounded-3xl transition-all duration-300 pointer-events-none"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Swipe to explore more services
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardSwiper;
