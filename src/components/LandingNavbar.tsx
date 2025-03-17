import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const CustomNavbar: React.FC = () => {
  const navItems = [
    "Alumni network",
    "Events",
    "Services",
    "Giving back",
    "Publication",
    "Contact us",
  ];
  const pathname = usePathname();
  const url = pathname.charAt(1).toUpperCase() + pathname.slice(2);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between px-4 lg:px-6 py-3 bg-white shadow-md border-b z-50 w-full">
      {/* Logo Section */}
      <Link href={"/"} className="cursor-pointer">
        <div className="flex items-center gap-2">
          <img
            src="/IIT_Kharagpur_Logo.svg"
            alt="IIT Kharagpur Logo"
            className="h-10 w-10"
          />
          <div>
            <h1 className="text-lg font-bold text-indigo-600">
              ALUMNI CONNECT
            </h1>
            <p className="text-xs text-gray-600">
              Indian Institute of Technology Kharagpur
            </p>
          </div>
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

      {/* Navigation Links */}
      <ul
        className={`${
          isMobileMenuOpen ? "flex" : "hidden"
        } lg:flex lg:items-center lg:gap-6 text-black font-medium fixed lg:static top-0 left-0 w-full h-screen lg:h-auto bg-white lg:bg-transparent flex-col lg:flex-row items-center justify-center lg:p-0 p-6 transition-all duration-500 ease-in-out ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 lg:opacity-100"
        } z-40`}
      >
        {navItems.map((item, index) => (
          <li
            key={index}
            className={`my-4 lg:my-0 text-lg lg:text-base`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <Link
              href={
                item === "Contact us"
                  ? `#contact`
                  : `/${item.replace(" ", "-").toLowerCase()}`
              }
              className={`transition-colors duration-200 cursor-pointer ${
                url.replace("-", " ") === item
                  ? "text-orange-600"
                  : "text-black hover:text-orange-600"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
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

      {/* Right SignIn Button (Desktop) */}
      <Link href="/login">
        <button className="hidden lg:block border px-4 py-2 rounded-md transition bg-[#fd7e14] text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500">
          SignIn
        </button>
      </Link>
    </nav>
  );
};

export default CustomNavbar;
