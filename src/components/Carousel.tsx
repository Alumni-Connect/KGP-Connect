import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const Carousel = ({ images }: { images: any }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [allImages, setAllImages] = useState([...images, images[0]]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (currentIndex === allImages.length - 2) {
        setCurrentIndex(0);
        setTimeout(() => setAllImages([...images, images[0]]), 500);
      } else {
        setCurrentIndex((prev) => prev + 1);
      }
    }, 3000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <div className="relative h-[600px] w-full overflow-hidden flex items-center justify-center bg-indigo-50">
      <div
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          width: `${allImages.length * 100}%`,
        }}
      >
        {allImages.map((img, index) => (
          <div key={index} className="relative w-full h-full flex-shrink-0">
            <img src={img} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/70 to-indigo-900/70 flex items-center justify-center">
              <motion.div className="text-center text-white">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-6xl font-bold mb-6"
                >
                  Welcome to KGP Connect
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-2xl"
                >
                  Connecting People, Building Communities
                </motion.p>
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
