"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const SocialMedia = () => {
  return (
    <section className="py-16 px-6 text-center text-orange-600" id="contact">
      <h2 className="text-3xl font-bold mb-6">Connect With Us</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-6 place-items-center">
        {/* Twitter Embed */}
        <motion.div
          className="max-w-[300px] w-full h-60 bg-blue-500 rounded-2xl shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex justify-between items-center p-4">
            <span className="text-white font-bold text-lg">X (Twitter)</span>
            <Link
              href="https://x.com/IITKgpAlumni"
              target="_blank"
              className="bg-white text-black px-4 py-1 rounded-full text-sm font-semibold"
            >
              Follow
            </Link>
          </div>
          <img
            src="/social/X.png"
            alt="X Logo"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* LinkedIn Embed */}
        <motion.div
          className="max-w-[300px] w-full h-60 bg-blue-700 rounded-2xl shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex justify-between items-center p-4">
            <span className="text-white font-bold text-lg">LinkedIn</span>
            <Link
              href="https://www.linkedin.com/company/sac-iitkgp/"
              target="_blank"
              className="bg-white text-black px-4 py-1 rounded-full text-sm font-semibold"
            >
              Connect
            </Link>
          </div>
          <img
            src="/social/Linkedin.png"
            alt="LinkedIn Logo"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Instagram Embed */}
        <motion.div
          className="max-w-[300px] w-full h-60 bg-gradient-to-r from-pink-500 to-red-500 rounded-2xl shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex justify-between items-center p-4">
            <span className="text-white font-bold text-lg">Instagram</span>
            <Link
              href="https://www.instagram.com/sac.iitkgp/?hl=en"
              target="_blank"
              className="bg-white text-black px-4 py-1 rounded-full text-sm font-semibold"
            >
              Follow
            </Link>
          </div>
          <img
            src="/social/Instagram.png"
            alt="Instagram Logo"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Facebook Embed */}
        <motion.div
          className="max-w-[300px] w-full h-60 bg-gradient-to-r from-blue-500 to-blue-700 rounded-2xl shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex justify-between items-center p-4">
            <span className="text-white font-bold text-lg">Facebook</span>
            <Link
              href="https://www.facebook.com/iitkgp.alumnicell"
              target="_blank"
              className="bg-white text-black px-4 py-1 rounded-full text-sm font-semibold"
            >
              Follow
            </Link>
          </div>
          <img
            src="/social/Facebook.png"
            alt="Facebook Logo"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default SocialMedia;
