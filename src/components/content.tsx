import React from "react";
import SearchBar from "./SearchBar";
import Post from "./Post";
import Achievements from "./Achievement";
import { PostProps } from "../app/types";

const MainContent: React.FC = () => {
  const samplePosts: PostProps[] = [
    {
      id: "1",
      author: {
        name: "Dhruv Gupta",
        image: "https://media.istockphoto.com/id/1682296067/photo/happy-studio-portrait-or-professional-man-real-estate-agent-or-asian-businessman-smile-for.jpg?s=612x612&w=0&k=20&c=9zbG2-9fl741fbTWw5fNgcEEe4ll-JegrGlQQ6m54rg=",
      },
      content: "Lorem ipsum dolor sit amet...",
      image: "https://media.istockphoto.com/id/1682296067/photo/happy-studio-portrait-or-professional-man-real-estate-agent-or-asian-businessman-smile-for.jpg?s=612x612&w=0&k=20&c=9zbG2-9fl741fbTWw5fNgcEEe4ll-JegrGlQQ6m54rg=",
      likes: 122,
      comments: 6,
      timeAgo: "5h",
    },
    {
      id: "2",
      author: {
        name: "Dhruv Gupta",
        image: "https://media.istockphoto.com/id/1682296067/photo/happy-studio-portrait-or-professional-man-real-estate-agent-or-asian-businessman-smile-for.jpg?s=612x612&w=0&k=20&c=9zbG2-9fl741fbTWw5fNgcEEe4ll-JegrGlQQ6m54rg=",
      },
      content: "Lorem ipsum dolor sit amet...",
      image: "https://media.istockphoto.com/id/1682296067/photo/happy-studio-portrait-or-professional-man-real-estate-agent-or-asian-businessman-smile-for.jpg?s=612x612&w=0&k=20&c=9zbG2-9fl741fbTWw5fNgcEEe4ll-JegrGlQQ6m54rg=",
      likes: 122,
      comments: 6,
      timeAgo: "5h",
    },

    {
      id: "3",
      author: {
        name: "Dhruv Gupta",
        image: "https://media.istockphoto.com/id/1682296067/photo/happy-studio-portrait-or-professional-man-real-estate-agent-or-asian-businessman-smile-for.jpg?s=612x612&w=0&k=20&c=9zbG2-9fl741fbTWw5fNgcEEe4ll-JegrGlQQ6m54rg=",
      },
      content: "Lorem ipsum dolor sit amet...",
      image: "https://media.istockphoto.com/id/1682296067/photo/happy-studio-portrait-or-professional-man-real-estate-agent-or-asian-businessman-smile-for.jpg?s=612x612&w=0&k=20&c=9zbG2-9fl741fbTWw5fNgcEEe4ll-JegrGlQQ6m54rg=",
      likes: 122,
      comments: 6,
      timeAgo: "5h",
    },{
      id: "4",
      author: {
        name: "Dhruv Gupta",
        image: "https://media.istockphoto.com/id/1682296067/photo/happy-studio-portrait-or-professional-man-real-estate-agent-or-asian-businessman-smile-for.jpg?s=612x612&w=0&k=20&c=9zbG2-9fl741fbTWw5fNgcEEe4ll-JegrGlQQ6m54rg=",
      },
      content: "Lorem ipsum dolor sit amet...",
      image: "https://media.istockphoto.com/id/1682296067/photo/happy-studio-portrait-or-professional-man-real-estate-agent-or-asian-businessman-smile-for.jpg?s=612x612&w=0&k=20&c=9zbG2-9fl741fbTWw5fNgcEEe4ll-JegrGlQQ6m54rg=",
      likes: 122,
      comments: 6,
      timeAgo: "5h",
    },{
      id: "5",
      author: {
        name: "Dhruv Gupta",
        image: "https://media.istockphoto.com/id/1682296067/photo/happy-studio-portrait-or-professional-man-real-estate-agent-or-asian-businessman-smile-for.jpg?s=612x612&w=0&k=20&c=9zbG2-9fl741fbTWw5fNgcEEe4ll-JegrGlQQ6m54rg=",
      },
      content: "Lorem ipsum dolor sit amet...",
      image: "https://media.istockphoto.com/id/1682296067/photo/happy-studio-portrait-or-professional-man-real-estate-agent-or-asian-businessman-smile-for.jpg?s=612x612&w=0&k=20&c=9zbG2-9fl741fbTWw5fNgcEEe4ll-JegrGlQQ6m54rg=",
      likes: 122,
      comments: 6,
      timeAgo: "5h",
    },
    {
      id: "6",
      author: {
        name: "Dhruv Gupta",
        image: "https://media.istockphoto.com/id/1682296067/photo/happy-studio-portrait-or-professional-man-real-estate-agent-or-asian-businessman-smile-for.jpg?s=612x612&w=0&k=20&c=9zbG2-9fl741fbTWw5fNgcEEe4ll-JegrGlQQ6m54rg=",
      },
      content: "Lorem ipsum dolor sit amet...",
      image: "https://media.istockphoto.com/id/1682296067/photo/happy-studio-portrait-or-professional-man-real-estate-agent-or-asian-businessman-smile-for.jpg?s=612x612&w=0&k=20&c=9zbG2-9fl741fbTWw5fNgcEEe4ll-JegrGlQQ6m54rg=",
      likes: 122,
      comments: 6,
      timeAgo: "5h",
    },
{
      id: "7",
      author: {
        name: "Dhruv Gupta",
        image: "https://media.istockphoto.com/id/1682296067/photo/happy-studio-portrait-or-professional-man-real-estate-agent-or-asian-businessman-smile-for.jpg?s=612x612&w=0&k=20&c=9zbG2-9fl741fbTWw5fNgcEEe4ll-JegrGlQQ6m54rg=",
      },
      content: "Lorem ipsum dolor sit amet...",
      image: "https://media.istockphoto.com/id/1682296067/photo/happy-studio-portrait-or-professional-man-real-estate-agent-or-asian-businessman-smile-for.jpg?s=612x612&w=0&k=20&c=9zbG2-9fl741fbTWw5fNgcEEe4ll-JegrGlQQ6m54rg=",
      likes: 122,
      comments: 6,
      timeAgo: "5h",
    },

  ];

  return (
    <div className="lg:ml-[280px] h-screen pt-16 flex">
      <div className="max-w-5xl mx-auto px-4 flex-grow flex gap-6 h-full">
        <div className="lg:w-2/3 flex flex-col h-full">
          <div className="py-4 bg-gray-50 sticky top-0 z-10">
            <SearchBar />
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
            <div className="space-y-6 pb-6">
              {samplePosts.map((post) => (
                <Post key={post.id} {...post} />
              ))}
            </div>
          </div>
        </div>
        <div className="hidden lg:flex w-1/3 h-full">
          <div className="h-full w-full overflow-y-auto custom-scrollbar pr-2">
            <Achievements />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
