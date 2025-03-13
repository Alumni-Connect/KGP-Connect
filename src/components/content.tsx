"use client";
import React, { useState } from "react";
import Post from "./Post";
import { PostProps } from "../types";
import { Image, Video, Smile, MapPin } from "lucide-react";
import PostCreationModal from "./PostCreationModal";

const MainContent: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState<PostProps[]>([
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
  ]);

  // Function to Add a New Post
  const handlePost = (content: string, image: string | null) => {
    const newPost: PostProps = {
      id: Date.now().toString(),
      author: {
        name: "User Name",
        image: "https://avatars.githubusercontent.com/u/9919?v=4",
      },
      content,
      //@ts-ignore
      image,
      likes: 0,
      comments: 0,
      timeAgo: "Just now",
    };
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="h-screen pt-16 flex justify-center bg-gray-100 px-4 sm:px-6">
      <div className="w-full max-w-2xl mx-auto flex flex-col h-full">
        <div className="bg-white shadow-md rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-3">
            <img
              src="https://avatars.githubusercontent.com/u/9919?v=4"
              alt="User"
              className="w-10 h-10 rounded-full object-cover"
            />
            <button
              className="w-full bg-gray-100 text-gray-600 text-left py-2 px-4 rounded-full hover:bg-gray-200 transition"
              onClick={() => setIsModalOpen(true)}
            >
              What's on your mind?
            </button>
          </div>
          <div className="flex justify-around mt-3 border-t pt-3">
            <button className="flex items-center space-x-2 text-indigo-600 hover:bg-indigo-100 px-3 py-2 rounded-md transition">
              <Image className="w-5 h-5" />
              <span>Photo</span>
            </button>
            <button className="flex items-center space-x-2 text-red-600 hover:bg-red-100 px-3 py-2 rounded-md transition">
              <Video className="w-5 h-5" />
              <span>Video</span>
            </button>
            <button className="flex items-center space-x-2 text-yellow-500 hover:bg-yellow-100 px-3 py-2 rounded-md transition">
              <Smile className="w-5 h-5" />
              <span>Feeling</span>
            </button>
            <button className="flex items-center space-x-2 text-green-600 hover:bg-green-100 px-3 py-2 rounded-md transition">
              <MapPin className="w-5 h-5" />
              <span>Location</span>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="space-y-6 pb-6">
            {posts.map((post) => (
              <div key={post.id} className="bg-white p-5 rounded-lg shadow-md">
                <Post {...post} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <PostCreationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default MainContent;
