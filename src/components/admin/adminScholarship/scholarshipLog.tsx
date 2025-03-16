"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Define TypeScript interfaces
// interface Scholarship {
//   id: number;
//   name: string;
//   amount: number;
//   eligibility: string;
//   deadline: string;
//   department: string;
//   status: 'Active' | 'Draft' | 'Expired';
// }

interface props{
    scholarship : any
}

const ScholarshipLogs = ({scholarship}:props) => {
  // Sample data for demonstration
  const [scholarships, setScholarships] = useState([]);
  const router=useRouter()

  useEffect(()=>{
    setScholarships(scholarship)
  },[])

  // Find the scholarship currently being edited

  return (
    <div className="p-3 w-5/6 mt-16 mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Scholarship Management</h1>
        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition-all duration-200 animate-fade-in" onClick={()=>{router.push("scholarship/update")}}>
          + Create New Scholarship
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden animate-fade-in-up">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scholarship Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date (₹)</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deadline</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preview</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {scholarships.map((scholarship:any) => (
                <tr key={scholarship.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{scholarship.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{scholarship.createdAt.toISOString().split('T')[0]}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{scholarship.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{scholarship.lastDate.toISOString().split('T')[0]}</div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      scholarship.isVerified === true
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {scholarship.isVerified=== false ? "Pending" : "Active"}
                    </span>
                  </td>
                  {scholarship.isVerified===true ?  <td className="px-6 py-4 whitespace-nowrap">
                     <button className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      'bg-blue-100 text-blue-800'    
                    }`} onClick={()=> router.push(`/scholarship-admin/responses/${scholarship.id}`)}>
                      View-Responses
                    </button>
                  </td>: <td className="px-6 py-4 whitespace-nowrap">
                     <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      'bg-green-100 text-green-800'    
                    }`}>
                     No-Responses
                    </span>
                  </td>}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      className="text-indigo-600 hover:text-indigo-900 mr-4 transition-colors duration-150"
                      onClick={() => router.push(`scholarship-admin/update/${scholarship.id}`)}
                    >
                      Edit
                    </button>
                    <button 
                      className="text-red-600 hover:text-red-900 transition-colors duration-150"
                      onClick={async() => {
                        try{
                        const response= await fetch(`/api/scholarships/adminsOperation?scholarshipId=${scholarship.id}`, {method:"DELETE"})
                        if(response.status===200){
                        const result= response.json()
                        setScholarships(scholarships.filter((sch:any)=> sch.id!==scholarship.id ))
                        }
                        }catch(e){
                            console.log(e)
                        }
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Editing Modal */}
    
    </div>
  );
};

export default ScholarshipLogs;