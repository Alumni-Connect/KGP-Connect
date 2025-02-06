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
          <div key={index} className="relative w-full h-full flex-shrink-0 flex items-center justify-center">
            <img src={img} alt={`Slide ${index + 1}`} className="w-auto h-full max-w-full max-h-full object-contain" />
          </div>
        ))}
      </div>
    </div>
  );
};
