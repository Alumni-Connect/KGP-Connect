"use client";
import AlumniCell from "@/components/AlumniCell";
import ChaptersTable from "@/components/ChapterTable";
import Footer from "@/components/Footer";
import LandingNavbar from "@/components/LandingNavbar";
import React, { useState } from "react";

const Services = () => {
  const [activeTab, setActiveTab] = useState("Distinguished Alumni Awards");
  const awardees = [
    {
      name: "SURESH CHANDRA MISHRA",
      year: "1970",
      degree: "B Tech/NA/PH",
      description:
        "Former Chairman, Naval Research Board at DRDO & Visiting faculty at IMU, Visakhapatnam Campus",
      image: "/Picture1.jpg",
    },
    {
      name: "VEERENDRA KUMAR JAITLY",
      year: "1979, 1985",
      degree: "B Tech/EC/RK, M Tech/EC/GH",
      description: "Chairman C_Cube Consultants",
      image: "/Picture2.jpg",
    },
    {
      name: "MOHAN RAO",
      year: "1969",
      degree: "B Tech/AG/NH",
      description:
        "Research & Development, Food Process Engineering and Chief Science Officer, Rainos Consulting USA & Retd. Sr. Director PepsiCo Global R&D",
      image: "/Picture3.jpg",
    },
    {
      name: "KRISHAN MOHAN KHANNA",
      year: "1961",
      degree: "B Tech/ME/AZ",
      description: "Chairman & Founder, i watch think tank & foundation",
      image: "/Picture4.jpg",
    },
    {
      name: "MUKUND PADMANABHAN",
      year: "1987",
      degree: "B Tech/EC/NH",
      description:
        "Researcher at Renaissance Technologies and President and Founder, Guru Krupa Foundation",
      image: "/Picture5.jpg",
    },
  ];

  const tabs = [
    "Distinguished Alumni Awards",
    "Distinguished Service Awards",
    "Young Alumni Achiever Awards",
    "Life Fellows",
    "Guest House Booking",
  ];

  return (
    <div>
      <LandingNavbar />
      <div className="flex min-h-screen bg-gray-100 mt-4">
        {/* Sidebar */}
        <aside className="w-1/4 bg-white shadow-md p-6">
          <ul className="space-y-2">
            {tabs.map((tab) => (
              <li
                key={tab}
                className={`pl-3 py-2 font-semibold cursor-pointer transition-all duration-200 
            ${activeTab === tab ? "border-l-4 border-red-500 text-gray-900" : "text-gray-700 hover:text-gray-900"}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-white shadow-md p-10">
          {activeTab === "Distinguished Alumni Awards" && (
            <div className="">
              <h2 className="text-2xl font-bold border-b pb-2 mb-4">
                Distinguished Alumni Awards
              </h2>

              <div className="mb-6">
                <h3 className="font-semibold">Announcements Details:</h3>
                <p>
                  Indian Institute of Technology Kharagpur recognizes the
                  professional achievements and contributions of its alumni
                  through the Distinguished Alumnus Award (DAA) each year on the
                  Institute Convocation Day.
                </p>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold">Eligibility:</h3>
                <p>
                  Any person who has received a degree from the Institute is
                  eligible to be considered for the Distinguished Alumnus Award,
                  except in the following cases:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>
                    <strong>A.</strong> An alumnus/alumna, who is an employee of
                    IIT Kharagpur, shall not be eligible for the award during
                    his/her service period except when he/she has accomplished
                    truly outstanding achievement of highest order recognized
                    widely.
                  </li>
                  <li>
                    <strong>B.</strong> Alumni who have been awarded D.Sc
                    (Honoris Causa) and/or Life Fellow Award of the Institute
                    will also be considered as Distinguished Alumnus Awardees of
                    the Institute.
                  </li>
                  <li>
                    <strong>C.</strong> An alumnus/alumna who has already
                    received Distinguished Service Award or Young Alumni
                    Achiever Award may only be considered for the Distinguished
                    Alumnus Award after a period of 5 years from the date of
                    receipt of the former.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold">Criteria for nominees:</h3>
                <p>
                  An individual, to be nominated for this Distinguished Alumnus
                  Award, should have made a significant professional
                  contribution that is widely recognized. The following criteria
                  shall be considered while assessing the nominations:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Positions held</li>
                  <li>Contributions to his/her profession</li>
                  <li>Awards and Honours Received</li>
                  <li>Association with the Institute</li>
                  <li>
                    Contribution to the growth and development of the country
                  </li>
                  <li>Other contributions</li>
                </ul>
              </div>
              <h2 className="text-2xl font-bold border-b pb-2 mb-6 mt-4">
                DA AWARDEE 2021
              </h2>
              <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
                {awardees.map((awardee, index) => (
                  <div key={index} className="text-center">
                    <img
                      src={awardee.image}
                      alt={awardee.name}
                      className="w-40 h-40 mx-auto rounded-lg object-cover"
                    />
                    <h3 className="text-lg font-semibold mt-2">
                      {awardee.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {awardee.year}/{awardee.degree}
                    </p>
                    <p className="text-sm mt-1">{awardee.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Services;
