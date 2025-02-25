import React from 'react';
import { ThumbsUp, MessageCircle, Bookmark, Send } from 'lucide-react';
import { PostProps } from '../types';

const Post: React.FC<PostProps> = ({ author, content, image, likes, comments, timeAgo }) => {
  return (
    <div className="bg-white rounded-xl border p-4 space-y-4 shadow-sm">
      {/* Author Info */}
      <div className="flex items-center gap-3">
        <img 
          src={author.image}
          alt={author.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <h3 className="font-semibold">{author.name}</h3>
          <span className="text-sm text-gray-500">{timeAgo}</span>
        </div>
      </div>

      {/* Post Content */}
      <p className="text-gray-700">
        {content}{" "}
        <button className="text-indigo-600 hover:underline">Read more</button>
      </p>

      {/* Post Image */}
      {image && (
        <img 
          src={image}
          alt="Post content"
          className="w-full rounded-lg object-cover"
        />
      )}

      {/* Likes & Comments Count */}
      <div className="flex items-center justify-between text-sm text-gray-600 pt-2 border-t">
        <div className="flex items-center gap-3">
          <span>{likes} Likes</span>
          <span>{comments} Comments</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between border-t pt-2">
        <button className="flex items-center gap-2 text-gray-600 hover:text-indigo-600">
          <ThumbsUp className="w-5 h-5" />
          Like
        </button>
        <button className="flex items-center gap-2 text-gray-600 hover:text-indigo-600">
          <MessageCircle className="w-5 h-5" />
          Comment
        </button>
        <button className="flex items-center gap-2 text-gray-600 hover:text-indigo-600">
          <Bookmark className="w-5 h-5" />
          Save
        </button>
      </div>

      {/* Comment Input */}
      <div className="flex items-center gap-3 pt-2 border-t">
        <img 
          src="https://media.istockphoto.com/id/1682296067/photo/happy-studio-portrait-or-professional-man-real-estate-agent-or-asian-businessman-smile-for.jpg"
          alt="User"
          className="w-8 h-8 rounded-full object-cover"
        />
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Add a comment..."
            className="w-full pr-10 py-2 px-4 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-600 hover:text-indigo-800">
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
