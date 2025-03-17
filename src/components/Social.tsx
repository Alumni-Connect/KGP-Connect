"use client";

import { motion } from "framer-motion";

const SocialMedia = () => {
  return (
    <section className="py-16 px-6 text-center text-orange-600">
      <h2 className="text-3xl font-bold mb-6">Connect With Us</h2>
      <div className="flex flex-col md:flex-row justify-center items-center gap-6">
        {/* Twitter Embed */}
        <motion.div
          className="w-80 h-60 bg-blue-500 rounded-2xl shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex justify-between items-center p-4">
            <span className="text-white font-bold text-lg">X (Twitter)</span>
            <button className="bg-white text-black px-4 py-1 rounded-full text-sm font-semibold">
              Follow
            </button>
          </div>
          <img
            src="/X.png"
            alt="X Logo"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* LinkedIn Embed */}
        <motion.div
          className="w-80 h-60 bg-blue-700 rounded-2xl shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex justify-between items-center p-4">
            <span className="text-white font-bold text-lg">LinkedIn</span>
            <button className="bg-white text-black px-4 py-1 rounded-full text-sm font-semibold">
              Connect
            </button>
          </div>
          <img
            src="/linkedin.png"
            alt="LinkedIn Logo"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Instagram Embed */}
        <motion.div
          className="w-80 h-60 bg-gradient-to-r from-pink-500 to-red-500 rounded-2xl shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex justify-between items-center p-4">
            <span className="text-white font-bold text-lg">Instagram</span>
            <button className="bg-white text-black px-4 py-1 rounded-full text-sm font-semibold">
              Follow
            </button>
          </div>
          <img
            src="/insta.png"
            alt="Instagram Logo"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default SocialMedia;
