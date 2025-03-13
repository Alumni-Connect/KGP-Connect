"use client";

import { signIn } from "next-auth/react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Handshake, Users, Network, Sparkles } from "lucide-react";
import NotificationContainer from "../../components/notifier";
import { subset } from "../../components/notifier";
import RowRadioButtonsGroup from "@/components/radiobutton";

type notifyVar = Pick<subset, "duration" | "message" | "type">;
enum Role {
  STUDENT = "STUDENT",
  ALUM = "ALUM",
  ADMIN = "ADMIN",
}
export default function Login() {
  const router = useRouter();
  const [isFlipped, setIsFlipped] = useState(false);
  const [isToken, setIsToken] = useState(false);
  const [notification, setNotification] = useState<notifyVar[]>([]);
  const [loginFor, setLoginFor] = useState<string>("other");
  const { data: session, update } = useSession();
  useEffect(() => {
    if (session?.user.role) {
      router.push("/home");
    }
  }, [session?.user.role]);
  useEffect(() => {
    if (session?.user) {
      setIsToken(true);
    }
  }, [session]);

  const student = () => {
    setLoginFor("student");
  };

  const admin = () => {
    setLoginFor("admin");
  };

  const alumni = () => {
    setLoginFor("alumni");
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const callNotification = (type: string, msg: string) => {
    setNotification((prev) => [
      ...prev,
      { type: type, message: msg, duration: 1000 },
    ]);
    setTimeout(() => {
      const filteredOne = notification.filter(
        (notify) => notify.message !== msg,
      );
      setNotification((prev) => [...prev, ...filteredOne]);
    }, 1000);
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

      <div className="flex flex-col items-start justify-center md:w-1/2 px-8 md:px-16 lg:px-24 relative z-10">
        <div className="animate-fade-in-up max-w-md">
          <div className="relative">
            <div className="absolute -left-12 -top-8 animate-float">
              <Handshake
                size={32}
                className="text-indigo-500 rotate-[-15deg]"
              />
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
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Perspiciatis fuga odit asperiores autem temporibus? Nisi alias
            numquam sit accusantium.
          </p>
        </div>
      </div>

      {/* Right Section with Flip Card */}
      <div className="flex items-center justify-center md:w-1/2 w-full p-6 md:p-12 relative z-10">
        <div
          className={`w-full max-w-md perspective-1000 ${isFlipped ? "rotate-y-180" : ""} duration-1000 relative preserve-3d`}
        >
          {/* Login Form - Front */}
          <div
            className={`w-full p-8 rounded-3xl shadow-xl bg-white animate-fade-in-up animation-delay-150 ${isFlipped ? "block" : "hidden"}`}
          >
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
              Sign In
            </h2>
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
                if (!email || !password) {
                  return;
                }
                const response = await signIn("credentials", {
                  email,
                  password,
                  redirect: false,
                });
                if (response?.status === 200) {
                  router.push("/home");
                }
              }}
              className="space-y-6"
            >
              <div className="animate-fade-in-up animation-delay-300">
                <label className="block text-gray-700 font-medium mb-1">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  className="w-full px-4 py-3 rounded-xl text-gray-900 bg-gray-50 border-none focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-200"
                  placeholder="Enter your email"
                />
              </div>

              <div className="animate-fade-in-up animation-delay-450">
                <label className="block text-gray-700 font-medium mb-1">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  className="w-full px-4 py-3 rounded-xl text-gray-900 bg-gray-50 border-none focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-200"
                  placeholder="Enter your password"
                />
              </div>
              <button
                onClick={async () => {
                  router.push("/change-credentials");
                }}
              >
                forgot password ?
              </button>
              <button
                type="submit"
                className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all duration-200 animate-fade-in-up animation-delay-600"
              >
                Sign In
              </button>
            </form>
          </div>

          {/* Register Form - Back */}
          <div
            className={`w-full p-8 rounded-3xl shadow-xl bg-white animate-fade-in-up animation-delay-150 relative top-0 ${isFlipped ? "hidden" : "block"}`}
          >
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
              Create Account
            </h2>
            <p className="text-sm text-center text-gray-500 mb-6">
              Already have an account?{" "}
              <span
                onClick={handleFlip}
                className="text-indigo-600 cursor-pointer hover:text-indigo-500 transition-colors"
              >
                Sign in
              </span>
            </p>
            {isToken ? (
              <form
                action={async (formdata) => {
                  console.log("hello");
                  if (session?.user.role === Role.STUDENT) {
                    const name = formdata.get("Name");
                    const hall = formdata.get("hall");
                    const rollNumber = formdata.get("rollNumber");
                    const password = formdata.get("password");
                    const confirmPassword = formdata.get("confirmPassword");
                    const YearOfGraduation = formdata.get("graduationDate");
                    const department = formdata.get("department");
                    const degree = formdata.get("degree");
                    const contactNum = formdata.get("contactNum");
                    if (
                      name === "" ||
                      hall === "" ||
                      rollNumber === "" ||
                      password === "" ||
                      confirmPassword === "" ||
                      YearOfGraduation === "" ||
                      department === ""
                    ) {
                      callNotification("success", "provide all the fields");
                    } else if (confirmPassword !== password) {
                      callNotification(
                        "success",
                        "your password is not matching",
                      );
                    } else {
                      const createStudent = await fetch("/api/user/student", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          password,
                          name,
                          email: session?.user.email,
                          hall,
                          rollNumber,
                          YearOfGraduation,
                          department,
                          degree,
                          contactNum,
                        }),
                      });
                      if (createStudent.status === 200) {
                        if (session && session.user) {
                          const updateit = await update({
                            hasRegistered: true,
                          });
                        }
                        router.push("/home");
                      }
                    }
                  } else if (session?.user.role === Role.ALUM) {
                    const name = formdata.get("Name");
                    const password = formdata.get("password");
                    const confirmPassword = formdata.get("confirmPassword");
                    const YearOfGraduation = formdata.get("graduationDate");
                    const department = formdata.get("department");
                    const degree = formdata.get("degree");
                    const contactNum = formdata.get("contactNum");

                    if (
                      name === "" ||
                      degree === "" ||
                      contactNum === "" ||
                      password === "" ||
                      confirmPassword === "" ||
                      YearOfGraduation === "" ||
                      department === ""
                    ) {
                      callNotification("success", "provide all the fields");
                    } else if (confirmPassword !== password) {
                      callNotification(
                        "success",
                        "your password is not matching",
                      );
                      return;
                    } else {
                      //api call
                      const createStudent = await fetch("/api/user/alumni", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          password,
                          name,
                          email: session?.user.email,
                          YearOfGraduation,
                          department,
                          degree,
                          contactNum,
                        }),
                      });
                      if (createStudent.status === 200) {
                        if (session && session.user) {
                          const updateit = await update({
                            hasRegistered: true,
                          });
                        }
                        router.push("/home");
                      } else {
                        callNotification("error", "server error occurred");
                      }
                    }
                  } else if (session?.user.role === Role.ADMIN) {
                    const password = formdata.get("password");
                    const name = formdata.get("Name");
                    console.log(name, password);
                    if (!name && !password) {
                      console.log(name, password);

                      callNotification("success", "provide every fields");
                      return;
                    }
                    const createAdmin = await fetch(
                      "http://localhost:3000/api/user/admin",
                      {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          password,
                          email: session?.user.email,
                          name,
                        }),
                      },
                    );
                    if (createAdmin.status === 200) {
                      const updateit = await update({
                        hasRegistered: true,
                        name: name,
                      });
                      console.log(updateit);
                      router.push("/home");
                    }
                  }
                }}
                className="space-y-6"
              >
                <div className="animate-fade-in-up animation-delay-300">
                  <label className="block text-gray-700 font-medium mb-1">
                    Name
                  </label>
                  <input
                    name="Name"
                    type="Name"
                    className="w-full px-4 py-3 rounded-xl text-gray-900 bg-gray-50 border-none focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-200"
                    placeholder="Enter your Name"
                  />
                </div>

                {session?.user.role != undefined &&
                session?.user.role === Role.STUDENT ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="animate-fade-in-up animation-delay-300">
                        <label className="block text-gray-700 font-medium mb-1">
                          Roll number
                        </label>
                        <input
                          name="rollNumber"
                          type="rollNumber"
                          className="w-full px-4 py-3 rounded-xl text-gray-900 bg-gray-50 border-none focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-200"
                          placeholder="Enter your email"
                        />
                      </div>

                      <div className="animate-fade-in-up animation-delay-300">
                        <label
                          htmlFor="degree"
                          className="block text-gray-700 font-medium mb-1"
                        >
                          Degree
                        </label>
                        <div className="mt-1">
                          <select
                            id="degree"
                            name="degree"
                            className="w-full px-4 py-3 rounded-xl text-gray-900 bg-gray-50 border-none focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-200"
                          >
                            <option>undergraduate</option>
                            <option>postgraduate</option>
                            <option>research graduate</option>
                          </select>
                        </div>
                      </div>

                      <div className="md:col-span-2 animate-fade-in-up animation-delay-300">
                        <label className="block text-gray-700 font-medium mb-1">
                          Graduation Date
                        </label>
                        <input
                          name="graduationDate"
                          type="date"
                          className="w-full px-4 py-3 rounded-xl text-gray-900 bg-gray-50 border-none focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-200"
                        />
                      </div>
                      <div className="md:col-span-2 animate-fade-in-up animation-delay-300">
                        <label className="block text-gray-700 font-medium mb-1">
                          contact number
                        </label>
                        <input
                          name="contactNum"
                          type="text"
                          className="w-full px-4 py-3 rounded-xl text-gray-900 bg-gray-50 border-none focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-200"
                        />
                      </div>
                      <div className="md:col-span-2 animate-fade-in-up animation-delay-300">
                        <label
                          htmlFor="hall"
                          className="block text-gray-700 font-medium mb-1"
                        >
                          Hall
                        </label>
                        <div className="mt-1">
                          <select
                            id="hall"
                            name="hall"
                            className="w-full px-4 py-3 rounded-xl text-gray-900 bg-gray-50 border-none focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-200"
                          >
                            <option>Meghnad Saha Hall of Residence</option>
                            <option>Rajendra Prasad Hall of Residence</option>
                            <option>Radha Krishnan Hall of Residence</option>
                            <option>Lala Lajpat Rai Hall of Residence</option>
                            <option>
                              Pandit Madan Mohan Malviya Hall of Residence
                            </option>
                            <option>
                              Lal Bahadur Shastri Hall of Residence
                            </option>
                            <option>Patel Hall of Residence</option>
                            <option>Nehru Hall of Residence</option>
                            <option>Azad Hall of Residence</option>
                            <option>Zakir Hussain Hall of Residence</option>
                            <option>
                              Dr. Bhimrao Ramji Ambedkar Hall of Residence
                            </option>
                            <option>
                              Homi Jahangir Bhabha Hall of Residence
                            </option>
                            <option>
                              Acharya Jagdish Chandra Bose Hall of Residence
                            </option>
                            <option>Vidyasagar Hall of Residence</option>
                            <option>Gokhale Hall of Residence</option>
                            <option>
                              Sir Asutosh Mukherjee Hall of Residence
                            </option>
                            <option>
                              Sarojini Naidu - Indira Gandhi Hall of Residence
                            </option>
                            <option>Rani Lakshmi Bai Hall of Residence</option>
                            <option>Sister Nivedita Hall of Residence</option>
                            <option>Mother Teresa Hall of Residence</option>
                            <option>
                              Atal Bihari Vajpayee Hall of Residence
                            </option>
                            <option>B C Roy Hall of Residence</option>
                            <option>Savitribai Phule Hall of Residence</option>
                            <option>
                              Vikram Sarabhai Residential Complex - I
                            </option>
                            <option>
                              Vikram Sarabhai Residential Complex - II
                            </option>
                          </select>
                        </div>
                      </div>

                      <div className="animate-fade-in-up animation-delay-300">
                        <label className="block text-gray-700 font-medium mb-1">
                          Password
                        </label>
                        <input
                          name="password"
                          type="password"
                          className="w-full px-4 py-3 rounded-xl text-gray-900 bg-gray-50 border-none focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-200"
                          placeholder="Enter password"
                        />
                      </div>

                      <div className="animate-fade-in-up animation-delay-300">
                        <label className="block text-gray-700 font-medium mb-1">
                          Confirm Password
                        </label>
                        <input
                          name="confirmPassword"
                          type="confirmPassword"
                          className="w-full px-4 py-3 rounded-xl text-gray-900 bg-gray-50 border-none focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-200"
                          placeholder="Re-Enter password"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <button
                          type="submit"
                          className="w-full mt-4 py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all duration-200 animate-fade-in-up animation-delay-600"
                        >
                          Create Account
                        </button>
                      </div>
                    </div>
                  </>
                ) : null}

                {/* code for alum registeration */}

                {session?.user.role === Role.ALUM && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="animate-fade-in-up animation-delay-300">
                      <label
                        htmlFor="degree"
                        className="block text-gray-700 font-medium mb-1"
                      >
                        Degree
                      </label>
                      <div className="mt-1">
                        <select
                          id="degree"
                          name="degree"
                          className="w-full px-4 py-3 rounded-xl text-gray-900 bg-gray-50 border-none focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-200"
                        >
                          <option>undergraduate</option>
                          <option>postgraduate</option>
                          <option>research graduate</option>
                        </select>
                      </div>
                    </div>
                    <div className=" animate-fade-in-up animation-delay-300">
                      <label className="block text-gray-700 font-medium mb-1">
                        Graduation Date
                      </label>
                      <input
                        name="graduationDate"
                        type="date"
                        className="w-full px-4 py-3 rounded-xl text-gray-900 bg-gray-50 border-none focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-200"
                      />
                    </div>
                    <div className="md:col-span-2 animate-fade-in-up animation-delay-300">
                      <label className="block text-gray-700 font-medium mb-1">
                        contact number
                      </label>
                      <input
                        name="contactNum"
                        type="text"
                        className="w-full px-4 py-3 rounded-xl text-gray-900 bg-gray-50 border-none focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-200"
                      />
                    </div>

                    <div className="md:col-span-2 animate-fade-in-up animation-delay-300">
                      <label
                        htmlFor="department"
                        className="block text-gray-700 font-medium mb-1"
                      >
                        Department
                      </label>
                      <div className="mt-1">
                        <select
                          id="department"
                          name="department"
                          className="w-full px-4 py-3 rounded-xl text-gray-900 bg-gray-50 border-none focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-200"
                        >
                          <option>Select Department</option>
                          <option>Computer Science</option>
                          <option>Electrical Engineering</option>
                          <option>Mechanical Engineering</option>
                          <option>Civil Engineering</option>
                          <option>Chemical Engineering</option>
                          <option>Physics</option>
                          <option>Mathematics</option>
                        </select>
                      </div>
                    </div>

                    <div className="animate-fade-in-up animation-delay-300">
                      <label className="block text-gray-700 font-medium mb-1">
                        Password
                      </label>
                      <input
                        name="password"
                        type="password"
                        className="w-full px-4 py-3 rounded-xl text-gray-900 bg-gray-50 border-none focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-200"
                        placeholder="Enter password"
                      />
                    </div>

                    <div className="animate-fade-in-up animation-delay-300">
                      <label className="block text-gray-700 font-medium mb-1">
                        Confirm Password
                      </label>
                      <input
                        name="confirmPassword"
                        type="confirmPassword"
                        className="w-full px-4 py-3 rounded-xl text-gray-900 bg-gray-50 border-none focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-200"
                        placeholder="Re-Enter password"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <button
                        type="submit"
                        className="w-full mt-4 py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all duration-200 animate-fade-in-up animation-delay-600"
                      >
                        Create Account
                      </button>
                    </div>
                  </div>
                )}

                {/* code for the admin registreration */}

                {session?.user.role != undefined &&
                session?.user.role === Role.ADMIN ? (
                  <div>
                    <div className="animate-fade-in-up animation-delay-300">
                      <label className="block text-gray-700 font-medium mb-1">
                        Password
                      </label>

                      <input
                        name="password"
                        type="password"
                        className="w-full px-4 py-3 rounded-xl text-gray-900 bg-gray-50 border-none focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-200"
                        placeholder="Enter your password"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full mt-4 py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all duration-200 animate-fade-in-up animation-delay-600"
                    >
                      Create Account
                    </button>
                  </div>
                ) : null}
              </form>
            ) : (
              <form
                action={async (formdata) => {
                  try {
                    const email = formdata.get("email") as string;
                    if (!email) {
                      callNotification("error", "provide us required field");
                      return;
                    }

                    console.log("hello");
                    if (loginFor == "student") {
                      if (email.includes("@")) {
                        setNotification((prev) => [
                          ...prev,
                          {
                            type: "error",
                            message: "email is not in proper format",
                            duration: 1000,
                          },
                        ]);
                        setTimeout(() => {
                          const filteredOne = notification.filter(
                            (notify) => notify.message !== "",
                          );
                          setNotification((prev) => [...prev, ...filteredOne]);
                        }, 1000);
                      }
                      const response = await signIn("nodemailer-student", {
                        email: email + "@kgpian.iitkgp.ac.in",
                        redirect: false,
                      });

                      if (response?.status !== 200) {
                        callNotification(
                          "error",
                          "sorry server error occured while sending the mail",
                        );
                        return;
                      }
                    } else if (loginFor == "alumni") {
                      const response = await signIn("nodemailer-alum", {
                        email: email,
                        redirect: false,
                      });

                      if (!response) {
                        callNotification(
                          "error",
                          "sorry we didn't get any response now",
                        );
                        return;
                      }
                      if (response?.status !== 200) {
                        callNotification(
                          "error",
                          "sorry server error occured while sending the mail",
                        );
                        return;
                      }
                    } else {
                      const response = await signIn("nodemailer-admin", {
                        email: email,
                        redirect: false,
                      });
                      if (response?.status !== 200) {
                        callNotification(
                          "error",
                          "sorry server error occured while sending the mail",
                        );
                        return;
                      }
                    }

                    callNotification("success", "email sent to get verified");
                  } catch (e: any) {
                    callNotification(
                      "error",
                      "sorry error occurred while sending mail",
                    );
                  }
                }}
                className="space-y-6"
              >
                <RowRadioButtonsGroup
                  student={student}
                  alumni={alumni}
                  admin={admin}
                ></RowRadioButtonsGroup>
                {loginFor === "student" ? (
                  <div className="animate-fade-in-up animation-delay-300 ">
                    <label className="block text-gray-700 font-medium mb-1">
                      Email
                    </label>
                    <div className="w-full flex items-center justify-center">
                      <input
                        name="email"
                        type="text"
                        className="w-full px-4 py-3 rounded-l-xl text-gray-900 bg-gray-50 border-none focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-200"
                        placeholder="Enter your email"
                        required={true}
                      />
                      <input
                        name="email"
                        type="email"
                        className="w-full px-4 py-3 ml-1 rounded-r-xl text-gray-900 bg-gray-50 border-none focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-200"
                        placeholder="@kgpian.iitkgp.ac.in"
                        disabled={true}
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full mt-4 py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all duration-200 animate-fade-in-up animation-delay-600"
                    >
                      Create Account
                    </button>
                  </div>
                ) : (
                  <div className="animate-fade-in-up animation-delay-300 ">
                    <label className="block text-gray-700 font-medium mb-1">
                      Email
                    </label>
                    <div className="w-full flex items-center justify-center">
                      <input
                        name="email"
                        type="text"
                        className="w-full px-4 py-3 rounded-l-xl text-gray-900 bg-gray-50 border-none focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-200"
                        placeholder="Enter your email"
                        required={true}
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full mt-4 py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all duration-200 animate-fade-in-up animation-delay-600"
                    >
                      Create Account
                    </button>
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      </div>

      {notification.map((notify, index) => {
        return (
          <NotificationContainer
            key={index}
            typepro={notify.type}
            messagepro={notify.message}
            durationpro={notify.duration}
          ></NotificationContainer>
        );
      })}
    </div>
  );
}
