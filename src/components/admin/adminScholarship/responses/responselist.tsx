"use client"

import React from "react";
import { useState } from "react";
import Link from "next/link";

interface UserInfo {
    id: string;
    name: string;
    email: string;
    department: string;
    hall: string;
    rollNumber: string;
    curriculumVitae:string;
    responses: {
      question: string;
      answer: string;
    }[];
  }


export default function ResponseList({currentUsers}:{currentUsers:UserInfo[]}){
    const [expandedUser, setExpandedUser] = useState<string | null>(null);
 
     const toggleDropdown = (userId: string) => {
      if (expandedUser === userId) {
      setExpandedUser(null);
     } else {
      setExpandedUser(userId);
     }
     };

  
    return (
    
    <>
    {currentUsers.map((user) => (
        <React.Fragment key={user.id}>
          <tr className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.id}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.department}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.hall}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.rollNumber}</td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button
                onClick={() => toggleDropdown(user.id)}
                className="text-blue-600 hover:text-blue-900 focus:outline-none flex items-center"
              >
                <span>Responses</span>
                <svg
                  className={`ml-2 h-5 w-5 transition-transform ${expandedUser === user.id ? 'transform rotate-180' : ''}`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </td>
          </tr>
          <tr>
                    
          </tr>
          {expandedUser === user.id && (
            <tr>
              <td colSpan={7} className="px-6 py-4 bg-gray-50">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Responses</h4>
                  <Link 
                   href={user.curriculumVitae} 
                   className="text-blue-600 underline hover:text-blue-800 font-medium text-sm  py-3"
                   >
                   Click here to get the CV of the student
                  </Link> 
                  <div className="space-y-2">
                    {user.responses.map((response, index) => (
                      <div key={index} className="bg-white p-3 rounded shadow-sm">
                        <p className="font-medium text-sm text-gray-700">{response.question}</p>
                        <p className="text-sm text-gray-600 mt-1">{response.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </td>
            </tr>
          )}
        </React.Fragment>
      ))}

    </>
    )
}