import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Camera, X } from "lucide-react";
import { motion } from "framer-motion";
import ProfileTabs from "./DashboardSocial";
const hallsOfIITKGP = [
  "LBS Hall",
  "MMM Hall",
  "RP Hall",
  "Nehru Hall",
  "Azad Hall",
  "JCB Hall",
  "Patel Hall",
  "RK Hall",
  "HJB Hall",
  "VS Hall",
  "Gokhale Hall",
  "MT Hall",
  "SN/IG Hall",
];
const departments = [
  "Aerospace Engineering",
  "Agricultural & Food Engineering",
  "Architecture & Regional Planning",
  "Biotechnology",
  "Chemical Engineering",
  "Chemistry",
  "Civil Engineering",
  "Computer Science & Engineering",
  "Electrical Engineering",
  "Electronics & Electrical Communication Engineering",
  "Geology & Geophysics",
  "Humanities & Social Sciences",
  "Industrial & Systems Engineering",
  "Mathematics",
  "Mechanical Engineering",
  "Metallurgical & Materials Engineering",
  "Mining Engineering",
  "Ocean Engineering & Naval Architecture",
  "Physics",
];
// Dummy User Data
const dummyUser = {
  name: "Dhruv Gupta",
  profileImage: "/default-avatar.png",
  instituteEmail: "dhruv@iitkgp.ac.in",
  personalEmail: "dhruv.personal@email.com",
  rollNumber: "21EC1001",
  program: "UG",
  contactNumber: "+91 9876543210",
  hallName: "Patel Hall of Residence",
  department: "Chemical Engineering",
  likedPosts: ["Post 1", "Post 2", "Post 3"],
  commentedPosts: ["Post A", "Post B"],
  savedPosts: ["Post X", "Post Y", "Post Z"],
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DashboardModal({ isOpen, onClose }: ModalProps) {
  const [user, setUser] = useState(dummyUser);
  const [editing, setEditing] = useState(false);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[100]">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-gray-100 text-black p-6 rounded-lg shadow-lg h-[600px] overflow-y-scroll"
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-xl font-semibold text-indigo-600">
            User Dashboard
          </h2>
          <button onClick={onClose} className="text-gray-800 hover:text-black">
            <X size={20} className="cursor-pointer" />
          </button>
        </div>

        {/* Profile Section */}
        <div className="flex items-center gap-4 mt-4">
          <div className="relative">
            <Avatar className="w-16 h-16 cursor-pointer border-orange-500 border-2">
              <AvatarImage src={user.profileImage} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            {editing && (
              <label className="absolute bottom-0 right-0 bg-gray-200 p-1 rounded-full cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setUser((prev) => ({
                          ...prev,
                          profileImage: reader.result as string,
                        }));
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                <Camera className="w-4 h-4 text-gray-600" />
              </label>
            )}
          </div>
          <div className="flex flex-col">
            {editing ? (
              <Input
                name="name"
                value={user.name}
                onChange={(e) =>
                  setUser((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            ) : (
              <h3 className="text-lg font-semibold">{user.name}</h3>
            )}

            {/* Editable Program & Department */}
            <div className="flex gap-2 text-sm text-gray-600 mt-2 items-center">
              {editing ? (
                <Select
                  value={user.program}
                  // onValueChange={(value) => setUser((prev) => ({ ...prev, program: value }))}
                >
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Program" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UG">UG</SelectItem>
                    <SelectItem value="PG">PG</SelectItem>
                    <SelectItem value="RS">RS</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <span>{user.program}</span>
              )}

              <span className="font-semibold">-</span>

              {editing ? (
                <Select
                  value={user.department}
                  // onValueChange={(value) => setUser((prev) => ({ ...prev, department: value }))}
                >
                  <SelectTrigger className="w-[250px]">
                    <SelectValue placeholder="Select Department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <span>{user.department}</span>
              )}
            </div>
          </div>
        </div>

        {/* Editable Details */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Institute Email */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-600">Institute Email</label>
            {editing ? (
              <Input
                name="instituteEmail"
                value={user.instituteEmail}
                onChange={handleInputChange}
              />
            ) : (
              <p className="text-gray-800">{user.instituteEmail}</p>
            )}
          </div>

          {/* Personal Email */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-600">Personal Email</label>
            {editing ? (
              <Input
                name="personalEmail"
                value={user.personalEmail}
                onChange={handleInputChange}
              />
            ) : (
              <p className="text-gray-800">{user.personalEmail}</p>
            )}
          </div>

          {/* Roll Number */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-600">Roll Number</label>
            {editing ? (
              <Input
                name="rollNumber"
                value={user.rollNumber}
                onChange={handleInputChange}
              />
            ) : (
              <p className="text-gray-800">{user.rollNumber}</p>
            )}
          </div>

          {/* Hall Name */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-600">Hall Name</label>
            {editing ? (
              <Select
              // onValueChange={(value) => handleInputChange({ target: { name: "hallName", value } })}
              >
                <SelectTrigger className="border p-2 rounded-md">
                  <SelectValue placeholder={user.hallName || "Select Hall"} />
                </SelectTrigger>
                <SelectContent>
                  {hallsOfIITKGP.map((hall, index) => (
                    <SelectItem key={index} value={hall}>
                      {hall}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <p className="text-gray-800">{user.hallName}</p>
            )}
          </div>

          {/* Contact Number */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-600">Contact Number</label>
            {editing ? (
              <Input
                name="contactNumber"
                value={user.contactNumber}
                onChange={handleInputChange}
              />
            ) : (
              <p className="text-gray-800">{user.contactNumber}</p>
            )}
          </div>
        </div>

        {/* Activity Section */}
        <ProfileTabs />

        {/* Action Buttons */}
        <div className="mt-4 flex justify-between">
          <Button onClick={() => setEditing(!editing)} variant="outline">
            {editing ? "Save" : "Edit"}
          </Button>
          <Button
            onClick={onClose}
            className="bg-orange-600 text-white hover:bg-indigo-600"
          >
            Close
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
