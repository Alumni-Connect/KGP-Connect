"use client"

import { ScholarshipType } from '@/types';
import { FaStar, FaRegBookmark, FaLink, FaBriefcase, FaClock } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import NotificationContainer, { subset } from "../../components/notifier";


type notifyVar=Pick<subset, "duration" | "message" | "type">


 const ScholarshipId= ({scholarship}:{scholarship:ScholarshipType})=>{
    const [notification,setNotification]=useState<notifyVar[]>([])
  
    const router = useRouter()
    const callNotification=(type:string,msg:string)=>{
      setNotification((prev)=>[...prev,{type:type,message:msg,duration:1000}])
                  setTimeout(() => {
                   const filteredOne=notification.filter((notify)=> notify.message!==msg)
                   setNotification((prev)=>[...prev,...filteredOne])
                  }, 1000);
    }
   
    return(
        <div className='md:flex md:justify-center md:items-center'>
         <div className="w-full sticky top-0">
                      <div className="bg-white rounded-lg border p-4 h-full max-h-screen overflow-y-auto">
                        <div className="flex justify-between mb-2">
                          <h2 className="text-2xl font-bold">{scholarship.title}</h2>
                          <button onClick={()=>{
                            router.push("/scholarships")
                          }} className="text-gray-500">
                            <IoMdClose size={24} />
                          </button>
                        </div>
                        
                        <div className="flex items-center mb-2">
                          <a href="#" className="text-blue-600 font-medium mr-2">Indian Institute Of Technology KHARAGPUR</a>
                          {/* {scholarship.rating && (
                            <>
                              <span className="text-blue-600 mr-1">•</span>
                              <span className="mr-1">{selectedJob.rating}</span>
                              <FaStar className="text-yellow-400" />
                            </>
                          )} */}
                        </div>
                        
                        <p className="text-gray-600 mb-2">India, west Bengal</p>
                        
                        <p className="font-medium mb-4">{scholarship.Amount}</p>
                        
                        <div className="flex gap-2 mb-4">
                          <button onClick={()=>{
                             router.push("/apply")
                          }} className="bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition duration-200">
                            Apply now
                          </button>
                          <button onClick={()=>{
                              navigator.clipboard.writeText(`http://localhost:3000/scholarships/${scholarship.id}`)
                              .then(() => callNotification("success","successfully copied in clipboard"))
                              .catch(err => console.error('Failed to copy text: ', err));
                          }} className="border border-gray-300 p-2 rounded-lg hover:bg-gray-100">
                            <FaLink size={20} />
                          </button>
                        </div>
                        
                        <div className="border-t pt-4 mb-4">
                          <h3 className="text-xl font-bold mb-4">Job details</h3>
                          
                          <div className="mb-4">
                            <div className="flex items-center mb-2">
                              <FaBriefcase className="text-gray-500 mr-2" />
                              <span className="font-bold">Pay</span>
                            </div>
                            <p className="ml-6 text-gray-800">{scholarship.Amount}</p>
                          </div>
                          
                          <div className="mb-4">
                            <div className="flex items-center mb-2">
                              <FaBriefcase className="text-gray-500 mr-2" />
                              <span className="font-bold">Job type</span>
                            </div>
                            <div className="ml-6 flex flex-wrap gap-2">
                              {scholarship.tags.map((type:any, index:number) => (
                                <span key={index} className="bg-gray-200 px-3 py-1 rounded-full text-sm">
postgraduate/undergraduate
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div className="mb-4">
                            <div className="flex items-center mb-2">
                              <FaClock className="text-gray-500 mr-2" />
                              <span className="font-bold">Shift and schedule</span>
                            </div>
                            <div className="ml-6 flex flex-wrap gap-2">
                              {scholarship.tags.map((shift:any, index:number) => (
                                <span key={index} className="bg-gray-200 px-3 py-1 rounded-full text-sm">
                                  postgraduate/undergraduate
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="border-t pt-4">
                          <h3 className="text-xl font-bold mb-4">Full job description</h3>
                          
                          {scholarship.criteria && (
                            <div>
                              <h4 className="font-bold mb-2">Key Responsibilities:</h4>
                              <ul className="list-disc pl-5 mb-4">
                                {scholarship.criteria.map((resp:any, index:number) => (
                                  <li key={index} className="mb-1">{resp}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    {notification.map((notify,index)=>{
        return <NotificationContainer key={index} typepro={notify.type} messagepro={notify.message} durationpro={notify.duration}></NotificationContainer>
      })}
                    </div>
    )
}
export default ScholarshipId

