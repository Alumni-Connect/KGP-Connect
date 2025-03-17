import { CircleChevronLeft, CircleChevronRightIcon } from "lucide-react";
import { useState, useEffect } from "react";

const images = [
  "/images1.jpeg",
  "/images2.jpg",
  "/images3.png",
  "/images4.jpg",
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
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
            className="w-screen h-full object-cover flex-shrink-0"
          />
        ))}
      </div>
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4">
        <h1
          className={`text-4xl font-bold ${
            currentIndex === 1 || currentIndex === 3
              ? "text-indigo-700"
              : "text-[#fd7e14]"
          }`}
        >
          Welcome to IIT Kharagpur
        </h1>
        <p className="text-xl font-semibold text-gray-900">
          Stay connected with your{" "}
          <span
            className={`text-2xl font-bold ${
              currentIndex === 0 || currentIndex === 2
                ? "text-indigo-700"
                : "text-[#fd7e14]"
            }`}
          >
            Alma Mater
          </span>{" "}
          and a thriving network of professionals
        </p>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-5 transform -translate-y-1/2  text-black cursor-pointer"
      >
        <CircleChevronLeft size={40} className="cursor-pointer" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-5 transform -translate-y-1/2  text-black cursor-pointer  "
      >
        <CircleChevronRightIcon size={40} className="cursor-pointer" />
      </button>
    </div>
  );
};

export default Carousel;
