"use client";
import AlumniCell from "@/components/AlumniCell";
import ChaptersTable from "@/components/ChapterTable";
import Footer from "@/components/Footer";
import ForeignTable from "@/components/ForeignTable";
import LandingNavbar from "@/components/LandingNavbar";
import React, { useState } from "react";

const InstitutionalDevelopmentPage = () => {
  const [activeTab, setActiveTab] = useState(
    "The Institutional Development Program",
  );

  const tabs = [
    "The Institutional Development Program",
    "Domestic Chapters",
    "Global Chapters",
    "Students' Alumni Cell",
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <LandingNavbar />

      {/* Main Layout */}
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
        <main className="flex-1 bg-white shadow-md p-6 sm:p-8 lg:p-10 max-w-full md:max-w-[800px] lg:max-w-[1000px] mx-auto md:ml-4 mt-4 md:mt-0">
          {activeTab === "The Institutional Development Program" && (
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6">
                The Institutional Development Program
              </h1>
              <p className="mb-6 text-gray-700 text-sm sm:text-base">
                <strong>Mission:</strong> To support the institute’s offer to strengthen domestic ranking as well as enhancing KGP’s international stature.
              </p>
              <section className="mb-8">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">Vision:</h2>
                <ul className="list-disc pl-6 text-gray-700 text-sm sm:text-base space-y-2">
                  <li>Provide support for all-round growth plans of the Institute</li>
                  <li>Implement a sustainable and scalable resource development program</li>
                  <li>Leverage the alumni and corporate relations for the growth of the Institute</li>
                  <li>Promote the KGP Brand</li>
                </ul>
              </section>
              <section className="mb-8">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">Need For ID Program:</h2>
                <ul className="list-disc pl-6 text-gray-700 text-sm sm:text-base space-y-2">
                  <li>Many IITs</li>
                  <li>Foreign university entry</li>
                  <li>Scale and sustainability</li>
                  <li>Need for an organized, timely, result-oriented, effective program structure</li>
                </ul>
              </section>
              <section className="mb-8">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">Components of ID Program:</h2>
                <ul className="list-disc pl-6 text-gray-700 text-sm sm:text-base space-y-2">
                  <li>Alum connectivity</li>
                  <li>KGP Brand Building</li>
                  <li>Sustainable Fundraising</li>
                </ul>
              </section>
              <h2 className="text-xl sm:text-2xl font-semibold mt-10 mb-6">Advisory Board Members</h2>
              <div className="flex flex-col gap-6">
                {[
                  {
                    name: "Mr. R. Gopalkrishnan (ECE/1967/VS) - Alumni (India)",
                    image: "/advisory_board_members/Gopalakrishna.png",
                    description:
                      "Mr. Gopalkrishnan is currently the CEO of The Mindworks. He has served as Chairman of Unilever Arabia, MD of Brooke Bond Lipton, and Vice Chairman of Hindustan Lever. He has been deeply engaged in the growth of the TATA Group and served in multiple leadership roles. He is also the author of six books.",
                  },
                  {
                    name: "Mr. Arjun Malhotra (EC/1970/RP) - Alumni (US)",
                    image: "/advisory_board_members/ArjunMalhotra1.png",
                    description:
                      "Mr. Malhotra serves as Chairman of Magic Software. He has served as Chairman of Headstrong Co. A pioneer of the Indian IT industry, Mr. Malhotra has a long string of entrepreneurial successes. He co-founded the HCL group, taking it from a six-person operation to one of India's largest Information Technology corporations. He is a member of the Board of Governors of IIT - Foundation (KGP), member of Board of Governors of Indian School of Business (ISB), Hyderabad, and member of Indian Public Schools Society which runs the Doons School. He founded Prof. G.S. Sanyal School of Telecommunications at KGP through a personal endowment. Mr. Malhotra was declared Life Fellow of IIT Kharagpur in 2003. He is currently a member of the Executive Council of NASSCOM which is India's representative organization for the IT&ITES industry.",
                  },
                  {
                    name: "Mr. Matt Ter Molen - Non-Alumni (US)",
                    image: "/advisory_board_members/Matt.png",
                    description:
                      "Mr. Molen is Senior Vice President and Chief Advancement Officer of Syracuse University. He has served as Associate Dean for Development and Corporate Relations of Kellogg School of Management and Associate Vice President for Alumni Relations and Development for Northwestern University. Matt has extensive experience in development at Northwestern, having been with the University since 1998, working closely with senior leadership in the University including President, Deans, and Trustees. From 1998 through 2003, Matt was the Assistant Dean for Development at the Weinberg College of Arts and Sciences of NWU, managing all aspects of development at the College. Prior to Northwestern, Matt worked in development roles at the University of Chicago. From 1987-1989, Matt was with the United States Peace Corps.",
                  },
                  {
                    name: "Dr. Prabhakant Sinha (1970/B Tech/ME/PH) - Alumni (US)",
                    image: "/advisory_board_members/PrabhaKanth.png",
                    description:
                      "Dr. Sinha is co-chairman and co-founder of ZS Associates, a leading sales and marketing consultancy in the world. He is also director of Greenlight Planet, Inc., a company dedicated to bringing affordable solar lighting to the powerless around the world. He also teaches in Executive Education programs at the Kellog School of Management, Indian School of Business as well as publishing a number of books and over 25 other publications. In addition to receiving a number of awards from American Marketing Association and INFORMS Society, he has been honored as an inductee of the Chicago Entrepreneurship Hall of Fame in 2005. Dr. Sinha established P.K. Sinha Center for Bio-energy, India's first such energy research center at IIT KGP, to undertake research, teaching and technological implementation of conventional and non-conventional energy.",
                  },
                  {
                    name: "Mr. B.K. Syngal (1961/B Tech/EC/RP) & (1962/M Tech/EC) - Alumni (India)",
                    image: "/advisory_board_members/Amitpatra.png",
                    description:
                      "Mr. Syngal was the Chairman and Managing Director (1991-98) of Videsh Sanchar Nigam Ltd. (VSNL Ltd). Mr. Syngal is regarded as the father of Internet and data services in India, which propelled the growth of software exports from India. In the international telecom arena, he has held the positions of Chairman, Commonwealth Telecommunications Organization (CTO), London, a Councillor for India INMARSAT Council, London, Vice Chairman and Director, ICO Boards, Chairman of Governance Committee ICO, Cayman Islands and Governor, INTELSAT Board, Washington DC. Mr. Syngal also assumed charge as the Chairman of Reliance Telecom. He has been recipient of many industry awards including Telecom Man of the Decade award by Wisitex Foundation, India, Partners in Progress award by Maharashtra State Government for his contributions in telecommunications both in India and abroad.",
                  },
                  {
                    name: "Expert Advisor: Prof. Amit Patra (1984/B Tech/EE/RK), (1986/M Tech/EE) & (1990/Ph D/EE)",
                    image: "/advisory_board_members/BY.png",
                    description:
                      "Dr. Amit Patra is Professor in the Dept. of Electrical Engineering and Former Dean (Alumni Affairs & International Relations) at IIT Kharagpur. He is the Deputy Director of IIT Kharagpur. He has more than 25 years of experience in academics and research. He has carried out extensive research collaborations with various industries and organizations in India and abroad. He has taken a leadership role in setting up the Institutional Development framework at IIT Kharagpur.",
                  },
                ].map((member, index) => (
                  <div key={index} className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 border-b pb-6 last:border-b-0">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="rounded-lg w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 object-cover shadow-md"
                     
                    />
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-800">{member.name}</h3>
                      <p className="text-gray-600 text-sm sm:text-base mt-2">{member.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === "Domestic Chapters" && <ChaptersTable />}
          {activeTab === "Global Chapters" && <ForeignTable/>}
          {activeTab === "Students' Alumni Cell" && <AlumniCell />}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default InstitutionalDevelopmentPage;