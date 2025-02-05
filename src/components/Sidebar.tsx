"use client"
import React from 'react';
import { LogOut, Award, Briefcase, MessageSquare, Users } from 'lucide-react';
import { NavItemProps } from '../app/types';
import { signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import Button from './Btn';
import { usePathname } from 'next/navigation';
import Link from 'next/link';



const NavItem: React.FC<NavItemProps> = ({ icon, label }) => {
  const pathname = usePathname(); // Get the current route

  return (
    <div
      className={`flex items-center gap-3 p-3  rounded-lg cursor-pointer ${
        pathname === `/user/${label.toLowerCase().replace(" ","_")}` ? "bg-indigo-500 text-white " : "bg-white hover:bg-gray-100"
      }`}
    >
      <div className={` ${
        pathname === `/user/${label.toLowerCase().replace(" ","_")}` ? " text-white" : "text-gray-600"
      }`}>{icon}</div>
      <span className="font-medium">{label}</span>
    </div>
  );
};

const Sidebar: React.FC = () => {

  const name = useSession().data?.user?.name

  return (
    <div className="flex-col w-[320px] fixed left-0 top-16 h-screen bg-white border-r">

      <div>
        <img
          src="https://www.iitkgpfoundation.org/images/vault/2638.jpg"
          alt="Cover"
          className="w-full h-32 object-cover"
        />
        <div className="relative top-[-40px] flex flex-col items-center justify-center  ">
          <img
            src="https://media.istockphoto.com/id/1682296067/photo/happy-studio-portrait-or-professional-man-real-estate-agent-or-asian-businessman-smile-for.jpg?s=612x612&w=0&k=20&c=9zbG2-9fl741fbTWw5fNgcEEe4ll-JegrGlQQ6m54rg="
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-white"
          />
          <div className=" flex flex-col items-center ">
            <h2 className="font-bold text-xl">Dhruv Gupta</h2>
            <p className="text-gray-600">23HS10063</p>
            <p className="text-sm text-gray-500 mt-1">Lala Lajpat Rai Hall of Residence</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col mx-4 py-1 border-t-2 border-b-2 space-y-2">
        <Link href="/user/scholarship"><NavItem icon={<Award />} label="Scholarship" /></Link>
        <Link href="/user/internship"><NavItem icon={<Briefcase />} label="Internship" /></Link>
        <Link href="/user/message"><NavItem icon={<MessageSquare />} label="Messages" /></Link>
        <Link href="/user/guidance_session"><NavItem icon={<Users />} label="Guidance Session" /></Link>  
      </div>

      <div className="flex justify-center items-center gap-4 mt-5  ">
        <Button variant="primary" size="md" text="View Profile" />
        <Button variant="secondary" size="md" text="Saved Posts" />
      </div>
    </div>
  );
};

export default Sidebar;