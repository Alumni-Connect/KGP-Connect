"use client";
import React, { useState } from 'react';
import { ArrowUp, ArrowDown, Reply, MoreHorizontal } from 'lucide-react';

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

interface CommentSectionProps {
  comments: Comment[];
  postId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ comments, postId }) => {
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting comment:', newComment);
    
    // In a real app, you would make an API call here
    // await fetch(`/api/posts/${postId}/comments`, {
    //   method: 'POST',
    //   body: JSON.stringify({ content: newComment })
    // });
    
    setNewComment('');
  };

  const handleReply = (commentId: string) => {
    console.log('Submitting reply to comment:', commentId, replyContent);
    
    // In a real app, you would make an API call here
    // await fetch(`/api/comments/${commentId}/replies`, {
    //   method: 'POST',
    //   body: JSON.stringify({ content: replyContent })
    // });
    
    setReplyingTo(null);
    setReplyContent('');
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  // Individual comment component
  const CommentItem = ({ comment }: { comment: Comment }) => {
    const [userVote, setUserVote] = useState(0);
    const [commentScore, setCommentScore] = useState(comment.score);

    const handleVote = (value: number) => {
      if (userVote === value) {
        // User is removing their vote
        setUserVote(0);
        setCommentScore(commentScore - value);
      } else {
        // User is changing their vote or voting for the first time
        setCommentScore(commentScore - userVote + value);
        setUserVote(value);
      }
      
      // In a real app, you would make an API call here
      // fetch(`/api/comments/${comment.id}/vote`, {
      //   method: 'POST',
      //   body: JSON.stringify({ value })
      // });
    };

    return (
      <div className="mb-4">
        <div className="flex space-x-3">
          {/* Vote buttons */}
          <div className="flex flex-col items-center space-y-1">
            <button 
              onClick={() => handleVote(1)} 
              className={`p-1 rounded-full ${userVote === 1 ? 'text-indigo-600' : 'text-gray-400 hover:text-indigo-600'}`}
            >
              <ArrowUp className="h-4 w-4" />
            </button>
            <span className="text-xs font-medium text-gray-700">{commentScore}</span>
            <button 
              onClick={() => handleVote(-1)} 
              className={`p-1 rounded-full ${userVote === -1 ? 'text-indigo-600' : 'text-gray-400 hover:text-indigo-600'}`}
            >
              <ArrowDown className="h-4 w-4" />
            </button>
          </div>

          {/* Comment content */}
          <div className="flex-1">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center mb-2">
                <div className="h-6 w-6 rounded-full bg-gray-200 mr-2">
                  {comment.author.image ? (
                    <img src={comment.author.image} alt={comment.author.name} className="h-full w-full object-cover rounded-full" />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-full">
                      {comment.author.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <span className="font-medium text-gray-800 mr-2">{comment.author.name}</span>
                <span className="text-xs text-gray-500">• {formatDate(comment.createdAt)}</span>
              </div>
              
              <div className="text-gray-800 mb-2">{comment.content}</div>
              
              <div className="flex items-center text-xs text-gray-500 space-x-4">
                <button 
                  onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                  className="flex items-center hover:text-indigo-600"
                >
                  <Reply className="h-3 w-3 mr-1" />
                  <span>Reply</span>
                </button>
                <button className="flex items-center hover:text-indigo-600">
                  <MoreHorizontal className="h-3 w-3 mr-1" />
                  <span>More</span>
                </button>
              </div>
            </div>
            
            {/* Reply form */}
            {replyingTo === comment.id && (
              <div className="mt-3 ml-6">
                <textarea
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Write a reply..."
                  rows={3}
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                ></textarea>
                <div className="flex justify-end mt-2 space-x-2">
                  <button
                    onClick={() => setReplyingTo(null)}
                    className="px-3 py-1.5 text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleReply(comment.id)}
                    disabled={!replyContent.trim()}
                    className={`px-3 py-1.5 text-sm rounded-md text-white ${!replyContent.trim() ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                  >
                    Reply
                  </button>
                </div>
              </div>
            )}

            {/* Show replies if any */}
            {comment.replies && comment.replies.length > 0 && (
              <div className="ml-6 mt-3 border-l-2 border-gray-200 pl-4">
                {comment.replies.map((reply) => (
                  <CommentItem key={reply.id} comment={reply} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* New comment form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <textarea
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          placeholder="Add a comment..."
          rows={4}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <div className="flex justify-end mt-2">
          <button
            type="submit"
            disabled={!newComment.trim()}
            className={`px-4 py-2 rounded-md text-white font-medium ${!newComment.trim() ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
          >
            Comment
          </button>
        </div>
      </form>

      {/* Comments list */}
      <div>
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default CommentSection;