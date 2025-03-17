import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Contributor {
  name: string;
  image: string;
  message?: string;
}

const contributors: Contributor[] = [
  {
    name: "Vinod Gupta",
    image: "/joy-of-giving/1.png",
    message:
      "(1967/B Tech/AG/RK) Chairman, Everest group LLC",
  },
  {
    name: "Praveen Chaudhary",
    image: "/joy-of-giving/2.png",
    message: "(1961/B Tech/MT/AZ) Director (Retired), Brookhaven National Laboratory, NY"
    },
    {
    name: "V G Kulandaiwamy",
    image: "/joy-of-giving/3.png",
    message: "(1965/M Tech/CE) Former Vice-Chancellor of Anna University"
    },
    {
    name: "Sushantha Kumar",
    image: "/joy-of-giving/4.png",
    message: "(1967/B Tech/MT/RP) Director (RETIRED) Chalke Atomic Research Centre"
    },
    {
    name: "Srikumar Banerjee",
    image: "/joy-of-giving/5.png",
    message: "(1967/B Tech/MT/RP) Director (RETIRED) Bhabha Atomic Research Centre"
    },
    {
    name: "Anjan Bose",
    image: "/joy-of-giving/6.png",
    message: "(1967/B Tech/EE/RK) Vice President (2008), Washington State University"
    },
    {
    name: "Prem Vat",
    image: "/joy-of-giving/7.png",
    message: "(1966/B Tech/ME/RP) Professor of Eminence & Chief Mentor, The NorthCap University, Gurugram"
    },
    {
      name: "Ramabadran Gopalakrishnan",
      image: "/joy-of-giving/8.png",
      message: "(1967/B Tech/EC/RK) CEO, The Mindworks"
      },
      {
      name: "Avinash Chandra Wadhavan",
      image: "/joy-of-giving/9.png",
      message: "(1962/B Tech/MT/RP)"
      },
      {
      name: "Sanjay Kumar Banerjee",
      image: "/joy-of-giving/10.png",
      message: "(1979/B Tech/EC) University of Texas, Austin, Cockrell Family Regents Chair Professor of Electrical and Computer Engineering and Director, Microelectronics Research Center"
      },
      {
      name: "A Rajaputhy",
      image: "/joy-of-giving/11.png",
      message: "(1972/B Tech/EE) Former Director, National Aerospace Laboratories"
      },
      {
      name: "Arun Sarin",
      image: "/joy-of-giving/12.png",
      message: "(1975/B Tech/MT/AZ) Board of Directors, Accenture’s"
      },
      {
      name: "Asit Kumar Biswas",
      image: "/joy-of-giving/13.png",
      message: "(1960/B Tech/CE) Distinguished Visiting Professor, Lee Kuan Yew School of Public Policy"
      },
      {
      name: "Ravinder Nath Khanna",
      image: "/joy-of-giving/14.png",
      message: "(1967/B Tech/EE/RP) Chairman & Managing Director, Controls And Switchgear Contactors Limited"
      },
      {
      name: "Pradeepkumar B Khosla",
      image: "/joy-of-giving/15.png",
      message: "(1980/B Tech/EE/RP) Chancellor, UC San Diego"
      },
 
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
          <div className="relative bg-white shadow-lg rounded-lg p-6 px-10 flex flex-col items-center text-center w-full max-w-md">
            <img src={contributors[currentIndex].image} alt={contributors[currentIndex].name} className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-gray-200" />
            <h3 className="text-lg sm:text-xl font-semibold mt-3">{contributors[currentIndex].name}</h3>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">{contributors[currentIndex].message}</p>
            <p className="text-gray-700 mt-2 text-sm sm:text-base py-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima aliquid optio odit, commodi eos quaerat dolore tempora sint? Reiciendis, officiis!</p>

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

