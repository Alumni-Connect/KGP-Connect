import React from "react";

const LifeFellows = () => {
  const profiles = [
    {
      name: "Dr. Suhas S. Patil",
      year: "2002",
      image: "/life_fellow/Suhas.jpg",
    },
    {
      name: "Mr. Arjun Malhotra",
      year: "2002",
      image: "/life_fellow/Arjun.png",
    },
    {
      name: "Mr. Bijoy G. Chatterjee",
      year: "2002",
      image: "/life_fellow/Bijoy.jpg",
    },
    { name: "Mr. Vinod Gupta", year: "2002", image: "/life_fellow/Vinod.jpg" },
    {
      name: "Dr. Purnendu Chatterjee",
      year: "2003",
      image: "/life_fellow/Purnendu.jpg",
    },
    {
      name: "Shri Brijendra Kumar Syngal",
      year: "2003",
      image: "/life_fellow/bijendra.jpg",
    },
    {
      name: "Dr. Satyendranath Das",
      year: "2003",
      image: "/life_fellow/drsdas.jpg",
    },
    {
      name: "Professor Anadi Sankar Gupta",
      year: "2003",
      image: "/life_fellow/user-male.png",
    },
    {
      name: "Professor G. S. Sanyal",
      year: "2003",
      image: "/life_fellow/GSS.jpg",
    },
  ];
  return (
    <div>
      <h2 className="text-2xl font-bold border-b pb-2 mb-4">Life Fellow</h2>
      <div className="flex flex-wrap justify-center gap-8 p-6">
        {profiles.map((profile, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center w-40"
          >
            <img
              src={profile.image}
              alt={profile.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
            />
            <p className="mt-2 font-semibold text-gray-800">{profile.name}</p>
            <p className="text-gray-500">{profile.year}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LifeFellows;
