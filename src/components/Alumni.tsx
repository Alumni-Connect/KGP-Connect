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
      "Over the years, IIT Delhi has produced exceptional business leaders. We feel that it’s time now for us to give back. I am sure this Endowment will help IIT compete with global institutions and foster the next set of India’s entrepreneurs and inventors.",  },
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

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % contributors.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + contributors.length) % contributors.length);
  };

  return (
    <div className="w-full mx-auto  py-10 px-8">
      <h2 className="text-3xl font-bold border-b-4 border-indigo-500 inline-block ">Joy Of Giving</h2>
      <p className="text-gray-600 mt-2 mb-6">Celebrating the true Joy of Giving, showcasing stories that inspire and drive the Institute’s vision.</p>
      
      {/* Featured Contributor */}
    <div className="flex justify-evenly items-center gap-4">
    <div className="relative bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center w-1/3">
        <img src={contributors[currentIndex].image} alt={contributors[currentIndex].name} className="w-24 h-24 rounded-full object-cover border-4 border-gray-200" />
        <h3 className="text-xl font-semibold mt-3">{contributors[currentIndex].name}</h3>
        <p className="text-gray-600 mt-2">{contributors[currentIndex].message}</p>
        
        {/* Navigation */}
        <button onClick={prevSlide} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-[#fd7e14] p-2 rounded-full text-white">
          <ChevronLeft size={24} />
        </button>
        <button onClick={nextSlide} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#fd7e14] p-2 rounded-full text-white">
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Contributors Grid */}
      <div className="grid grid-cols-4 gap-4 mt-6">
        {contributors.map((contributor, index) => (
          <div key={index} className="flex flex-col items-center text-center bg-gray-100 p-4 rounded-lg shadow-sm">
            <img src={contributor.image} alt={contributor.name} className="w-16 h-16 rounded-full object-cover border-2 border-gray-300" />
            <p className="text-sm font-medium mt-2">{contributor.name}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}
