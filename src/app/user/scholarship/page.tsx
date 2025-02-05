"use client"
import Button from "@/components/Btn";
import { Award, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

function Scholarship() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col w-full px-8 py-3  bg-gray-50 rounded-lg  border-2 ">
      <div className="flex w-full gap-6 items-center ">
      <Award className="w-10 h-10" />
      <div className="flex justify-between items-center w-full">
        <div>
          <h1 className="font-bold text-xl">ABC Scholarship</h1>
          <p className="text-gray-600 font-normal text-right">Dhruv Gupta</p>
        </div>
        <div className="flex gap-3" onClick={() => setIsOpen(!isOpen)}>
          <div className="flex gap-1 items-center cursor-pointer">
          <Button variant="secondary" size="lg" text="Details" />
          {
            isOpen?<ChevronUp className="w-6 h-6 bg-blue-100 rounded-[12px]" />:<ChevronDown className="w-6 h-6 bg-blue-100 rounded-[12px]" />
          }
          
          </div> 
          <Button variant="primary" size="lg" text="Apply" />
        </div>
      </div>
      </div>
      
      {
        isOpen&&<div className="mt-4 border-t-2 py-2 animate-floatY">
          <h1 className="font-semibold text-lg">Eligibility</h1>
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
  return (
  <div className=" flex flex-col px-6 py-5  gap-6 items-center justify-center">
    {/* <img src="https://static.wixstatic.com/media/400eca_2a34c721d9c74cef898ee2ded7b158bf~mv2.jpg/v1/fill/w_980,h_562,al_c/400eca_2a34c721d9c74cef898ee2ded7b158bf~mv2.jpg" className="w-full "></img> */}
    {/* <div className="absolute top-0 left-0 h-full w-full bg-[rgba(0,0,0,0.6)]"></div> */}
    
    {/* <div className=" flex flex-col gap-6 w-[60%] max-h-[500px] overflow-y-auto pr-3"> */}
      <Scholarship />
      <Scholarship />
      <Scholarship />
      
    {/* </div> */}
  </div>
  );
}
