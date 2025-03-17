import { CircleChevronLeft, CircleChevronRight, GraduationCap, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { FaChalkboardTeacher } from "react-icons/fa";

const images = [
  "/images1.jpeg",
  "/images2.jpg",
  "/images3.png",
  "/images4.jpg",
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("forward"); // Track direction: "forward" or "backward"

  // Automatic slide with direction change
  useEffect(() => {
    const interval = setInterval(() => {
      if (direction === "forward") {
        if (currentIndex === images.length - 1) {
          // If at the last image, change direction
          setDirection("backward");
          setCurrentIndex(currentIndex - 1);
        } else {
          // Otherwise, continue forward
          setCurrentIndex(currentIndex + 1);
        }
      } else {
        // Moving backward
        if (currentIndex === 0) {
          // If at the first image, change direction
          setDirection("forward");
          setCurrentIndex(currentIndex + 1);
        } else {
          // Otherwise, continue backward
          setCurrentIndex(currentIndex - 1);
        }
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, [currentIndex, direction]);

  const nextSlide = () => {
    if (currentIndex === images.length - 1) {
      setDirection("backward");
    }
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? prevIndex - 1 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    if (currentIndex === 0) {
      setDirection("forward");
    }
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? prevIndex + 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-screen overflow-hidden">
      {/* Image Container */}
      <div
        className="flex w-full h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index}`}
            className="w-full h-full object-cover flex-shrink-0"
          />
        ))}
      </div>

      {/* Text Overlay */}
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 md:gap-4 text-center px-4 w-full md:w-auto">
        <h1
          className={`text-2xl sm:text-3xl md:text-4xl font-bold ${
            currentIndex === 1 || currentIndex === 3
              ? "text-indigo-700"
              : "text-[#fd7e14]"
          }`}
        >
          Welcome to IIT Kharagpur
        </h1>
        <p className="text-sm sm:text-base md:text-xl font-semibold text-gray-900">
          Stay connected with your{" "}
          <span
            className={`text-lg sm:text-xl md:text-2xl font-bold ${
              currentIndex === 0 || currentIndex === 2
                ? "text-indigo-700"
                : "text-[#fd7e14]"
            }`}
          >
            Alma Mater
          </span>{" "}
          <span className="hidden xs:inline">and a thriving network of professionals</span>
        </p>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 sm:left-5 transform -translate-y-1/2 text-black hover:text-orange-600 transition-colors duration-300 cursor-pointer"
        aria-label="Previous slide"
      >
        <CircleChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 sm:right-5 transform -translate-y-1/2 text-black hover:text-orange-600 transition-colors duration-300 cursor-pointer"
        aria-label="Next slide"
      >
        <CircleChevronRight className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
      </button>

   

      {/* Statistics Banner */}
      <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 md:gap-8 p-2 sm:p-4 md:p-6 bg-indigo-600 absolute bottom-0 w-full border-b-2 text-white">
        <h1 className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl w-full text-center sm:w-auto">IIT KGP in Numbers:</h1>
        
        <div className="flex flex-col gap-1 md:gap-2 items-center">
          <p className="font-bold text-base sm:text-lg md:text-xl lg:text-2xl flex gap-1 items-center">
            <GraduationCap className="w-6 h-6 md:w-8 md:h-8 lg:w-12 lg:h-12" />
            <span>62,000+</span>
          </p>
          <p className="font-bold text-xs sm:text-sm md:text-lg lg:text-xl">Alumni</p>
        </div>
        
        <div className="flex flex-col gap-1 md:gap-2 items-center">
          <p className="font-bold text-base sm:text-lg md:text-xl lg:text-2xl flex gap-1 items-center">
            <Users className="w-6 h-6 md:w-8 md:h-8 lg:w-12 lg:h-12" />
            <span>14,630+</span>
          </p>
          <p className="font-bold text-xs sm:text-sm md:text-lg lg:text-xl">Students</p>
        </div>
        
        <div className="flex flex-col gap-1 md:gap-2 items-center">
          <p className="font-bold text-base sm:text-lg md:text-xl lg:text-2xl flex gap-1 items-center">
            <FaChalkboardTeacher className="w-6 h-6 md:w-8 md:h-8 lg:w-12 lg:h-12" />
            <span>770+</span>
          </p>
          <p className="font-bold text-xs sm:text-sm md:text-lg lg:text-xl">Faculty</p>
        </div>
      </div>
    </div>
  );
};

export default Carousel;