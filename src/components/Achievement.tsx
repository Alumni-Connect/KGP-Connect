import React from 'react';
import { Award } from 'lucide-react';
import { AchievementProps } from '../app/types';

const Achievement: React.FC<AchievementProps> = ({ title, description, time, xp }) => (
  <div className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors">
    <div className="bg-indigo-100 p-2 rounded-lg">
      <Award className="w-6 h-6 text-indigo-600" />
    </div>
    <div className="flex-1">
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
    <div className="text-right">
      <span className="text-sm font-medium">+{xp} XP</span>
      <p className="text-xs text-gray-500">{time}</p>
    </div>
  </div>
);

const Achievements: React.FC = () => {
  // Added more achievements to demonstrate scroll
  const achievements: AchievementProps[] = [
    {
      title: "First Article Published",
      description: "Published your first article on the platform",
      time: "Earned 2 days ago",
      xp: 50
    },
    {
      title: "100 Profile Views",
      description: "Your profile has been viewed 100 times",
      time: "Earned 3 days ago",
      xp: 30
    },
    {
      title: "First Connection",
      description: "Made your first connection on the platform",
      time: "Earned 4 days ago",
      xp: 20
    },
    {
      title: "Profile Completed",
      description: "Completed your profile information",
      time: "Earned 5 days ago",
      xp: 40
    },
    {
      title: "First Comment",
      description: "Posted your first comment",
      time: "Earned 6 days ago",
      xp: 15
    },
    {
      title: "First Article Published",
      description: "Published your first article on the platform",
      time: "Earned 2 days ago",
      xp: 50
    },
    {
      title: "First Article Published",
      description: "Published your first article on the platform",
      time: "Earned 2 days ago",
      xp: 50
    },
    {
      title: "First Article Published",
      description: "Published your first article on the platform",
      time: "Earned 2 days ago",
      xp: 50
    },
    {
      title: "First Article Published",
      description: "Published your first article on the platform",
      time: "Earned 2 days ago",
      xp: 50
    }
  ];

  return (
    <div className="bg-white rounded-lg border">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-bold text-xl">Achievements</h2>
            <p className="text-sm text-gray-500">Track your progress and unlock rewards</p>
          </div>
          <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
            View all
          </button>
        </div>
      </div>
      <div className="divide-y">
        {achievements.map((achievement, index) => (
          <Achievement key={index} {...achievement} />
        ))}
      </div>
    </div>
  );
};

export default Achievements;