"use client";
import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown, MessageSquare, Share2, Bookmark, MoreHorizontal, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CommentSection from './CommentSection';

interface Comment {
  id: string;
  content: string;
  authorId: string;
  author: {
    name: string;
    image: string | null;
  };
  score: number;
  createdAt: Date;
  replies?: Comment[];
}

interface Post {
  id: string;
  title: string;
  content: string;
  subreddit: string;
  authorId: string;
  author: {
    name: string;
    image: string | null;
  };
  score: number;
  commentCount: number;
  createdAt: Date;
  updatedAt: Date;
  comments: Comment[];
}

const PostDetailPage = ({ params }: { params: { postId: string } }) => {
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userVote, setUserVote] = useState<number>(0);

  // Fetch post data
  useEffect(() => {
    const fetchPost = async () => {
      try {
        // In a real app, you would fetch from your API
        // const response = await fetch(`/api/posts/${params.postId}`);
        // const data = await response.json();
        
        // For demo purposes, using mock data
        const mockPost: Post = {
          id: params.postId,
          title: "Discussion: What's your favorite part about IIT Kharagpur?",
          content: "I'm curious to hear what different people love about our campus. For me, it's the amazing tech fests and the beautiful Nehru Museum.",
          subreddit: "General",
          authorId: "user1",
          author: {
            name: "mogambo",
            image: null,
          },
          score: 42,
          commentCount: 3,
          createdAt: new Date(2025, 1, 20),
          updatedAt: new Date(2025, 1, 20),
          comments: [
            {
              id: "comment1",
              content: "The Spring Fest is definitely my favorite event on campus. The cultural performances are always top-notch!",
              authorId: "user2",
              author: {
                name: "RiyaSharma",
                image: null,
              },
              score: 12,
              createdAt: new Date(2025, 1, 21),
              replies: []
            },
            {
              id: "comment2",
              content: "For me, it's the research opportunities. The labs are well-equipped and the professors are great mentors.",
              authorId: "user3",
              author: {
                name: "AkashDeep",
                image: null,
              },
              score: 8,
              createdAt: new Date(2025, 1, 22),
              replies: []
            },
            {
              id: "comment3",
              content: "I love the greenery around the campus, especially during monsoon. Great place to take a walk and clear your head after classes.",
              authorId: "user4",
              author: {
                name: "PriyaMalhotra",
                image: null,
              },
              score: 5,
              createdAt: new Date(2025, 1, 23),
              replies: []
            }
          ]
        };
        
        setPost(mockPost);
        setLoading(false);
      } catch (err) {
        setError("Failed to load post. Please try again later.");
        setLoading(false);
      }
    };

    fetchPost();
  }, [params.postId]);

  const handleVote = (value: number) => {
    if (userVote === value) {
      // User is removing their vote
      setUserVote(0);
      if (post) setPost({...post, score: post.score - value});
    } else {
      // User is changing their vote or voting for the first time
      if (post) setPost({...post, score: post.score - userVote + value});
      setUserVote(value);
    }
    
    // In a real app, you would make an API call here
    // fetch(`/api/posts/${params.postId}/vote`, {
    //   method: 'POST',
    //   body: JSON.stringify({ value })
    // });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen p-4">
        <div className="text-xl text-red-500 mb-4">{error || "Post not found"}</div>
        <button 
          onClick={() => router.push('/')}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Back Button */}
      <div className="mb-4">
        <button 
          onClick={() => router.back()}
          className="flex items-center text-indigo-600 hover:text-indigo-800"
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          <span>Back</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Post Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <span className="font-medium text-indigo-600 mr-2">{post.subreddit}</span>
            <span className="mx-1">•</span>
            <span>Posted by {post.author.name}</span>
            <span className="mx-1">•</span>
            <span>{formatDate(post.createdAt)}</span>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">{post.title}</h1>
        </div>

        {/* Post Content */}
        <div className="p-4 border-b border-gray-200">
          <div className="text-gray-800 mb-6">{post.content}</div>
          
          {/* Vote and Action Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1 bg-gray-100 rounded-full px-3 py-1">
              <button 
                onClick={() => handleVote(1)} 
                className={`p-1 rounded-full ${userVote === 1 ? 'text-indigo-600' : 'text-gray-500 hover:text-indigo-600'}`}
              >
                <ArrowUp className="h-5 w-5" />
              </button>
              <span className="font-medium text-gray-700 min-w-8 text-center">{post.score}</span>
              <button 
                onClick={() => handleVote(-1)} 
                className={`p-1 rounded-full ${userVote === -1 ? 'text-indigo-600' : 'text-gray-500 hover:text-indigo-600'}`}
              >
                <ArrowDown className="h-5 w-5" />
              </button>
            </div>

            <div className="flex space-x-3">
              <button className="flex items-center text-gray-500 hover:text-indigo-600">
                <MessageSquare className="h-5 w-5 mr-1" />
                <span>{post.commentCount} Comments</span>
              </button>
              <button className="flex items-center text-gray-500 hover:text-indigo-600">
                <Share2 className="h-5 w-5 mr-1" />
                <span>Share</span>
              </button>
              <button className="flex items-center text-gray-500 hover:text-indigo-600">
                <Bookmark className="h-5 w-5 mr-1" />
                <span>Save</span>
              </button>
              <button className="text-gray-500 hover:text-indigo-600">
                <MoreHorizontal className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Comment Section */}
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Comments ({post.commentCount})</h2>
          <CommentSection comments={post.comments} postId={post.id} />
        </div>
      </div>
    </div>
  );
};

export default PostDetailPage;