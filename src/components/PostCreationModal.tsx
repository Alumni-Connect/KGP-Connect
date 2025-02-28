"use client";
import React, { useState, useRef } from 'react';
import { X, Image, Video, MapPin, Smile } from 'lucide-react';

const PostCreationModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [postContent, setPostContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    console.log('Submitting post:', { content: postContent, image: selectedImage });
    setPostContent('');
    setSelectedImage(null);
    setImagePreview(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 overflow-hidden"> 
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between"> 
          <h3 className="text-xl font-semibold text-indigo-600">Create Post</h3> 
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500 focus:outline-none">
            <X className="h-6 w-6" /> 
          </button>
        </div>

       
        <div className="px-6 py-4 flex items-center"> 
          <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-200"> 
            <img src="/api/placeholder/48/48" alt="User profile" className="h-full w-full object-cover" />
          </div>
          <div className="ml-4">
            <p className="font-medium text-gray-800 text-lg">mogambo</p> {/* Increased font size */}
            <p className="text-sm text-gray-500">UG Student @ IIT Kharagpur</p>
          </div>
        </div>

        {/* Text Input */}
        <div className="px-6 py-3">
          <textarea
            className="w-full border-0 focus:ring-0 resize-none text-gray-800 placeholder-gray-400 text-lg h-32" 
            placeholder="What's on your mind?" 
            value={postContent} 
            onChange={(e) => setPostContent(e.target.value)}
          ></textarea>

          {imagePreview && (
            <div className="relative mt-3 rounded-md overflow-hidden">
              <img src={imagePreview} alt="Selected preview" className="w-full h-64 object-cover" /> {/* Increased height */}
              <button
                onClick={() => {
                  setSelectedImage(null);
                  setImagePreview(null);
                }}
                className="absolute top-2 right-2 bg-gray-800 bg-opacity-70 rounded-full p-2 text-white"
              >
                <X className="h-5 w-5" /> {/* Bigger close button */}
              </button>
            </div>
          )}
        </div>

        {/* Media options */}
        <div className="px-6 py-4 border-t border-gray-200">
          <p className="text-base text-gray-500 mb-2">Add to your post</p> {/* Slightly bigger text */}
          <div className="flex space-x-6"> {/* Increased spacing */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center text-indigo-500 hover:bg-indigo-50 rounded-md px-3 py-2 transition"
            >
              <Image className="h-6 w-6 mr-2" /> {/* Bigger icon */}
              <span className="text-base">Photo</span> {/* Bigger text */}
            </button>
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />

            <button className="flex items-center text-red-500 hover:bg-red-50 rounded-md px-3 py-2 transition">
              <Video className="h-6 w-6 mr-2" />
              <span className="text-base">Video</span>
            </button>

            <button className="flex items-center text-yellow-500 hover:bg-yellow-50 rounded-md px-3 py-2 transition">
              <Smile className="h-6 w-6 mr-2" />
              <span className="text-base">Feeling</span>
            </button>

            <button className="flex items-center text-green-500 hover:bg-green-50 rounded-md px-3 py-2 transition">
              <MapPin className="h-6 w-6 mr-2" />
              <span className="text-base">Location</span>
            </button>
          </div>
        </div>

        {/* Post Button */}
        <div className="px-6 py-4 border-t border-gray-200">
          <button
            onClick={handleSubmit}
            disabled={!postContent && !selectedImage}
            className={`w-full py-3 px-4 rounded-md text-white font-medium focus:outline-none text-lg ${ 
              !postContent && !selectedImage ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCreationModal;
