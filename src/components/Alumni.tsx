import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Contributor {
  name: string;
  image: string;
  message?: string;
}

const contributors: Contributor[] = [
  {
    name: "Sandeep Singhal",
    image: "https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659652_640.png",
    message:
      "Over the years, IIT Delhi has produced exceptional business leaders. We feel that it’s time now for us to give back. I am sure this Endowment will help IIT compete with global institutions and foster the next set of India’s entrepreneurs and inventors.",
  },
  
  { name: "Ravi Uppal",image: "https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659652_640.png",
    message:
      "lorem10 Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus facilis a quas in placeat porro voluptatibus beatae vitae inventore.",  },
  { name: "Sujeet Kumar", image: "https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659652_640.png",
    message:
      "Over the years, IIT Delhi has produced exceptional business leaders. We feel that it’s time now for us to give back. I am sure this Endowment will help IIT compete with global institutions and foster the next set of India’s entrepreneurs and inventors.",},
  { name: "Amit Sinha",image: "https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659652_640.png",
    message:
      "Over the years, IIT Delhi has produced exceptional business leaders. We feel that it’s time now for us to give back. I am sure this Endowment will help IIT compete with global institutions and foster the next set of India’s entrepreneurs and inventors.",  },
  { name: "Priyank Garg", image: "https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659652_640.png",
    message:
      "Over the years, IIT Delhi has produced exceptional business leaders. We feel that it’s time now for us to give back. I am sure this Endowment will help IIT compete with global institutions and foster the next set of India’s entrepreneurs and inventors.", },
  { name: "Alok Goyal",image: "https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659652_640.png",
    message:
      "Over the years, IIT Delhi has produced exceptional business leaders. We feel that it’s time now for us to give back. I am sure this Endowment will help IIT compete with global institutions and foster the next set of India’s entrepreneurs and inventors.",  },
  { name: "Ananth Krishnan", image: "https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659652_640.png",
    message:
      "Over the years, IIT Delhi has produced exceptional business leaders. We feel that it’s time now for us to give back. I am sure this Endowment will help IIT compete with global institutions and foster the next set of India’s entrepreneurs and inventors.", },
  { name: "Vinay Piparsania", image: "https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659652_640.png",
    message:
      "Over the years, IIT Delhi has produced exceptional business leaders. We feel that it’s time now for us to give back. I am sure this Endowment will help IIT compete with global institutions and foster the next set of India’s entrepreneurs and inventors.", },
  { name: "Rohit Koshy",image: "https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659652_640.png",
    message:
      "Over the years, IIT Delhi has produced exceptional business leaders. We feel that it’s time now for us to give back. I am sure this Endowment will help IIT compete with global institutions and foster the next set of India’s entrepreneurs and inventors.", },
  { name: "Gautam Kumra",image: "https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659652_640.png",
    message:
      "Over the years, IIT Delhi has produced exceptional business leaders. We feel that it’s time now for us to give back. I am sure this Endowment will help IIT compete with global institutions and foster the next set of India’s entrepreneurs and inventors.", },
  { name: "Vivek Vaidya", image: "https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659652_640.png",
    message:
      "Over the years, IIT Delhi has produced exceptional business leaders. We feel that it’s time now for us to give back. I am sure this Endowment will help IIT compete with global institutions and foster the next set of India’s entrepreneurs and inventors.", },
  { name: "Vikram Gupta",image: "https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659652_640.png",
    message:
      "Over the years, IIT Delhi has produced exceptional business leaders. We feel that it’s time now for us to give back. I am sure this Endowment will help IIT compete with global institutions and foster the next set of India’s entrepreneurs and inventors.",  },
];



export default function JoyOfGiving() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % contributors.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + contributors.length) % contributors.length);

  return (
    <div className="w-full max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl sm:text-3xl font-bold border-b-4 border-indigo-500 inline-block">Joy Of Giving</h2>
      <p className="text-gray-600 mt-2 mb-6 text-sm sm:text-base">Celebrating the true Joy of Giving, showcasing stories that inspire and drive the Institute’s vision.</p>
     <div className="flex flex-col lg:flex-row w-full gap-4 items-center justify-center">
         {/* Featured Contributor */}
      <div className="flex  justify-center items-center gap-6">
        <div className="relative bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center w-full max-w-md">
          <img src={contributors[currentIndex].image} alt={contributors[currentIndex].name} className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-gray-200" />
          <h3 className="text-lg sm:text-xl font-semibold mt-3">{contributors[currentIndex].name}</h3>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">{contributors[currentIndex].message}</p>
          
          {/* Navigation */}
          <button onClick={prevSlide} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-orange-500 p-2 rounded-full text-white">
            <ChevronLeft size={18} />
          </button>
          <button onClick={nextSlide} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-orange-500 p-2 rounded-full text-white">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Contributors Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
        {contributors.map((contributor, index) => (
          <div key={index} className="flex flex-col items-center text-center bg-gray-100 p-4 rounded-lg shadow-sm">
            <img src={contributor.image} alt={contributor.name} className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-gray-300" />
            <p className="text-sm font-medium mt-2">{contributor.name}</p>
          </div>
        ))}
      </div>
     </div>
    
    </div>
  );
}

