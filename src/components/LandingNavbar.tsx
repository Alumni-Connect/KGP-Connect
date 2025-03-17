import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const LandingNavbar: React.FC = () => {
  const navitems=["Alumni Network", "events", "Services", "Giving Back","publication","Contact us",]

  return (
    <nav className="flex items-center justify-between px-6 py-3 shadow-md border-b bg-white">
     
      <div className="flex items-center gap-2">
        <img src="/IIT_Kharagpur_Logo.svg" alt="Logo" className="h-8 w-8" />
        <div>
          <h1 className="text-lg font-bold text-indigo-600">ALUMNI CONNECT</h1>
          <p className="text-xs text-gray-600">Indian Institute of Technology Kharagpur</p>
        </div>
      </Link>

      {/* Hamburger Menu for Mobile */}
      <div className="lg:hidden z-50 ml-auto">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-gray-600 hover:text-gray-900 focus:outline-none"
          aria-label="Toggle menu"
        >
          <div className="w-6 h-6 flex items-center justify-center relative">
            {/* Hamburger Lines */}
            <span
              className={`absolute w-full h-0.5 bg-gray-600 rounded transition-all duration-300 ease-in-out ${
                isMobileMenuOpen ? "rotate-45 top-2.5" : "top-0"
              }`}
            ></span>
            <span
              className={`absolute w-full h-0.5 bg-gray-600 rounded transition-all duration-300 ease-in-out top-2.5 ${
                isMobileMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              className={`absolute w-full h-0.5 bg-gray-600 rounded transition-all duration-300 ease-in-out ${
                isMobileMenuOpen ? "-rotate-45 top-2.5" : "top-5"
              }`}
            ></span>
          </div>
        </button>
      </div>

     
      <ul className="flex items-center gap-6 text-black font-medium">
        
        {navitems.map(
          (item, index) => (
            <li key={index}>
            <a href = {item} className="flex items-center gap-1 hover:text-red-500">
              {item}
            </Link>
          </li>
        ))}
        {/* SignIn Button in Mobile Menu */}
        <li className="mt-6 lg:hidden">
          <Link href="/login">
            <button className="border px-6 py-2 rounded-md transition bg-[#fd7e14] text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500">
              SignIn
            </button>
          </Link>
        </li>
      </ul>

      
      <a
        href="/login"
        className="border px-3 py-1 rounded-md  transition bg-[#fd7e14] text-white hover:bg-orange-600"
      >
        Sign In
      </a>
    </nav>
  );
};

export default CustomNavbar;
