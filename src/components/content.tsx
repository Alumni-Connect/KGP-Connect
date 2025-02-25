import React from "react";
import SearchBar from "./SearchBar";
import Post from "./Post";
import { PostProps } from "../types";

const MainContent: React.FC = () => {
  const samplePosts: PostProps[] = [
    {
      id: "1",
      author: {
        name: "Dhruv Gupta",
        image: "https://www.iitkgpfoundation.org/images/vault/2638.jpg",
      },
      content: "Lorem ipsum dolor sit amet...",
      image: "https://www.iitkgpfoundation.org/images/vault/2638.jpg",
      likes: 122,
      comments: 6,
      timeAgo: "5h",
    },
    {
      id: "2",
      author: {
        name: "Ananya Sharma",
        image: "https://media.istockphoto.com/id/1674904796/photo/successful-business-woman.jpg",
      },
      content: "Excited to start my new journey!",
      image: "https://media.istockphoto.com/id/1685794201/photo/cityscape.jpg",
      likes: 98,
      comments: 12,
      timeAgo: "2h",
    },
    {
      id: "3",
      author: {
        name: "Rahul Verma",
        image: "https://media.istockphoto.com/id/1682296067/photo/happy-studio-portrait-or-professional-man-real-estate-agent-or-asian-businessman-smile-for.jpg",
      },
      content: "Just finished a new project 🚀",
      image: "https://media.istockphoto.com/id/1685794201/photo/cityscape.jpg",
      likes: 200,
      comments: 24,
      timeAgo: "1d",
    },
  ];

  return (
    <div className="h-screen pt-16 flex justify-center bg-gray-100 ml-6 mr-0">
      <div className="w-full max-w-5xl mx-auto sm:px-6 lg:px-8 flex flex-col h-full">
        
        {/* Search Bar - Sticky */}
        <div className=" mx-3 py-3 bg-white sticky  border-b shadow-md px-4 rounded-lg mb-6">
          <SearchBar />
        </div>

        {/* Posts - Scrollable & Centered */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="max-w-2xl mx-auto space-y-6 pb-6">
            {samplePosts.map((post) => (
              <div key={post.id} className="bg-white p-5 rounded-lg shadow-md">
                <Post {...post} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
