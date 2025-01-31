"use client"
import React from 'react';
import { LogOut, Award, Briefcase, MessageSquare, Users } from 'lucide-react';
import { NavItemProps } from '../app/types';
import { signOut } from 'next-auth/react';


const NavItem: React.FC<NavItemProps> = ({ icon, label }) => (
  <div className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg cursor-pointer">
    <div className="text-gray-600">{icon}</div>
    <span className="font-medium">{label}</span>
  </div>
);

const Sidebar: React.FC = () => {
  return (
    <div className="hidden lg:flex flex-col w-[280px] fixed left-0 top-0 h-screen bg-white border-r">
      <div className="relative h-48">
        <img 
          src="https://www.iitkgpfoundation.org/images/vault/2638.jpg"
          alt="Cover"
          className="w-full h-32 object-cover"
        />
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-12">
          <img 
            src="https://media.istockphoto.com/id/1682296067/photo/happy-studio-portrait-or-professional-man-real-estate-agent-or-asian-businessman-smile-for.jpg?s=612x612&w=0&k=20&c=9zbG2-9fl741fbTWw5fNgcEEe4ll-JegrGlQQ6m54rg="
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-white"
          />
        </div>
      </div>

      <div className="text-center mt-14">
        <h2 className="font-bold text-xl">Dhruv Gupta</h2>
        <p className="text-gray-600">23HS10063</p>
        <p className="text-sm text-gray-500 mt-1">Lala Lajpat Rai Hall of Residence</p>
      </div>

      <nav className="mt-8 px-4 flex-1">
        <div className="space-y-2">
          <NavItem icon={<Award />} label="Scholarship" />
          <NavItem icon={<Briefcase />} label="Internship" />
          <NavItem icon={<MessageSquare />} label="Messages" />
          <NavItem icon={<Users />} label="Guidance Session" />
        </div>
      </nav>

      <button className="mx-4 mb-6 p-3 bg-indigo-600 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors" onClick={()=>{signOut()}}>
        <LogOut className="w-5 h-5" />
        Logout
      </button>
    </div>
  );
};

export default Sidebar;