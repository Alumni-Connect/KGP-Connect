import React from "react";
import { Award } from "lucide-react";
import { AchievementProps } from "../types";

const Achievement: React.FC<AchievementProps> = ({ title, description, time, xp }) => (
  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-all rounded-md">
    <div className="bg-indigo-100 p-2 rounded-md flex-shrink-0">
      <Award className="w-4 h-4 text-indigo-600" /> 
    </div>
    <div className="flex-1">
      <h3 className="font-medium text-sm">{title}</h3> {/* Smaller title */}
      <p className="text-xs text-gray-500">{description}</p> {/* Smaller description */}
    </div>
    <div className="text-left sm:text-right">
      <span className="text-xs font-semibold text-indigo-600">+{xp} XP</span> {/* Smaller XP text */}
      <p className="text-xs text-gray-400">{time}</p>
    </div>
  </div>
);

const Achievements: React.FC = () => {
  const achievements: AchievementProps[] = [
    { title: "First Article Published", description: "Published your first article on the platform", time: "2 days ago", xp: 50 },
    { title: "100 Profile Views", description: "Your profile has been viewed 100 times", time: "3 days ago", xp: 30 },
    { title: "First Connection", description: "Made your first connection on the platform", time: "4 days ago", xp: 20 },
    
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-full max-w-xs sm:max-w-sm md:max-w-md flex flex-col h-[500px]"> {/* Taller Card */}
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b">
        <div>
          <h2 className="font-semibold text-base">Achievements</h2>
          <p className="text-xs text-gray-500">Track your progress and unlock rewards</p>
        </div>
        <button className="text-xs font-medium text-indigo-600 hover:text-indigo-700">
          View all
        </button>
      </div>

      <div className="space-y-3 overflow-y-auto h-full pr-3 custom-scrollbar">  
        {achievements.map((achievement, index) => (
          <Achievement key={index} {...achievement} />
        ))}
      </div>
    </div>
  );
};

export default Achievements;
