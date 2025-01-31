import React from 'react';
import { ThumbsUp, MessageCircle, Bookmark, Send } from 'lucide-react';
import { PostProps } from '../app/types';

const Post: React.FC<PostProps> = ({ author, content, image, likes, comments, timeAgo }) => {
  return (
    <div className="bg-white rounded-lg border p-4 space-y-4">
      <div className="flex items-center gap-3">
        <img 
          src={author.image}
          alt={author.name}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">{author.name}</h3>
            <span className="text-sm text-gray-500">{timeAgo}</span>
          </div>
        </div>
      </div>

      <p className="text-gray-600">
        {content}{" "}
        <button className="text-indigo-600">Read more</button>
      </p>

      {image && (
        <img 
          src={image}
          alt="Post content"
          className="w-full rounded-lg"
        />
      )}

      <div className="flex items-center justify-between pt-2 border-t">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">{likes} Likes</span>
          <span className="text-sm text-gray-600">{comments} comments</span>
        </div>
        <div className="flex items-center gap-4">
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
            Saved
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <img 
          src="https://media.istockphoto.com/id/1682296067/photo/happy-studio-portrait-or-professional-man-real-estate-agent-or-asian-businessman-smile-for.jpg?s=612x612&w=0&k=20&c=9zbG2-9fl741fbTWw5fNgcEEe4ll-JegrGlQQ6m54rg="
          alt="Current user"
          className="w-8 h-8 rounded-full"
        />
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Add a comment..."
            className="w-full pr-10 py-2 px-4 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 text-indigo-600">
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;