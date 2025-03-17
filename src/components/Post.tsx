"use client";
import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { ThumbsUp, ThumbsDown, MessageCircle, Share2, MoreHorizontal, Trash2, CheckCircle } from "lucide-react";
import { PostProps, Author } from "../types";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";

interface PostComponentProps extends PostProps {
  currentUser: Author | null;
  onDelete: (id: string) => void;
}

const Post: React.FC<PostComponentProps> = ({
  id,
  title,
  content,
  type,
  createdAt,
  author,
  isVerified,
  score,
  _count,
  currentUser,
  onDelete,
  userVote
}) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [voteScore, setVoteScore] = useState(score);
  const [userVoteState, setUserVoteState] = useState<number | null>(userVote || null);
  const [isVoting, setIsVoting] = useState(false);
  const [voteError, setVoteError] = useState<string | null>(null);
  
  const formattedDate = formatDistanceToNow(new Date(createdAt), { addSuffix: true });
  
  let parsedContent;
  try {
    parsedContent = typeof content === 'string' ? JSON.parse(content) : content;
  } catch (e) {
    parsedContent = { text: content };
  }

  const handleVote = async (value: number) => {
    if (isVoting) return;
    
    // Check if the user is authenticated
    if (status !== "authenticated") {
      toast.error("You need to be logged in to vote");
      return;
    }
    
    setIsVoting(true);
    setVoteError(null);
    
    try {
      if (userVoteState === value) {
        console.log('Sending vote request:', { postId: id, value });
        const response = await fetch(`/api/postVotes?postId=${id}`, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json'
          },
          credentials: 'include', // Important for sending cookies/session data
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(response.status === 401 ? 'You need to be logged in to vote' : errorData.error || 'Failed to remove vote');
        }
        
        setVoteScore(prevScore => prevScore - value);
        setUserVoteState(null);
        toast.success('Vote removed');
      } 
      else if (userVoteState === null) {
        console.log('Sending vote request:', { postId: id, value });
        const response = await fetch('/api/postVotes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          credentials: 'include', 
          body: JSON.stringify({
            postId: id,
            value: value
          })
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(response.status === 401 ? 'You need to be logged in to vote' : errorData.error || 'Failed to vote');
        }
        
        // Update UI state
        setVoteScore(prevScore => prevScore + value);
        setUserVoteState(value);
        toast.success(value === 1 ? 'Post liked' : 'Post disliked');
      }
      // Case 3: Changing vote (e.g., from upvote to downvote)
      else {
        console.log('Sending vote request:', { postId: id, value });
        const response = await fetch('/api/postVotes', {
          method: 'POST',
          body: JSON.stringify({
            postId: id,
            value: value
          })
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(response.status === 401 ? 'You need to be logged in to vote' : errorData.error || 'Failed to vote');
        }
        

        const scoreDelta = value - userVoteState;
        setVoteScore(prevScore => prevScore + scoreDelta);
        setUserVoteState(value);
        toast.success(value === 1 ? 'Post liked' : 'Post disliked');
      }
      
    
      router.refresh();
    } catch (error) {
      console.error('Error voting on post:', error);
      setVoteError(error instanceof Error ? error.message : 'Failed to vote');
      toast.error(error instanceof Error ? error.message : 'Failed to vote');
    } finally {
      setIsVoting(false);
    }
  };
  
  const handleDeletePost = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        onDelete(id);
        toast.success('Post deleted successfully');
      } catch (error) {
        toast.error('Failed to delete post');
        console.error('Error deleting post:', error);
      }
    }
    setDropdownOpen(false);
  };

  const navigateToComments = () => {
    router.push(`/post/${id}`);
  };
  
  const canDelete = currentUser && (currentUser.id === author.id || currentUser.role === "ADMIN");

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <img
            src={author.image || "/default-avatar.png"}
            alt={author.name || "User avatar"}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="ml-3">
            <div className="flex items-center">
              <p className="font-medium text-gray-900">{author.name}</p>
              {isVerified && (
                <span className="ml-1 text-indigo-600" title="Verified">
                  <CheckCircle className="w-4 h-4" />
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500">{formattedDate}</p>
          </div>
        </div>
        
        {/* Options dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
            aria-label="Post options"
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>
          
          {dropdownOpen && (
            <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10 py-1">
              {canDelete && (
                <button
                  onClick={handleDeletePost}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete post
                </button>
              )}
              {!canDelete && (
                <button
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Report post
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Post title */}
      <div className="px-6 pb-2">
        <h3 className="font-semibold text-lg text-gray-900">{title}</h3>
      </div>
      
      {/* Post content */}
      <div className="px-6">
        {parsedContent.caption && (
          <p className="text-gray-800 mb-3">{parsedContent.caption}</p>
        )}
        
        {type === 'image' && parsedContent.mediaUrl && (
          <div className="rounded-lg overflow-hidden mb-4">
            <img
              src={parsedContent.mediaUrl}
              alt={parsedContent.caption || 'Post image'}
              className="w-full object-cover max-h-[500px]"
            />
          </div>
        )}
        
        {type === 'video' && parsedContent.mediaUrl && (
          <div className="rounded-lg overflow-hidden mb-4">
            <video
              src={parsedContent.mediaUrl}
              controls
              className="w-full max-h-[500px]"
            />
          </div>
        )}
        
        {type === 'text' && !parsedContent.mediaUrl && (
          <p className="text-gray-800 mb-4">{parsedContent.text || content}</p>
        )}
        
        {voteError && (
          <div className="text-red-600 text-sm mb-4 p-2 bg-red-50 rounded-md">
            Error: {voteError}
          </div>
        )}
      </div>
      
      {/* Post stats */}
      <div className="px-6 py-2 border-t text-sm text-gray-500 flex justify-between">
        <div className="flex space-x-4">
          <span>{voteScore} likes</span>
          <span>{_count?.comments || 0} comments</span>
        </div>
      </div>
      
     
      <div className="px-4 py-3 border-t flex justify-around">
        <button
          onClick={() => handleVote(1)}
          className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-md transition ${
            userVoteState === 1
              ? 'text-indigo-600 font-medium'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
          disabled={isVoting || status !== "authenticated"}
        >
          <ThumbsUp className={`w-5 h-5 ${userVoteState === 1 ? 'fill-indigo-600' : ''}`} />
          <span>Like</span>
        </button>
        
        <button 
          onClick={navigateToComments}
          className="flex items-center justify-center space-x-2 px-4 py-2 rounded-md text-gray-600 hover:bg-gray-100 transition"
        >
          <MessageCircle className="w-5 h-5" />
          <span>Comment</span>
        </button>
        
        <button
          onClick={() => handleVote(-1)}
          className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-md transition ${
            userVoteState === -1
              ? 'text-red-600 font-medium'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
          disabled={isVoting || status !== "authenticated"}
        >
          <ThumbsDown className={`w-5 h-5 ${userVoteState === -1 ? 'fill-red-600' : ''}`} />
          <span>Dislike</span>
        </button>
      </div>
    </div>
  );
};

export default Post;