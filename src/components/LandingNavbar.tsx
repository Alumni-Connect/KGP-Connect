import { useState } from "react";
import { ChevronDown, Home } from "lucide-react";

const LandingNavbar: React.FC = () => {
  const navitems = [
    "Alumni Network",
    "events",
    "Services",
    "Giving Back",
    "publication",
    "Contact us",
  ];

  return (
    <nav className="flex items-center justify-between px-6 py-3 shadow-md border-b bg-white">
      <div className="flex items-center gap-2">
        <img src="/IIT_Kharagpur_Logo.svg" alt="Logo" className="h-8 w-8" />
        <div>
          <h1 className="text-lg font-bold text-indigo-600">ALUMNI CONNECT</h1>
          <p className="text-xs text-gray-600">
            Indian Institute of Technology Kharagpur
          </p>
        </div>
      </div>

      <ul className="flex items-center gap-6 text-black font-medium">
        {navitems.map((item, index) => (
          <li key={index}>
            <a
              href={item}
              className="flex items-center gap-1 hover:text-red-500"
            >
              {item}
            </a>
          </li>
        ))}
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

export default LandingNavbar;
