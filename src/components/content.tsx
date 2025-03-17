"use client";
import React, { useState, useEffect } from "react";
import Post from "./Post";
import { PostProps, Author } from "../types";
import { Image, Video, RefreshCw } from "lucide-react";
import PostCreationModal from "./PostCreationModal";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


interface PaginationInfo {
  total: number;
  pages: number;
  page: number;
  limit: number;
}

interface PostsResponse {
  posts: PostProps[];
  pagination: PaginationInfo;
}

const MainContent: React.FC<{
  initialSubreddit?: string;
}> = ({ initialSubreddit = "general" }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [subreddit, setSubreddit] = useState(initialSubreddit);
  const [sort, setSort] = useState("new");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const currentUser: Author = session?.user ? {
    id: session.user.id as string,
    name: session.user.name || "User",
    image: session.user.image || "https://avatars.githubusercontent.com/u/9919?v=4",
    role: session.user.role as string || "ALUM",
  } : {
    id: "guest",
    name: "Guest User",
    image: "https://avatars.githubusercontent.com/u/9919?v=4",
    role: "GUEST",
  };

  // Function to fetch posts from API
  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const query = new URLSearchParams({
        page: page.toString(),
        limit: "10",
        sort,
      });
      
      if (subreddit) {
        query.append("subreddit", subreddit);
      }
      
      const response = await fetch(`/api/posts?${query.toString()}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      
      const data: PostsResponse = await response.json();
      setPosts(data.posts);
      setPagination(data.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading posts');
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [subreddit, sort, page]);

  const handlePostCreation = () => {

    setIsModalOpen(false);
    setTimeout(() => {
      fetchPosts();
    }, 500);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/posts?id=${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete post');
      }
      
      setPosts(posts.filter(post => post.id !== id));
    } catch (error) {
      console.error('Error deleting post:', error);
      alert(error instanceof Error ? error.message : 'An error occurred while deleting the post');
    }
  };


  const handleSubredditChange = (newSubreddit: string) => {
    setSubreddit(newSubreddit);
    setPage(1); 
  };

  
  const handleSortChange = (newSort: string) => {
    setSort(newSort);
    setPage(1); 
  };

 
  const handleRefresh = () => {
    setRefreshing(true);
    fetchPosts();
  };

  return (
    <div className="h-screen pt-16 flex justify-center bg-gray-100 px-4 sm:px-6">
      <div className="w-full max-w-2xl mx-auto flex flex-col h-full">
        
        {(session?.user.role === "ALUM" || session?.user.role === "ADMIN") && (<div className="bg-white shadow-md rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-3">
            <img
              src={currentUser.image || "/default-avatar.png"}
              alt="User"
              className="w-10 h-10 rounded-full object-cover"
            />
            <button
              className="w-full bg-gray-100 text-gray-600 text-left py-2 px-4 rounded-full hover:bg-gray-200 transition"
              onClick={() => setIsModalOpen(true)}
            >
              What's on your mind?
            </button>
          </div>
          <div className="flex justify-around mt-3 border-t pt-3">
            <button 
              className="flex items-center space-x-2 text-indigo-600 hover:bg-indigo-100 px-3 py-2 rounded-md transition"
              onClick={() => setIsModalOpen(true)}
            >
              <Image className="w-5 h-5" />
              <span>Photo</span>
            </button>
            <button 
              className="flex items-center space-x-2 text-red-600 hover:bg-red-100 px-3 py-2 rounded-md transition"
              onClick={() => setIsModalOpen(true)}
            >
              <Video className="w-5 h-5" />
              <span>Video</span>
            </button>
            
          </div>
        </div>)}

       
        <div className="bg-white shadow-md rounded-lg p-4 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <label htmlFor="subreddit-select" className="text-sm font-medium text-gray-700">Community:</label>
              <select 
                id="subreddit-select"
                value={subreddit} 
                onChange={(e) => handleSubredditChange(e.target.value)}
                className="bg-white border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="">All</option>
                <option value="alumni">Alumni</option>
                <option value="general">General</option>
                <option value="events">Events</option>
                <option value="academic">Academic</option>
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <label htmlFor="sort-select" className="text-sm font-medium text-gray-700">Sort by:</label>
              <select 
                id="sort-select"
                value={sort} 
                onChange={(e) => handleSortChange(e.target.value)}
                className="bg-white border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="new">Newest</option>
                <option value="top">Top</option>
                <option value="commented">Most Commented</option>
                <option value="verified">Verified</option>
              </select>
              
              <button 
                onClick={handleRefresh} 
                disabled={refreshing}
                className="ml-2 p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-gray-100 rounded-full transition"
              >
                <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Posts list */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {loading && !refreshing && (
            <div className="flex justify-center items-center p-8">
              <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
              {error}
              <button
                onClick={fetchPosts}
                className="ml-2 underline font-medium"
              >
                Try again
              </button>
            </div>
          )}
          
          {!loading && !error && posts.length === 0 && (
            <div className="bg-white shadow-md rounded-lg p-8 flex flex-col items-center justify-center text-center">
              <p className="text-gray-500 text-lg mb-4">No posts yet in this community</p>
              {(session?.user.role === "ALUM" || session?.user.role === "ADMIN") && (
              <button 
                className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition"
                onClick={() => setIsModalOpen(true)}
              >
                Create the first post
              </button>
            )}
              
            </div>
          )}
          
          {posts.length > 0 && (
            <div className="space-y-6 pb-6">
              {posts.map((post) => (
                <Post 
                  key={post.id}
                  {...post}
                  currentUser={currentUser}
                  onDelete={handleDelete}
                />
              ))}
              
              {/* Pagination */}
              {pagination && pagination.pages > 1 && (
                <div className="flex justify-center items-center pt-4 pb-8">
                  <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className={`px-4 py-2 border rounded-l-md ${page === 1 ? 'bg-gray-100 text-gray-400' : 'bg-white hover:bg-gray-50'}`}
                  >
                    Previous
                  </button>
                  
                  <div className="px-4 py-2 border-t border-b bg-indigo-50 text-indigo-600 font-medium">
                    {page} of {pagination.pages}
                  </div>
                  
                  <button
                    disabled={page === pagination.pages}
                    onClick={() => setPage(page + 1)}
                    className={`px-4 py-2 border rounded-r-md ${page === pagination.pages ? 'bg-gray-100 text-gray-400' : 'bg-white hover:bg-gray-50'}`}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Post creation modal */}
      <PostCreationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        subreddit={subreddit || "general"}
        onPost={handlePostCreation}
      />
    </div>
  );
};

export default MainContent;