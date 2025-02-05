"use client"
import Button from "@/components/Btn";
import { Award, ChevronDown, ChevronUp, Presentation } from "lucide-react";
import { useState } from "react";

function Meeting() {
 
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col w-full px-8 py-3  bg-gray-50 rounded-lg  border-2 ">
      <div className="flex w-full gap-6 items-center ">
      <Presentation className="w-10 h-10 text-indigo-400"  />
      <div className="flex justify-between items-center w-full">
        <div className="flex gap-2 items-center justify-center">
          <h1 className="font-bold text-lg">ABC Meeting</h1>
         
          {
            <button className="border-b-2  text-gray-600 border-gray-5-0" onClick={()=>setIsOpen((open)=>!open)}>{!isOpen?"Details":"View Less"}</button>
          }
          
          
        </div>
       
          <button className="px-4 py-2 border-2 font-bold border-red-600 rounded-lg hover:bg-red-500 hover:text-white">Join</button>
        
      </div>
      </div>
      
      {
        isOpen&&<div className="mt-4 border-t-2 py-2 animate-floatY">
          <h1 className="font-semibold text-lg">About</h1>
          <ol className="list-disc pl-6 flex flex-col gap-1">
            <li className="text-gray-700">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore, rem?</li>
            <li className="text-gray-700">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore, rem?</li>
            <li className="text-gray-700">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore, rem?</li>
            <li className="text-gray-700">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore, rem?</li>
            <li className="text-gray-700">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore, rem?</li>
          </ol>
        </div>
      }
    </div>
  );
}

export default function Page() {
  // const img=["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmelJrnGR1FGAmi6wAYY39sBU-9ZDYmI8XNA&s","https://static.wixstatic.com/media/400eca_2a34c721d9c74cef898ee2ded7b158bf~mv2.jpg/v1/fill/w_980,h_562,al_c/400eca_2a34c721d9c74cef898ee2ded7b158bf~mv2.jpg"]
  // let src
  // for(let i=0;i<img.length;i++){
    
  //    src=img[i]
  //    if(i==img.length-1){i=0;}
  // }
  return (
  <div className="relative flex flex-col gap-6 items-center justify-center">
    <img src={"https://static.wixstatic.com/media/400eca_2a34c721d9c74cef898ee2ded7b158bf~mv2.jpg/v1/fill/w_980,h_562,al_c/400eca_2a34c721d9c74cef898ee2ded7b158bf~mv2.jpg"} className="w-full "></img> 
    <div className="absolute top-0 left-0 h-full w-full bg-[rgba(0,0,0,0.6)]"></div>
    
     <div className="absolute flex flex-col gap-6 w-[60%] max-h-[400px] overflow-y-auto pr-3">
      <Meeting />
      <Meeting />
      <Meeting />
      <Meeting />
      <Meeting />
      <Meeting />
      
     </div> 
  </div>
  );
}