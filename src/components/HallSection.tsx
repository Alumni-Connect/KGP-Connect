import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const hostels = [
  { name: "Patel Hall of Residence", image: "/halls/patel hall.jpeg" },
  { name: "Lala Lajpat Rai Hall Of Residence", image: "/halls/lala_lajpat_rai_hall_of_residence_iit_kharagpur_cover.jpeg" },
  { name: "LaL Bhadur Shastri Hall of Residence", image: "/halls/LBS.jpg" },
  { name: "Azad Hall of Residence", image: "/halls/lala_lajpat_rai_hall_of_residence_iit_kharagpur_cover.jpeg" },
  { name: "Nehru Hall of Residence", image: "/halls/patel hall.jpeg" },
  { name: "Rajendra Prasad Hall of Residence", image: "/halls/LBS.jpg" },
  { name: "Vidyasagar Hall of Residence", image: "/halls/lala_lajpat_rai_hall_of_residence_iit_kharagpur_cover.jpeg" },
  { name: "Radha Krishnan Hall of Residence", image: "/halls/patel hall.jpeg" },
];

const ITEMS_PER_PAGE = 4; 

const HallShowcase: React.FC = () => {
  const [startIndex, setStartIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [itemWidth, setItemWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      console.log(containerWidth)
      setItemWidth(containerWidth / ITEMS_PER_PAGE);
    }
  }, []);

  const nextSlide = () => {
    if (startIndex + ITEMS_PER_PAGE < hostels.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const prevSlide = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <motion.div
      className="w-full py-10"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <h2 className="text-2xl mx-8 font-bold border-b-4 border-indigo-500 inline-block">
        YOUR HALL, YOUR LEGACY
      </h2>
      <p className="text-gray-600 px-8">Hall Reimagined Glimpses of the future</p>

      <div className="relative flex items-center justify-center mt-6">
        {/* Left Button */}
        <button
          className="absolute left-2 bg-[#fd7e14] p-2 rounded-full disabled:opacity-50 z-10"
          onClick={prevSlide}
          disabled={startIndex === 0}
        >
          <ChevronLeft size={24} color="white" />
        </button>

        {/* Slider Container */}
        <div ref={containerRef} className="overflow-hidden w-full relative">
          <motion.div
            className="flex gap-4"
            animate={{ x: -startIndex * itemWidth }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{ width: hostels.length * itemWidth }}
          >
            {hostels.map((hostel, index) => (
              <motion.div
                key={index}
                className="text-center flex-shrink-0"
                whileHover={{ scale: 1.05 }}
                style={{ width: itemWidth }}
              >
                <img src={hostel.image} alt={hostel.name} className="rounded-lg w-full max-w-[300px] h-40 shadow-lg" />
                <h3 className="font-bold mt-2">{hostel.name}</h3>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Right Button */}
        <button
          className="absolute right-2 bg-[#fd7e14] p-2 rounded-full disabled:opacity-50 z-10"
          onClick={nextSlide}
          disabled={startIndex + ITEMS_PER_PAGE >= hostels.length}
        >
          <ChevronRight size={24} color="white" />
        </button>
      </div>
    </motion.div>
  );
};

export default HallShowcase;

