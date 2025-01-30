import { GraduationCap, Briefcase, MessagesSquare, Users } from "lucide-react";
import Button from "./Btn";


export default function Sidebar() {
  return (
    <div className="fixed top-16 left-0 flex flex-col h-screen border-r border-gray-200 bg-white w-[360px] shadow-sm z-50">
      {/* Banner with gradient overlay */}
      <div className="relative h-[100px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-blue-500/20 z-10" />
        <img
          src="https://www.iitkgpfoundation.org/images/vault/2638.jpg"
          className="w-[360px] h-[100px] object-cover"
          alt="KGP Banner"
        />
      </div>

      {/* Profile Section */}
      <div className="flex flex-col items-center px-6 relative">
        <div className="absolute -top-10">
          <div className="ring-4 ring-white rounded-full shadow-lg">
            <img
              src="https://media.istockphoto.com/id/1682296067/photo/happy-studio-portrait-or-professional-man-real-estate-agent-or-asian-businessman-smile-for.jpg?s=612x612&w=0&k=20&c=9zbG2-9fl741fbTWw5fNgcEEe4ll-JegrGlQQ6m54rg="
              className="w-[80px] h-[80px] rounded-full object-cover"
              alt="Profile"
            />
          </div>
        </div>
        <div className="mt-[48px] text-center">
          <h1 className="text-xl font-semibold text-gray-900">Dhruv Gupta</h1>
          <p className="text-gray-500 mt-0.5">23HS10063</p>
          <p className="text-gray-500 text-sm mt-1">Lala Lajpat Rai Hall of Residence</p>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex flex-col mt-6 px-3">
        <div className="space-y-1.5">
          {[
            { name: "Scholarship", icon: GraduationCap },
            { name: "Internship", icon: Briefcase },
            { name: "Messages", icon: MessagesSquare },
            { name: "Guidance Session", icon: Users },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50/80 cursor-pointer group transition-colors"
            >
              <item.icon size={22} className="text-indigo-600 group-hover:text-indigo-700" />
              <span className="text-gray-700 group-hover:text-gray-900 font-medium">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Logout Button */}
      <div className="mt-auto border-t border-gray-100">
      <div className="flex flex-col gap-3 p-4">
      <Button
            variant="primary"
            size="md"
            text="Logout"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
          />
        <Button
            variant="secondary"
            size="md"
            text="Saved Posts"
            className="w-full border border-gray-200 text-gray-700 hover:bg-gray-50"
          />
      </div>
      </div>
    </div>
  );
}
