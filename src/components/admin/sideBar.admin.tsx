"use client";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import {
  Home,
  Briefcase,
  FileText,
  Layers,
  Menu,
  UserRoundCheck,
  SquareUser,
  LogOut,
} from "lucide-react";
import Link from "next/link";

const Sidebar = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div
      className={`min-h-screen bg-gray-50 text-black flex flex-col ${isOpen ? "w-64" : "w-20"} transition-all duration-300`}
    >
      <div className="p-4 flex items-center justify-between">
        <h2
          className={`text-xl font-bold transition-all ${isOpen ? "block" : "hidden"}`}
        >
          Welcome, {session?.user.name}
        </h2>
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md hover:bg-gray-800 hover:text-white"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>
      <div className="p-2 flex flex-col space-y-4 flex-1">
        <NavItem
          href="/admin"
          icon={<Layers />}
          label="Manage System"
          isOpen={isOpen}
        />
        <NavItem
          href="/admin/scholarships"
          icon={<FileText />}
          label="Scholarship"
          isOpen={isOpen}
        />
        <NavItem
          href="/admin/home"
          icon={<Home />}
          label="Posts"
          isOpen={isOpen}
        />
        <NavItem
          href="/admin/jobboard"
          icon={<Briefcase />}
          label="Jobs"
          isOpen={isOpen}
        />
        <NavItem
          href="/alum/home"
          icon={<SquareUser />}
          label="Alum"
          isOpen={isOpen}
        />
        <NavItem
          href="/students/home"
          icon={<UserRoundCheck />}
          label="Students"
          isOpen={isOpen}
        />
      </div>
      {isOpen ? (
        <div className="p-4 border-t">
          <button
            className="w-full p-3 bg-indigo-600 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors shadow-sm font-medium"
            onClick={() => signOut()}
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      ) : (
        <div></div>
      )}

      {session?.user?.email && isOpen && (
        <div className="p-4 text-center text-sm text-gray-400 border-t border-gray-700">
          {session.user.email}
        </div>
      )}
    </div>
  );
};

const NavItem = ({
  href,
  icon,
  label,
  isOpen,
}: {
  href: string;
  icon: any;
  label: string;
  isOpen: boolean;
}) => (
  <Link
    href={href}
    className="flex items-center p-3  hover:text-white hover:bg-gray-600 rounded-md transition"
  >
    <span className="w-6 h-6 mr-3 text-gray-400">{icon}</span>
    <span className={`text-base transition-all ${isOpen ? "block" : "hidden"}`}>
      {label}
    </span>
  </Link>
);

export default Sidebar;
