import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SimpleSlider = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(4);

  useEffect(() => {
    const updateSlidesToShow = () => {
      const width = window.innerWidth;
      if (width <= 400) {
        setSlidesToShow(1);
      } else if (width <= 629) {
        setSlidesToShow(2);
      } else if (width <= 1024) {
        setSlidesToShow(3);
      } else {
        setSlidesToShow(4);
      }
    };

    updateSlidesToShow();
    window.addEventListener("resize", updateSlidesToShow);
    return () => window.removeEventListener("resize", updateSlidesToShow);
  }, []);

  useEffect(() => {
    const maxIndex = Math.max(0, children.length - slidesToShow);
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [slidesToShow, children.length, currentIndex]);

  const maxIndex = Math.max(0, children.length - slidesToShow);
  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < maxIndex;

  const nextSlide = () => {
    if (canGoNext) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (canGoPrev) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const totalDots = maxIndex + 1;

  const showNavigation = children.length > slidesToShow;

  return (
    <div className="relative w-full">
      {showNavigation && (
        <button
          onClick={prevSlide}
          disabled={!canGoPrev}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft size={20} className="text-gray-600" />
        </button>
      )}

      {showNavigation && (
        <button
          onClick={nextSlide}
          disabled={!canGoNext}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <ChevronRight size={20} className="text-gray-600" />
        </button>
      )}

      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${(currentIndex * 100) / slidesToShow}%)`,
          }}
        >
          {children.map((child, index) => (
            <div
              key={index}
              className="flex-shrink-0 px-2"
              style={{
                width: `${100 / slidesToShow}%`,
                minWidth: `${100 / slidesToShow}%`,
              }}
            >
              <div className="w-full">{child}</div>
            </div>
          ))}
        </div>
      </div>

      {showNavigation && totalDots > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: totalDots }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? "bg-blue-500 w-4"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SimpleSlider;
