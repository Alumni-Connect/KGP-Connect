// components/KgpConnectDashboard.tsx
"use client";

import { act, useEffect, useState } from 'react';

// Types
type TabType = 'users' | 'scholarships' | 'posts' | 'jobs';

// User type definition
interface User {
    id:string,
    name:string,
    email:string,
    isVerified:boolean,
    Department:string,
    hall:string,
    YearOfGraduation :string,
    emailVerified:Date
}

// Scholarship type definition
interface Scholarship {
    id: string,
    title: string, 
    lastDate: Date,
    isVerified: boolean,
    create:{
            name: string | null
    }
}

// Post type definition
interface Post {
  id: string;
  title: string;
  author: string;
  createdAt: string;
  isVerified: boolean;
}

// Job type definition
interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  isVerified: boolean;
}


export default function KgpConnectDashboard({ 
    totalUserPages,
    totalScholarshipPages,
    totalJobsPages,
    totalPostsPages 
  }: { 
    totalUserPages : number,
    totalScholarshipPages : number,
    totalJobsPages : number,
    totalPostsPages : number    
  }) {
  const [activeTab, setActiveTab] = useState<TabType>('users');
  const [searchTerm, setSearchTerm] = useState('');
  
  // State for each type
  const [users, setUsers] = useState<User[]>([]);
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [page, setPages] = useState<number>(1);
  const itemsPerPage=10;
  const totalItems= activeTab==="users"? totalUserPages : activeTab==="scholarships"? totalScholarshipPages : activeTab==="jobs"? totalJobsPages : activeTab==="posts"? totalPostsPages: 0
  // Handle tab change
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setSearchTerm('');
  };
  
  useEffect(()=>{
    if(activeTab==="users"){
   fetch(`/api/admin/manage-user?page=${page-1}&limit=${itemsPerPage}`,{method:"GET"})
   .then(async res=>{
     if(res.status===200){
        const response = await res.json()
        console.log(response)
        setUsers(response.user)
     }

   })
   .catch(e=>{
    console.log(e)
   })
    }else if(activeTab==="scholarships"){
   fetch(`/api/admin/manage-scholarship?page=${page-1}&limit=${itemsPerPage}`,{method:"GET"})
   .then(async res=>{
     if(res.status===200){
        const response = await res.json()
        console.log(response)
        setScholarships(response.scholarship)
     }
   })
   .catch(e=>{
    console.log(e)
   })
    }else if(activeTab==="jobs"){
      fetch(`/api/admin/manage-jobs?page=${page-1}&limit=${itemsPerPage}`,{method:"GET"})
      .then(async res=>{
        if(res.status===200){
          const response = await res.json()
          console.log(response)
          setJobs(response.job)
        }

      })
      .catch(e=>{
      console.log(e)
      })
    }else if(activeTab==="posts"){
      fetch(`/api/admin/manage-post?page=${page-1}&limit=${itemsPerPage}`,{method:"GET"})
      .then(async res=>{
        if(res.status===200){
          const response = await res.json()
          console.log(response)
          setPosts(response.post)
        }

      })
      .catch(e=>{
      console.log(e)
      })
    }

   //add the post and jobs part same like this


  },[page,activeTab])
  
  // Filter and action handlers for Users
  const filteredUsers = users

   const verifyUser = (id: string) => {
    fetch(`/api/admin/manage-user?id=${id}`,{method:"PATCH"})
    .then(async(res)=>{
      if(res.status===200){
        setUsers(users.map(user => 
            user.id === id ? { ...user, isVerified: true } : user
          ));
      }
    })
    .catch(e=>{
        console.log(e)
    })
   
  };

  const deleteUser = (id: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
    fetch(`/api/admin/manage-user?id=${id}`,{method:"DELETE"})
    .then(async(res)=>{
        if(res.status===200){
          setUsers(users.map(user => 
              user.id === id ? { ...user, isVerified: true } : user
            ));
        }
      })
      .catch(e=>{
          console.log(e)
      })
     
    }
  };

  // Filter and action handlers for Scholarships
  const filteredScholarships =scholarships.filter((sch)=> sch.id!=="112312312")

  const verifyScholarship = (id: string) => {
    fetch(`/api/admin/manage-scholarship?id=${id}`,{method:"PATCH"})
    .then(async(res)=>{
      if(res.status===200){
        setScholarships(scholarships.map(scholarship => 
            scholarship.id === id ? { ...scholarship, isVerified: true } : scholarship
          ));
      }
    })
    .catch(e=>{
        console.log(e)
    })
  };

  const deleteScholarship = (id: string) => {
    if (window.confirm('Are you sure you want to delete this scholarship?')) {
        fetch(`/api/admin/manage-scholarship?id=${id}`,{method:"DELETE"})
        .then(async(res)=>{
            if(res.status===200){
                setScholarships(scholarships.filter(scholarship => scholarship.id !== id));
            }
          })
        .catch(e=>{
              console.log(e)
          })
            }
  };

  // Filter and action handlers for Posts
  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    post.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const verifyPost = (id: string) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, isVerified: true } : post
    ));
  };

  const deletePost = (id: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setPosts(posts.filter(post => post.id !== id));
    }
  };

  // Filter and action handlers for Jobs
  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const verifyJob = (id: string) => {
    
    setJobs(jobs.map(job => 
      job.id === id ? { ...job, isVerified: true } : job
    ));
  };

  const deleteJob = (id: string) => {

    if (window.confirm('Are you sure you want to delete this job?')) {
      setJobs(jobs.filter(job => job.id !== id));
    }
  };


  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // Generate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  
