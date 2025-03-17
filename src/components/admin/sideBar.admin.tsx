"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Home, Briefcase, FileText, Layers, Menu } from "lucide-react";

const Sidebar = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div
      className={`h-screen bg-gray-50 text-black flex flex-col ${isOpen ? "w-64" : "w-20"} transition-all duration-300`}
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
          href="/admin/scholarship"
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
      </div>
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
  <a
    href={href}
    className="flex items-center p-3  hover:text-white hover:bg-gray-600 rounded-md transition"
  >
    <span className="w-6 h-6 mr-3 text-gray-400">{icon}</span>
    <span className={`text-base transition-all ${isOpen ? "block" : "hidden"}`}>
      {label}
    </span>
  </a>
);

export default Sidebar;
