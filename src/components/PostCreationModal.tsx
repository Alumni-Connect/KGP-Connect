"use client";
import React, { useState, useRef } from 'react';
import { X, Image, Video, MapPin, Smile } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface PostCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  subreddit?: string;
  onPost?: () => void;
}

const PostCreationModal: React.FC<PostCreationModalProps> = ({ 
  isOpen, 
  onClose,
  subreddit = "general",
  onPost
}) => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [selectedMedia, setSelectedMedia] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Check if file is an image or video
      if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
        setError('Only images and videos are supported');
        return;
      }
      
      setSelectedMedia(file);
      setMediaPreview(URL.createObjectURL(file));
      setError(null);
    }
  };

  const handleSubmit = async () => {
    // Validation
    if (!title) {
      setError('Title is required');
      return;
    }
    
    if (!caption && !selectedMedia) {
      setError('Please add some content to your post');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('subreddit', subreddit);
      
      if (caption) {
        formData.append('caption', caption);
      }
      
      // Handle media posts vs text posts
      if (selectedMedia) {
        formData.append('media', selectedMedia);
        formData.append('type', selectedMedia.type.startsWith('image/') ? 'image' : 'video');
        
        // Post with media
        const response = await fetch('/api/posts', {
          method: 'POST',
          body: formData,
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to create post');
        }
      } else {
        // Text post
        const response = await fetch('/api/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title,
            content: { text: caption },
            subreddit,
            type: 'text',
            caption
          }),
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to create post');
        }
      }
      
      // Refresh the data
      router.refresh();
      
      if (onPost) {
        onPost();
      }
      
      // Reset form and close modal
      resetForm();
    } catch (error) {
      console.error('Error creating post:', error);
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const resetForm = () => {
    setTitle('');
    setCaption('');
    setSelectedMedia(null);
    setError(null);
    if (mediaPreview) {
      URL.revokeObjectURL(mediaPreview);
      setMediaPreview(null);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 overflow-hidden">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-indigo-600">Create Post</h3>
          <button 
            onClick={resetForm} 
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
            aria-label="Close modal"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Profile Section */}
        <div className="px-6 py-4 flex items-center">
          <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-200">
            <img src="https://avatars.githubusercontent.com/u/9919?v=4" alt="User profile" className="h-full w-full object-cover" />
          </div>
          <div className="ml-4">
            <p className="font-medium text-gray-800 text-lg">User Name</p>
            <p className="text-sm text-gray-500">UG Student @ IIT Kharagpur</p>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="px-6 py-2 text-red-500 text-sm">
            {error}
          </div>
        )}

        {/* Title input */}
        <div className="px-6 pt-3 pb-2">
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
            placeholder="Post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Post content area */}
        <div className="px-6 py-3">
          <textarea
            className="w-full border-0 focus:ring-0 resize-none text-gray-800 placeholder-gray-400 text-lg h-32" 
            placeholder="What's on your mind?" 
            value={caption} 
            onChange={(e) => setCaption(e.target.value)}
          ></textarea>

          {mediaPreview && (
            <div className="relative mt-3 rounded-md overflow-hidden">
              {selectedMedia?.type.startsWith('image/') ? (
                <img src={mediaPreview} alt="Selected preview" className="w-full h-64 object-cover" />
              ) : (
                <video src={mediaPreview} controls className="w-full h-64 object-cover" />
              )}
              <button
                onClick={() => {
                  setSelectedMedia(null);
                  if (mediaPreview) {
                    URL.revokeObjectURL(mediaPreview);
                    setMediaPreview(null);
                  }
                }}
                className="absolute top-2 right-2 bg-gray-800 bg-opacity-70 rounded-full p-2 text-white"
                aria-label="Remove media"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>

        {/* Media options */}
        <div className="px-6 py-4 border-t border-gray-200">
          <p className="text-base text-gray-500 mb-2">Add to your post</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center text-indigo-500 hover:bg-indigo-50 rounded-md px-3 py-2 transition"
              aria-label="Add photo"
            >
              <Image className="h-6 w-6 mr-2" />
              <span className="text-base">Photo</span>
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*,video/*" 
              onChange={handleMediaChange} 
              aria-label="Upload media" 
            />

            <button 
              className="flex items-center text-red-500 hover:bg-red-50 rounded-md px-3 py-2 transition"
              onClick={() => fileInputRef.current?.click()}
              aria-label="Add video"
            >
              <Video className="h-6 w-6 mr-2" />
              <span className="text-base">Video</span>
            </button>

            {/* <button 
              className="flex items-center text-yellow-500 hover:bg-yellow-50 rounded-md px-3 py-2 transition disabled:opacity-50"
              aria-label="Add feeling"
              disabled
            >
              <Smile className="h-6 w-6 mr-2" />
              <span className="text-base">Feeling</span>
            </button>

            <button 
              className="flex items-center text-green-500 hover:bg-green-50 rounded-md px-3 py-2 transition disabled:opacity-50"
              aria-label="Add location"
              disabled
            >
              <MapPin className="h-6 w-6 mr-2" />
              <span className="text-base">Location</span>
            </button> */}
          </div>
        </div>

        {/* Post Button */}
        <div className="px-6 py-4 border-t border-gray-200">
          <button
            onClick={handleSubmit}
            disabled={(!title || (!caption && !selectedMedia)) || isSubmitting}
            className={`w-full py-3 px-4 rounded-md text-white font-medium focus:outline-none ${
              (!title || (!caption && !selectedMedia)) || isSubmitting
                ? 'bg-indigo-300 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {isSubmitting ? 'Posting...' : 'Post'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCreationModal;