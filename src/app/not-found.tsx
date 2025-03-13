"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Bell, User, Search, BookOpen, Monitor } from "lucide-react";

function Custom404() {
  return (
    <div className="min-h-screen bg-[#f3f2f0] relative overflow-hidden">
      {/* Background Icons */}
      <div className="absolute inset-0 flex justify-center items-center opacity-10">
        <Monitor className="w-64 h-64 text-gray-400 absolute top-16 left-16" />
        <BookOpen className="w-64 h-64 text-gray-400 absolute bottom-16 right-16" />
      </div>

      {/* Navigation Bar */}
      <nav className="bg-white border-b relative z-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-14">
            <div className="flex items-center gap-8">
              <Link href="/" className="text-xl font-bold text-indigo-600">
                KGP Connect
              </Link>
              <div className="relative flex items-center">
                <Search className="absolute left-3 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-1.5 w-64 text-sm rounded-md bg-gray-100 border border-gray-200 focus:outline-none focus:border-gray-400"
                />
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <Link
                href="/home"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Home
              </Link>
              <Link
                href="/feed"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Feed
              </Link>
              <Link
                href="/network"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Network
              </Link>
              <Link
                href="/messages"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Messages
              </Link>
              <button className="text-gray-600 hover:text-gray-900">
                <Bell className="w-5 h-5" />
              </button>
              <button className="text-gray-600 hover:text-gray-900">
                <User className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 404 Content */}
      <div className="max-w-6xl mx-auto px-4 py-16 relative z-10">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-indigo-600 mb-4">404</h1>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Page Not Found
          </h2>
          <p className="text-base text-gray-600 mb-8">
            The page you are looking for doesn't exist or has been moved.
          </p>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-full text-sm font-medium hover:bg-indigo-700"
          >
            <ArrowLeft className="w-4 h-4" />
            Return Home
          </Link>

          <p className="mt-8 text-sm text-gray-600">
            Need help?{" "}
            <Link
              href="/support"
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Custom404;
