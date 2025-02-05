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
      content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur unde quisquam autem cumque deleniti ipsumlfvlknbklnkl hng fnjggn fvf lorem10 dumy dumy dumy",
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
    
      <div className="">
        <div className="w-[58%] flex flex-col  items-center justify-center  h-full">
          <div className="py-4 bg-gray-50  w-full ">
            <SearchBar />
          </div>
            <div className="flex flex-col justify-center items-center space-y-6 w-full ">
              {samplePosts.map((post) => (
                <Post key={post.id} {...post} />
              ))}
            </div>
         
        </div>
        <div className="fixed top-0 right-4 hidden lg:flex items-center justify-center w-[30%] h-screen">
   
            <Achievements />
      
        </div>
      </div>
    
  );
};

export default MainContent;
