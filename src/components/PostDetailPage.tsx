"use client";
import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown, MessageSquare, Share2, Bookmark, MoreHorizontal, ChevronLeft } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import CommentSection from './CommentSection';

interface Media {
  mediaUrl: string;
  mediaType: string;
  caption: string;
}

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
  parentId: string | null; 
  replies?: Comment[];
  hasMoreReplies?: boolean;
}

interface Post {
  id: string;
  title: string;
  content: string | null;
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
  userVote?: number | null;
  media?: Media | null;
}

const PostDetailPage = () => {
  const params = useParams();
  const postId = params?.postId as string;
  console.log("Received params:", postId);
  console.log("params", params);
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userVote, setUserVote] = useState<number | null>(null);
  const [isVoting, setIsVoting] = useState(false);
  const [voteError, setVoteError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postResponse = await fetch(`/api/posts/${postId}`);
        if (!postResponse.ok) {
          throw new Error('Failed to fetch post');
        }
        const postData = await postResponse.json();
        
        const commentsResponse = await fetch(`/api/posts/${postId}/comments?sort=best`);
        if (!commentsResponse.ok) {
          throw new Error('Failed to fetch comments');
        }
        const commentsData = await commentsResponse.json();
        
        if (postData.content && typeof postData.content === 'object') {
          console.log("Content is an object, converting to string:", postData.content);
          postData.content = JSON.stringify(postData.content);
        }
        
        
        const processedComments = commentsData.map((comment: any) => {
          const commentContent = typeof comment.content === 'object' 
            ? JSON.stringify(comment.content) 
            : comment.content;
            
          return {
            ...comment,
            content: commentContent,
            createdAt: new Date(comment.createdAt),
            updatedAt: new Date(comment.updatedAt),
            replies: comment.replies ? comment.replies.map((reply: any) => {
              const replyContent = typeof reply.content === 'object'
                ? JSON.stringify(reply.content)
                : reply.content;
                
              return {
                ...reply,
                content: replyContent,
                createdAt: new Date(reply.createdAt),
                updatedAt: new Date(reply.updatedAt)
              };
            }) : []
          };
        });
        
        const combinedData = {
          ...postData,
          createdAt: new Date(postData.createdAt),
          updatedAt: new Date(postData.updatedAt),
          comments: processedComments
        };
        
        setPost(combinedData);
        setUserVote(postData.userVote);
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load post. Please try again later.");
        setLoading(false);
      }
    };
  
    fetchPost();
  }, [postId]);

  const handleVote = async (value: number) => {
    if (isVoting || !post) return;
    setIsVoting(true);
    setVoteError(null);
    
    try {
      if (userVote === value) {
        const response = await fetch(`/api/postVotes?postId=${post.id}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          throw new Error('Failed to remove vote');
        }
        
        setPost({
          ...post,
          score: post.score - value,
        });
        setUserVote(null);
      } else {
        const response = await fetch(`/api/postVotes`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            postId: post.id,
            value 
          }),
        });
        
        if (!response.ok) {
          throw new Error('Failed to register vote');
        }
        
        const newScore = post.score + (userVote ? value - userVote : value);
        setPost({
          ...post,
          score: newScore,
        });
        setUserVote(value);
      }
    } catch (err) {
      setVoteError("Failed to register your vote. Please try again.");
      console.error("Vote error:", err);
    } finally {
      setIsVoting(false);
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(date));
  };

  const handleBack = () => {
    router.back();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse text-lg">Loading post...</div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="text-red-500 text-lg mb-4">{error || "Post not found"}</div>
        <button
          onClick={handleBack}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          <ChevronLeft size={16} className="mr-1" /> Go Back
        </button>
      </div>
    );
  }

  // Render media content if available
  const renderMedia = () => {
    if (!post.media) return null;
    
    // If media is a string (possibly JSON), try to parse it
    let mediaData: Media;
    if (typeof post.media === 'string') {
      try {
        mediaData = JSON.parse(post.media);
      } catch (e) {
        console.error("Failed to parse media string:", e);
        return null;
      }
    } else {
      mediaData = post.media;
    }
    
    const { mediaType, mediaUrl, caption } = mediaData;
    
    if (mediaType === 'image') {
      return (
        <div className="mb-4">
          <img 
            src={mediaUrl} 
            alt={caption || "Post image"} 
            className="max-w-full rounded-md"
          />
          {caption && <p className="text-sm text-gray-500 mt-1">{caption}</p>}
        </div>
      );
    } else if (mediaType === 'video') {
      return (
        <div className="mb-4">
          <video 
            src={mediaUrl} 
            controls
            className="max-w-full rounded-md"
          />
          {caption && <p className="text-sm text-gray-500 mt-1">{caption}</p>}
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className="max-w-4xl mx-auto pt-4 pb-12 px-4">
      <button
        onClick={handleBack}
        className="flex items-center mb-4 text-gray-600 hover:text-gray-900"
      >
        <ChevronLeft size={20} className="mr-1" /> Back
      </button>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        
        <div className="p-4 border-b">
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <span className="font-medium text-blue-600">r/{post.subreddit}</span>
            <span className="mx-1">•</span>
            <span>Posted by u/{post.author.name}</span>
            <span className="mx-1">•</span>
            <span>{formatDate(post.createdAt)}</span>
          </div>
          <h1 className="text-xl font-bold mb-2">{post.title}</h1>
        </div>

        <div className="flex p-4">
          <div className="flex flex-col items-center mr-4">
            <button
              onClick={() => handleVote(1)}
              disabled={isVoting}
              className={`p-1 rounded ${userVote === 1 ? 'text-orange-500' : 'text-gray-400'} hover:bg-gray-100`}
            >
              <ArrowUp size={24} />
            </button>
            <span className="font-bold my-1">{post.score}</span>
            <button
              onClick={() => handleVote(-1)}
              disabled={isVoting}
              className={`p-1 rounded ${userVote === -1 ? 'text-blue-500' : 'text-gray-400'} hover:bg-gray-100`}
            >
              <ArrowDown size={24} />
            </button>
            {voteError && <div className="text-xs text-red-500 mt-1">{voteError}</div>}
          </div>

          <div className="flex-1">
            <div className="mb-4 text-gray-800 whitespace-pre-line">
              <img></img>
            </div>
            
            {renderMedia()}

            <div className="flex items-center text-gray-500 text-sm">
              <button className="flex items-center mr-4 hover:bg-gray-100 p-1 rounded">
                <MessageSquare size={18} className="mr-1" />
                <span>{post.commentCount} Comments</span>
              </button>
              <button className="flex items-center mr-4 hover:bg-gray-100 p-1 rounded">
                <Share2 size={18} className="mr-1" />
                <span>Share</span>
              </button>
              <button className="flex items-center mr-4 hover:bg-gray-100 p-1 rounded">
                <Bookmark size={18} className="mr-1" />
                <span>Save</span>
              </button>
              <button className="flex items-center hover:bg-gray-100 p-1 rounded">
                <MoreHorizontal size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      
      <div className="mt-4 bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-lg font-bold">Comments ({post.comments.length})</h2>
        </div>
        <CommentSection initialComments={post.comments as any} postId={post.id} />
      </div>
    </div>
  );
};

export default PostDetailPage;