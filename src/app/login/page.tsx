"use client"

import { signIn } from "next-auth/react";
import { signOut , useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState ,useEffect} from "react";
import { Handshake, Users, Network, Sparkles } from "lucide-react";

export default function Login() {
  const router = useRouter();
  const [isFlipped, setIsFlipped] = useState(false);
  const [isToken,setIsToken] = useState(false);

  const session = useSession();
  useEffect(() => {
    if (session?.data?.user) {
      setIsToken(true);
    }
  }, [session]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-white relative overflow-hidden">
      <div className="absolute h-full w-full">
        <svg
          className="absolute h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            d="M 0,0 L 60,0 C 70,0 75,50 65,50 C 55,50 45,100 55,100 L 0,100 Z"
            fill="#f5f7ff"
            className="transition-all duration-300"
          />
        </svg>
      </div>

      {/* Left Section */}
      <div className="flex flex-col items-start justify-center md:w-1/2 px-8 md:px-16 lg:px-24 relative z-10">
        <div className="animate-fade-in-up max-w-md">
          <div className="relative">
            <div className="absolute -left-12 -top-8 animate-float">
              <Handshake size={32} className="text-indigo-500 rotate-[-15deg]" />
            </div>
            <div className="absolute -right-10 -top-6 animate-float animation-delay-150">
              <Users size={28} className="text-indigo-400 rotate-12" />
            </div>
            <div className="absolute -left-8 bottom-0 animate-float animation-delay-300">
              <Network size={24} className="text-indigo-300" />
            </div>
            <div className="absolute -right-6 bottom-2 animate-float animation-delay-450">
              <Sparkles size={20} className="text-indigo-400 rotate-[15deg]" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-indigo-600">
              KGP Connect
            </h1>
          </div>
          <p className="text-sm md:text-base text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis fuga odit asperiores autem temporibus? Nisi alias numquam sit accusantium.
          </p>
        </div>
      </div>

      {/* Right Section with Flip Card */}
      <div className="flex items-center justify-center md:w-1/2 w-full p-6 md:p-12 relative z-10">
        <div className={`w-full max-w-md perspective-1000 ${isFlipped ? 'rotate-y-180' : ''} duration-1000 relative preserve-3d`}>
          {/* Login Form - Front */}
          <div className={`w-full p-8 rounded-3xl shadow-xl bg-white animate-fade-in-up animation-delay-150 ${isFlipped ? 'block' : 'hidden'}`}>
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">Sign In</h2>
            <p className="text-sm text-center text-gray-500 mb-6">
              Don't have an account?{" "}
              <span 
                onClick={handleFlip}
                className="text-indigo-600 cursor-pointer hover:text-indigo-500 transition-colors"
              >
                Create one
              </span>
            </p>

            <form
              action={async (formdata) => {
                const email = formdata.get("email");
                const password = formdata.get("password");
                const response = await signIn("credentials", {
                  email,
                  password,
                  redirect: false,
                });
                if (response?.status === 200) {
                  router.push("/");
                }
              }}
              className="space-y-6"
            >
              <div className="animate-fade-in-up animation-delay-300">
                <label className="block text-gray-700 font-medium mb-1">Email</label>
                <input
                  name="email"
                  type="email"
                  className="w-full px-4 py-3 rounded-xl text-gray-900 bg-gray-50 border-none focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-200"
                  placeholder="Enter your email"
                />
              </div>

              <div className="animate-fade-in-up animation-delay-450">
                <label className="block text-gray-700 font-medium mb-1">Password</label>
                <input
                  name="password"
                  type="password"
                  className="w-full px-4 py-3 rounded-xl text-gray-900 bg-gray-50 border-none focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-200"
                  placeholder="Enter your password"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all duration-200 animate-fade-in-up animation-delay-600"
              >
                Sign In
              </button>
            </form>
          </div>

          {/* Register Form - Back */}
          <div className={`w-full p-8 rounded-3xl shadow-xl bg-white animate-fade-in-up animation-delay-150 relative top-0 ${isFlipped ? 'hidden' : 'block'}`}>
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">Create Account</h2>
            <p className="text-sm text-center text-gray-500 mb-6">
              Already have an account?{" "}
              <span 
                onClick={handleFlip}
                className="text-indigo-600 cursor-pointer hover:text-indigo-500 transition-colors"
              >
                Sign in
              </span>
            </p>
            {isToken?(
            <form
              action={async (formdata) => {
                const name = formdata.get("name");
                const email = formdata.get("email");
                const password = formdata.get("password");
                const response = await signIn("nodemailer", {
                  email,
                  password
                });
                if (response?.status === 200) {
                  router.push("/");
                }
              }}
              className="space-y-6"
            >
              <div className="animate-fade-in-up animation-delay-300">
                <label className="block text-gray-700 font-medium mb-1">Name</label>
                <input
                  name="name"
                  type="text"
                  className="w-full px-4 py-3 rounded-xl text-gray-900 bg-gray-50 border-none focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-200"
                  placeholder="Enter your name"
                />
              </div>

              <div className="animate-fade-in-up animation-delay-300">
                <label className="block text-gray-700 font-medium mb-1">Email</label>
                <input
                  name="email"
                  type="email"
                  className="w-full px-4 py-3 rounded-xl text-gray-900 bg-gray-50 border-none focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-200"
                  placeholder="Enter your email"
                />
              </div>

              <div className="animate-fade-in-up animation-delay-450">
                <label className="block text-gray-700 font-medium mb-1">Password</label>
                <input
                  name="password"
                  type="password"
                  className="w-full px-4 py-3 rounded-xl text-gray-900 bg-gray-50 border-none focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-200"
                  placeholder="Enter your password"
                />
              </div>
              <div className="animate-fade-in-up animation-delay-450">
                <label className="block text-gray-700 font-medium mb-1">Confirm Password</label>
                <input
                  name="password"
                  type="password"
                  className="w-full px-4 py-3 rounded-xl text-gray-900 bg-gray-50 border-none focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-200"
                  placeholder="Enter your password"
                />
              </div>


              <button
                type="submit"
                className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all duration-200 animate-fade-in-up animation-delay-600"
              >
                Create Account
              </button>
            </form>
            ): (<form
              action={async (formdata) => {
               
                const email = formdata.get("email");
                 await signIn("nodemailer", {
                  email,
                  
                });
                
              }}
              className="space-y-6"
            >

              <div className="animate-fade-in-up animation-delay-300">
                <label className="block text-gray-700 font-medium mb-1">Email</label>
                <input
                  name="email"
                  type="email"
                  className="w-full px-4 py-3 rounded-xl text-gray-900 bg-gray-50 border-none focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-200"
                  placeholder="Enter your email"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all duration-200 animate-fade-in-up animation-delay-600"
              >
                Create Account
              </button>
            </form>)}
          </div>
        </div>
      </div>
    </div>
  );
}