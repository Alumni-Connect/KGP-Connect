"use client"
import React from 'react';
import { LogOut, Bookmark, Users, Calendar, Award, Briefcase, MessageSquare, Home, Book } from 'lucide-react';
import { NavItemProps } from '../types';
import { signOut, useSession } from 'next-auth/react';

const NavItem: React.FC<NavItemProps> = ({ icon, label }) => {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-50">
      <div className="text-gray-600">{icon}</div>
      <span className="font-medium text-gray-700">{label}</span>
    </div>
  );
};

const Divider = () => <div className="h-px bg-gray-200 my-4 mx-2"></div>;

const Sidebar: React.FC = () => {
  const { data: session } = useSession();
  const name = session?.user?.name;
  
  return (
    // Changed to a sticky positioning and removed fixed positioning
    <div className="hidden lg:flex flex-col w-[280px] sticky top-0 h-screen bg-white border-r shadow-sm pt-4">
      {/* Profile section styled like LinkedIn */}
      <div className="relative h-48">
        <div className="absolute inset-0  opacity-90">
          {/* Background design elements */}
          <div className="absolute -left-4 top-2 w-16 h-10 opacity-30"></div>
          <div className="absolute -left-2 top-8 w-16 h-10 opacity-20"></div>
          
          <img 
            src="https://www.iitkgpfoundation.org/images/vault/2638.jpg"
            alt="Cover"
            className="w-full h-32 object-cover mix-blend-overlay"
          />
          
          
          <div className="absolute bottom-1 right-3 text-white font-light italic text-lg">
            IIT Kharagpur
          </div>
        </div>
        <div className="absolute left-8 -bottom-12">
          <div className="p-1 rounded-full bg-white shadow-md">
            <img 
              src="https://media.istockphoto.com/id/1682296067/photo/happy-studio-portrait-or-professional-man-real-estate-agent-or-asian-businessman-smile-for.jpg?s=612x612&w=0&k=20&c=9zbG2-9fl741fbTWw5fNgcEEe4ll-JegrGlQQ6m54rg="
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* User info - LinkedIn style */}
      <div className="mt-14 px-4">
        <h2 className="font-bold text-xl text-gray-800">{name || "Student Name"}</h2>
        <p className="text-sm text-gray-700">UG Student @ IIT Kharagpur | 23HS10063</p>
        <p className="text-sm text-gray-500 mt-1">Lala Lajpat Rai Hall of Residence</p>
        
      </div>

      <Divider />

      {/* Navigation - maintaining your original structure */}
      <nav className="px-4 flex-1 overflow-y-auto">
        <div className="space-y-1">
          <NavItem icon={<Home className="w-5 h-5" />} label="Dashboard" />
          <NavItem icon={<Award className="w-5 h-5" />} label="Scholarship" />
          <NavItem icon={<Briefcase className="w-5 h-5" />} label="Internship" />
          <NavItem icon={<Book className="w-5 h-5" />} label="Academics" />
        </div>
        
        <Divider />
        
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider px-3 mb-2">Communication</p>
        <div className="space-y-1">
          <NavItem icon={<MessageSquare className="w-5 h-5" />} label="Messages" />
          <NavItem icon={<Users className="w-5 h-5" />} label="Guidance Session" />
          <NavItem icon={<Calendar className="w-5 h-5" />} label="Schedule" />
        </div>
        
        <Divider />
        
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider px-3 mb-2">Resources</p>
        <div className="space-y-1">
          <NavItem icon={<Bookmark className="w-5 h-5" />} label="Saved Items" />
          <NavItem icon={<Users className="w-5 h-5" />} label="Groups" />
          <NavItem icon={<Calendar className="w-5 h-5" />} label="Events" />
        </div>
      </nav>

      <div className="p-4 border-t">
        <button 
          className="w-full p-3 bg-indigo-600 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors shadow-sm font-medium"
          onClick={() => signOut()}
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;