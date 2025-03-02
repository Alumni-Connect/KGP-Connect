"use client"
// pages/index.tsx
import React, { useState,useEffect, useRef } from 'react';
import Head from 'next/head';
import { FaStar, FaRegBookmark, FaLink, FaBriefcase, FaClock } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { BiSolidChevronDown } from 'react-icons/bi';
import {useRouter} from "next/navigation"
import FuseSearch from '@/components/scholarships/search.scholarships';
import { useInView } from 'react-intersection-observer'
import useSWRInfinite, { SWRInfiniteKeyLoader } from 'swr/infinite'
import { ScholarshipType } from '@/types';


export default function ScholarshipLayout({children}:{children:React.ReactNode}){
  
  const [filters,setFilters]= useState<string[]>([])

  function fetcher (url:string): Promise<{nextId:string,scholarships:ScholarshipType[]}> {
    return fetch(url).then(r => r.json())
  } 

  const { data, error, isLoading, isValidating, mutate, size, setSize } = useSWRInfinite(
    (pageIndex, previousPageData) => {
      console.log(pageIndex,previousPageData)
      if(!previousPageData && pageIndex===0 && filters.length===0) return `/api/scholarships?cursor=${pageIndex}`
      else if(!previousPageData && pageIndex===0 ) return `/api/scholarships?cursor=${pageIndex}&filter=${filters}`
      else if(!filters) {
     return `/api/scholarships?cursor=${previousPageData.nextId}`
      }else {
        return `/api/scholarships?cursor=${previousPageData.nextId}&filter=${filters}`
      }
   },
    fetcher,      
    
  )

  console.log(data,error,isLoading,isValidating,size)
  

    const [selectedJob, setSelectedJob] = useState<any>();
  
     const router = useRouter()
    
  
    const handleJobClick = (id:string) => {
      router.push(`/scholarships/${id}`)
    };
  
    const closeJobDetails = () => {
      setSelectedJob(null);
    };
   
    return(
        <>
        <div className="min-h-screen p-12 bg-gray-50 hidden md:block">
          <Head>
            <title>Job Search | Find Your Next Opportunity</title>
            <meta name="description" content="Search for remote jobs in various technologies" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
    
          <main className="container mx-auto px-4 py-6">
            {/* Search Bar */}
            <FuseSearch filter={filters} setFilter={setFilters} mutate={mutate}></FuseSearch>
    
            {/* Filters */}
            <div className="flex flex-wrap gap-2 mb-4">
            {
            filters && filters.map((tags:string,index)=>(<div key={index} className="bg-gray-200 rounded-md px-3 py-2 flex items-center cursor-pointer">
                {tags} <IoMdClose className="ml-1" onClick={()=>{
                  const selectedFilter=filters.filter((tag)=> tag!==tags)
                  setFilters(selectedFilter)
                }} />
              </div>))
              }
              </div>
            
              
             
    
            {/* Upload CV Banner */}
            <div className="border-b border-gray-300 pb-4 mb-4">
              <div className="flex justify-between items-center">
                <p className="text-blue-600 font-medium">Upload your CV and find your next job on Indeed!</p>
                <button className="text-gray-500">
                  <IoMdClose size={24} />
                </button>
              </div>
            </div>
    
            {/* Results Info */}
            <div className="mb-4">
              <p className="text-gray-600 mb-2">Scholarships offered by iit kharagpur</p>
              <div className="flex justify-between items-center">
              <div>
              {filters.length===0? null : 
                 <>
                  <span className="font-medium">Sort by: </span>
                  <span className="font-bold">relevance</span>
                  <span> - </span>
                  <span className="text-blue-600">{filters.join(",")}</span>
                  </>
                }
                </div>
                <div className="text-gray-600">
                  100+ jobs <span className="ml-1 bg-gray-300 rounded-full inline-flex items-center justify-center w-5 h-5 text-xs">?</span>
                </div>
              </div>
            </div>
    
            {/* Job Listings and Details */}
            <div className="flex flex-col md:flex-row gap-4">
              {/* Job List */}
              <div  className="w-full md:w-1/2">

                {data && data.map(({scholarships,nextId})=>
                  scholarships.map((scholarShip)=>(
                    <div 
                    key={scholarShip.id} 
                    className="bg-white rounded-lg border mb-4 p-4 cursor-pointer hover:shadow-md transition duration-200"
                    onClick={() => handleJobClick(scholarShip.id)}
                   >
                    <div className="flex justify-between">
                      <h2 className="text-xl font-bold">Scholarship for the iit kgp students</h2>
                      <button className="text-gray-500">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      </button>
                    </div>
                    {/* <p className="font-medium">{scholarShips.company}</p>
                    <p className="text-gray-600">{scholarShips.location}</p> */}
                    <p className="text-gray-800 font-medium mt-2">{scholarShip.Amount}</p>
    
                    <ul className="mt-2 text-gray-600">
                      <li className="flex items-start">
                        <span className="text-gray-400 mr-2">•</span>
                        <span>{scholarShip.description}</span>
                      </li>
                    </ul>
    
                    <div className="mt-4 pt-2 border-t">
                      <a href="#" className="text-blue-600">View similar jobs with this employer</a>
                    </div>
                  </div>
                  ))
                )}
                <div className='flex items-center justify-center '>
                 {!(data?.[0]?.scholarships?.length === 0 || (data && !data[data.length - 1]?.nextId)) ?<button 
                  style={{
                    padding: '12px 24px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    backgroundColor: '#4a90e2',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 15px rgba(74, 144, 226, 0.3)',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'transform 0.3s ease',
                    animation: 'breathing 2.5s ease-in-out infinite'
                  }}
                  onClick={() => {
                    setSize(size + 1)
                  }}
                >
                  <span
                    style={{
                      position: 'relative',
                      zIndex: 2
                    }}
                  >
                    Load More
                  </span>
                  <style jsx>{`
                    @keyframes breathing {
                      0% {
                        transform: scale(1);
                        boxShadow: 0 4px 15px rgba(74, 144, 226, 0.3);
                      }
                      50% {
                        transform: scale(1.05);
                        boxShadow: 0 8px 20px rgba(74, 144, 226, 0.5);
                      }
                      100% {
                        transform: scale(1);
                        boxShadow: 0 4px 15px rgba(74, 144, 226, 0.3);
                      }
                    }
                    
                    button:hover {
                      animation-play-state: paused;
                      transform: scale(1.08);
                      background-color: #3a80d2;
                    }
                  `}</style>
                </button>: null}
              </div>
              </div>
              
                 <div className="w-full md:w-1/2 sticky top-0">{children}</div>
              
             </div>
          </main>
        </div>
    
        <div className="w-full sticky top-0 py-16 md:hidden block">{children}</div>
        </>
    )
}



