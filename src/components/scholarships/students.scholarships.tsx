"use client"
import Button from "@/components/Btn";
import { Award, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export default function Scholarship({description,title,eligibility,createdAt,createdBy}:{description:string,title:string,eligibility: string[],createdBy:string,createdAt:Date}) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="flex flex-col w-full px-8 py-3  bg-gray-50 rounded-lg  border-2 ">
      <div className="flex w-full gap-6 items-center ">
      <Award className="w-10 h-10" />
      <div className="flex justify-between items-center w-full">
        <div>
          <h1 className="font-bold text-xl text-gray-800">{title}</h1>
          <p className="text-sm text-gray-700">Dhruv Gupta</p>
        </div>
        <div className="flex gap-3" onClick={() => setIsOpen(!isOpen)}>
          <div className="flex gap-1 items-center cursor-pointer">
          <Button variant="secondary" size="lg" text="Details" />
          </div> 
          <Button variant="primary" size="lg" text="Apply" />
        </div>
      </div>
      </div>
      
      {
        isOpen&&<div className="mt-4 border-t-2 py-2 animate-floatY">
          <h1 className="font-semibold text-lg">Eligibility</h1>
          <ol className="list-disc pl-6 flex flex-col gap-1">
            {eligibility.map((el,index)=>{
               return (
                <li key={index} className="text-gray-700">{el}</li>
               )
            })}
          </ol>
        </div>
      }
    </div>
  );
}