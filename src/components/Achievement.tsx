import React from "react";
import { Award } from "lucide-react";
import { AchievementProps } from "../types";

const Achievement: React.FC<AchievementProps> = ({ title, description, time, xp }) => (
  <div className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-all rounded-md">
    <div className="bg-indigo-100 p-2 rounded-md">
      <Award className="w-5 h-5 text-indigo-600" />
    </div>
    <div className="flex-1">
      <h3 className="font-medium text-sm">{title}</h3>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
    <div className="text-right">
      <span className="text-xs font-semibold text-indigo-600">+{xp} XP</span>
      <p className="text-xs text-gray-400">{time}</p>
    </div>
  </div>
);

const Achievements: React.FC = () => {
  const achievements: AchievementProps[] = [
    { title: "First Article Published", description: "Published your first article on the platform", time: "2 days ago", xp: 50 },
    { title: "100 Profile Views", description: "Your profile has been viewed 100 times", time: "3 days ago", xp: 30 },
    { title: "First Connection", description: "Made your first connection on the platform", time: "4 days ago", xp: 20 },
    { title: "Profile Completed", description: "Completed your profile information", time: "5 days ago", xp: 40 },
    { title: "First Comment", description: "Posted your first comment", time: "6 days ago", xp: 15 }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md border pt-16">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b">
        <div>
          <h2 className="font-semibold text-base">Achievements</h2>
          <p className="text-xs text-gray-500">Track your progress and unlock rewards</p>
        </div>
        <button className="text-xs font-medium text-indigo-600 hover:text-indigo-700">
          View all
        </button>
      </div>

      {/* Achievements List */}
      <div className="divide-y mt-3 space-y-2">
        {achievements.map((achievement, index) => (
          <Achievement key={index} {...achievement} />
        ))}
      </div>
    </div>
  );
};

export default Achievements;