//   if (totalPages <= 1) return null;



  return (
    <div className="w-full max-w-full mx-auto px-2">
      {/* Main tabs navigation */}
      <div className="flex bg-gray-100  overflow-x-auto">
        {(['users', 'scholarships', 'posts', 'jobs'] as TabType[]).map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === tab
                ? 'bg-gray-500 text-white'
                : 'text-gray-500 hover:bg-gray-200'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Header */}
      <div className="bg-gray-500 p-6 shadow-lg">
      <h1 className="text-2xl font-bold text-white mb-2">KGP Connect</h1>
      <h2 className="text-xl font-sm text-white opacity-90">
          {activeTab === 'users' && 'User Management'}
          {activeTab === 'scholarships' && 'Scholarship Management'}
          {activeTab === 'posts' && 'Post Management'}
          {activeTab === 'jobs' && 'Job Management'}
        </h2>
      </div>
      
      
        
        {/* Users Table */}
        {activeTab === 'users' && (
          <>
            <div className="mb-4 text-gray-600">
              Showing {users?.length} users
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-100 border-b">
                    <th className="py-3 px-4 text-left font-medium text-gray-600 uppercase tracking-wider">Name</th>
                    <th className="py-3 px-4 text-left font-medium text-gray-600 uppercase tracking-wider">Email</th>
                    <th className="py-3 px-4 text-left font-medium text-gray-600 uppercase tracking-wider">Created At</th>
                    <th className="py-3 px-4 text-left font-medium text-gray-600 uppercase tracking-wider">Hall Of Residence</th>
                    <th className="py-3 px-4 text-left font-medium text-gray-600 uppercase tracking-wider">Year of Graduation</th>
                    <th className="py-3 px-4 text-left font-medium text-gray-600 uppercase tracking-wider">Status</th>
                    <th className="py-3 px-4 text-center font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users?.length > 0 ? (
                    users?.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="py-4 px-4 font-medium text-gray-800">{user.name}</td>
                        <td className="py-4 px-4 text-gray-600">{user.email}</td>
                        <td className="py-4 px-4 text-gray-600">{user.emailVerified ? user.emailVerified.toString().split("T")[0]:""}</td>
                        <td className="py-4 px-4 text-gray-600">{user.hall}</td>
                        <td className="py-4 px-4 text-gray-600">{user.YearOfGraduation ? user.YearOfGraduation.split("T")[0] : "Null"}</td>

                        <td className="py-4 px-4">
                          {user.isVerified ? (
                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                              Verified
                            </span>
                          ) : (
                            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium">
                              Pending
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-4 text-center">
                          <div className="flex justify-center space-x-2">
                            {!user.isVerified && (
                              <button
                                onClick={() => verifyUser(user.id)}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition"
                              >
                                Verify
                              </button>
                            )}
                            <button
                              onClick={() => deleteUser(user.id)}
                              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-6 text-center text-gray-500">
                        No users found. Try adjusting your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Scholarships Table */}
        {activeTab === 'scholarships' && (
          <>
            <div className="mb-4 text-gray-600">
              Showing {filteredScholarships.length} scholarships
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-100 border-b">
                    <th className="py-3 px-4 text-left font-medium text-gray-600 uppercase tracking-wider">Title</th>
                    <th className="py-3 px-4 text-left font-medium text-gray-600 uppercase tracking-wider">Provider</th>
                    <th className="py-3 px-4 text-left font-medium text-gray-600 uppercase tracking-wider">Deadline</th>
                    <th className="py-3 px-4 text-left font-medium text-gray-600 uppercase tracking-wider">Status</th>
                    <th className="py-3 px-4 text-center font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredScholarships.length > 0 ? (
                    filteredScholarships.map((scholarship) => (
                      <tr key={scholarship.id} className="hover:bg-gray-50">
                        <td className="py-4 px-4 font-medium text-gray-800">{scholarship.title}</td>
                        <td className="py-4 px-4 text-gray-600">{scholarship.create.name}</td>
                        <td className="py-4 px-4 text-gray-600">{scholarship.lastDate.toString().split("T")[0]}</td>
                        <td className="py-4 px-4">
                          {scholarship.isVerified ? (
                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                              Verified
                            </span>
                          ) : (
                            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium">
                              Pending
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-4 text-center">
                          <div className="flex justify-center space-x-2">
                            {!scholarship.isVerified && (
                              <button
                                onClick={() => verifyScholarship(scholarship.id)}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition"
                              >
                                Verify
                              </button>
                            )}
                            <button
                              onClick={() => deleteScholarship(scholarship.id)}
                              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-6 text-center text-gray-500">
                        No scholarships found. Try adjusting your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Posts Table */}
        {activeTab === 'posts' && (
          <>
            <div className="mb-4 text-gray-600">
              Showing {filteredPosts.length} posts
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-100 border-b">
                    <th className="py-3 px-4 text-left font-medium text-gray-600 uppercase tracking-wider">Title</th>
                    <th className="py-3 px-4 text-left font-medium text-gray-600 uppercase tracking-wider">Author</th>
                    <th className="py-3 px-4 text-left font-medium text-gray-600 uppercase tracking-wider">Created At</th>
                    <th className="py-3 px-4 text-left font-medium text-gray-600 uppercase tracking-wider">Status</th>
                    <th className="py-3 px-4 text-center font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                      <tr key={post.id} className="hover:bg-gray-50">
                        <td className="py-4 px-4 font-medium text-gray-800">{post.title}</td>
                        <td className="py-4 px-4 text-gray-600">{post.author}</td>
                        <td className="py-4 px-4 text-gray-600">{post.createdAt}</td>
                        <td className="py-4 px-4">
                          {post.isVerified ? (
                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                              Verified
                            </span>
                          ) : (
                            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium">
                              Pending
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-4 text-center">
                          <div className="flex justify-center space-x-2">
                            {!post.isVerified && (
                              <button
                                onClick={() => verifyPost(post.id)}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition"
                              >
                                Verify
                              </button>
                            )}
                            <button
                              onClick={() => deletePost(post.id)}
                              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-6 text-center text-gray-500">
                        No posts found. Try adjusting your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Jobs Table */}
        {activeTab === 'jobs' && (
          <>
            <div className="mb-4 text-gray-600">
              Showing {filteredJobs.length} jobs
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-100 border-b">
                    <th className="py-3 px-4 text-left font-medium text-gray-600 uppercase tracking-wider">Title</th>
                    <th className="py-3 px-4 text-left font-medium text-gray-600 uppercase tracking-wider">Company</th>
                    <th className="py-3 px-4 text-left font-medium text-gray-600 uppercase tracking-wider">Location</th>
                    <th className="py-3 px-4 text-left font-medium text-gray-600 uppercase tracking-wider">Status</th>
                    <th className="py-3 px-4 text-center font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredJobs.length > 0 ? (
                    filteredJobs.map((job) => (
                      <tr key={job.id} className="hover:bg-gray-50">
                        <td className="py-4 px-4 font-medium text-gray-800">{job.title}</td>
                        <td className="py-4 px-4 text-gray-600">{job.company}</td>
                        <td className="py-4 px-4 text-gray-600">{job.location}</td>
                        <td className="py-4 px-4">
                          {job.isVerified ? (
                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                              Verified
                            </span>
                          ) : (
                            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium">
                              Pending
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-4 text-center">
                          <div className="flex justify-center space-x-2">
                            {!job.isVerified && (
                              <button
                                onClick={() => verifyJob(job.id)}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition"
                              >
                                Verify
                              </button>
                            )}
                            <button
                              onClick={() => deleteJob(job.id)}
                              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-6 text-center text-gray-500">
                        No jobs found. Try adjusting your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}


       <div className="flex justify-center items-center mt-6 space-x-2">
      <button
        onClick={() => setPages(page - 1)}
        disabled={page === 1}
        className={`px-3 py-1 rounded ${
          page === 1 
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
            : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
        }`}
      >
        Prev
      </button>
      
      {pageNumbers.map(number => (
        <button
          key={number}
          onClick={() => setPages(number)}
          className={`px-3 py-1 rounded ${
            page === number
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
          }`}
        >
          {number}
        </button>
      ))}
      
      <button
        onClick={() => setPages(page + 1)}
        disabled={page === totalPages}
        className={`px-3 py-1 rounded ${
          page === totalPages
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
            : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
        }`}
      >
        Next
      </button>
    </div>

      </div>

  );
}