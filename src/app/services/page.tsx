"use client";
import DistinguishedServiceAwards from "@/components/DistinguishedServiceAwards";
import Footer from "@/components/Footer";
import GuestHouseBooking from "@/components/GuestHouseBooking";
import LandingNavbar from "@/components/LandingNavbar";
import LifeFellows from "@/components/LifeFellows";
import YoungAlumniAcheiverAward from "@/components/YoungAlumniAcheiverAward";
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
    <div className="min-h-screen bg-gray-100">
      <LandingNavbar />
      <div className="flex flex-col md:flex-row my-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Sidebar - Desktop */}
        <aside className="w-full md:w-1/4 p-6 hidden md:block">
          <ul className="space-y-2">
            {tabs.map((tab) => (
              <li
                key={tab}
                className={`pl-3 py-3 font-semibold cursor-pointer transition-all duration-200 rounded-lg ${
                  activeTab === tab
                    ? "border-l-4 border-orange-500 bg-gray-200 text-gray-900"
                    : "text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </li>
            ))}
          </ul>
        </aside>

        {/* Sidebar - Mobile (Horizontal Scrollable Tabs) */}
        <aside className="w-full bg-white shadow-md p-4 block md:hidden">
          <div className="flex overflow-x-auto space-x-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`flex-shrink-0 px-4 py-2 text-sm font-semibold transition-all duration-200 rounded-lg ${
                  activeTab === tab
                    ? "bg-indigo-500 text-white"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
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

              <div className="mb-6">
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
              <div className="mb-6">
                <h2 className="font-semibold">
                  Criteria for proposer/seconder:
                </h2>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Past Distinguished Service Awardees</li>
                  <li>Past Young Achiever Awardees</li>
                  <li>Present and former Senate Members</li>
                  <li>
                    Officer Bearers (President, Vice-President, Secretary,
                    Treasurer) and former Office Bearers
                  </li>
                  <li>Life Fellows</li>
                </ul>
                <p className="font-semibold text-red-600 mt-4">
                  Self-nomination will not be entertained.
                </p>
              </div>

              <div className="mb-6">
                <h2 className=" font-bold ">How to nominate:</h2>
                <p>
                  Nominations must be submitted through email latest by{" "}
                  <strong>07th June 2021</strong>. The signed hard copy should
                  be sent to:
                </p>

                <div className=" mt-1 ">
                  <p>Dean, Outreach</p>
                  <p>Office of Alumni Affairs</p>
                  <p>Indian Institute of Technology Kharagpur</p>
                  <p>Kharagpur, India - 721302</p>
                </div>

                <p className="mt-4">
                  Electronic copies should also be emailed to
                  <a
                    href="mailto:deanor@adm.iitkgp.ernet.in"
                    className="text-blue-600 hover:underline"
                  >
                    {" "}
                    deanor@adm.iitkgp.ernet.in
                  </a>
                  with the subject line <strong>'DAA 2021 Nomination'</strong>
                  .It may not be possible to consider nominations received after
                  this date for the current year. However, those will be carried
                  forward for consideration in the future.
                </p>

                <button className="mt-6 bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition">
                  Download Nomination Form
                </button>
              </div>

              <h2 className="font-bold mt-6 mb-1">Process for Selection</h2>
              <p>
                Nominations shall be shortlisted by a{" "}
                <strong>Screening Committee (SC)</strong> chaired by the Dean
                (OR) with the approval of the Director. The SC will form a panel
                of reviewers, preferably past Distinguished Alumnus Awardees.
                Shortlisted nominations shall undergo peer review, and based on
                recommendations, the SC will make a final recommendation.The
                Standing Committee will normally comprise Director as the
                Chairman, Deputy Director, Dean (OR), Associate Dean (Alumni
                Affairs & Branding) as members and 2 (two) External Experts. The
                Committee will follow the guidelines of DAA selection
                considering all eligible nominations and their recommendations
                of the peer reviewers as well as the recommendation of the
                Screening Committee and make final recommendations to the Senate
                and the Board of Governors for approval.
              </p>

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

          {activeTab === "Distinguished Service Awards" && (
            <DistinguishedServiceAwards />
          )}
          {activeTab === "Young Alumni Achiever Awards" && (
            <YoungAlumniAcheiverAward />
          )}
          {activeTab === "Life Fellows" && <LifeFellows />}
          {activeTab === "Guest House Booking" && <GuestHouseBooking />}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Services;
