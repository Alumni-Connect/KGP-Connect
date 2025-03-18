import React from "react";

const DistinguishedServiceAwards = () => {
  const awardees2021 = [
    {
      name: "Amitabh Agarwal",
      year: "1967",
      degree: "B Tech/EE/NH",
      description: "Director, Mohan Energy Corporation Pvt. Ltd.",
      image: "/DSAwardee2021/1.jpg",
    },
    {
      name: "Srikanth C",
      year: "2009",
      degree: "BLIPR/IP/JCB",
      description: "Advocate and IPR Consultant",
      image: "/DSAwardee2021/2.jpg",
    },
    {
      name: "Sunil Kapoor",
      year: "1986",
      degree: "BTech/MF/PH",
      description:
        "Director, IFA Steels Pvt. Ltd., Founder & Proprietor, Kapoor Wire Industries Partner, S. R. Kapoor & Sons",
      image: "/DSAwardee2021/3.png",
    },
  ];
  const awardees2019 = [
    {
      name: "Shyamal Kanti GhoshDastidar",
      year: "1960",
      degree: "B Tech/ME/RP",
      description: "Financial Advisor/Franchisee, Ameriprise",
      image: "/DSAwardee2019/1.jpg",
    },
    {
      name: "Kirthan Bihari Behera",
      year: "1965",
      degree: "B Tech/ME/NH",
      description: "President, Behera & Associates",
      image: "/DSAwardee2019/2.jpg",
    },
    {
      name: "Vijay Kumar Kiyawat",
      year: "1967",
      degree: "B Tech/ME/NH",
      description: "Special Advisor, Duraline India Pvt. Ltd.",
      image: "/DSAwardee2019/3.jpg",
    },
    {
      name: "Binod Kumar Das",
      year: "1980",
      degree: "B Tech/ME/DAS",
      description: "Freelancer",
      image: "/DSAwardee2019/4.png",
    },
    {
      name: "Partha Pratim Mitra",
      year: "1982",
      degree: "B Tech/ME/SG/RK",
      description:
        "Independent Upstream Consultant, Educator & Start-up Mentor",
      image: "/DSAwardee2019/5.jpg",
    },
    {
      name: "Kabindra Daga",
      year: "1985",
      degree: "B Tech/EC/LLR",
      description: "Director, HCS Infotech Pvt. Ltd.",
      image: "/DSAwardee2019/6.jpg",
    },
    {
      "name": "Nirmal Kumar Agarwala",
      "year": "1985",
      "degree": "B Tech/CS/LLR",
      "description": "Director, HCS Infotech Pvt Ltd",
      "image": "/DSAwardee2019/7.jpg"
    },
    {
      "name": "Ramit Ghosh",
      "year": "1985",
      "degree": "B Tech/EE",
      "description": "President, Solteq Solutions LLC",
      "image": "/DSAwardee2019/8.jpg"
    },
    {
      "name": "Sayanta Basu",
      "year": "1988",
      "degree": "B Tech/EC/RK",
      "description": "Founder & CEO, Agrud Technologies",
      "image": "/DSAwardee2019/9.jpg"
    },
  ];
  const awardees2020 = [
    {
      name: "Pankaj Kumar Singh",
      year: "1985",
      degree: "B Tech/CE/PH",
      description: "General Manager & Strategic Business Unit (SBU) Head",
      image: "/DSAwardee2020/1.jpg",
    },
    {
      name: "Shiladitya Basu",
      year: "1999",
      degree: "B Tech/AE/NH",
      description: "Technical Professional Leader - Marine, KBR Consulting",
      image: "/DSAwardee2020/2.jpg",
    },
    {
      name: "Vipin Popat",
      year: "1976",
      degree: "B Tech/ME/RK",
      description: "CEO, Dolphin Incorporated",
      image: "/DSAwardee2020/3.jpg",
    },
  ];
  const awardees2018 = [
    {
      name: "Arun Prakash Das",
      year: "1967",
      degree: "Bsc/NH/GG/Msc/GG",
      description: "Mining & Metals Professional",
      image: "/DSAwardee2018/1.jpg",
    },
    {
      name: "K Pran",
      year: "1989",
      degree: "B Tech/EE/NH",
      description: "President & CEO, Vitalect Inc., California",
      image: "/DSAwardee2018/2.jpg",
    },
    {
      name: "V Ganesh",
      year: "1991",
      degree: "B Tech/NA/LLR",
      description: "Senior Deputy General Manager, Larsen and Toubro",
      image: "/DSAwardee2018/3.jpg",
    },
    {
      name: "Joy Bhattacharya",
      year: "1992",
      degree: "B Tech/CE/NH",
      description: "Senior Associate, Stantec",
      image: "/DSAwardee2018/4.jpg",
    },
    {
      name: "Meenakshi Kaul",
      year: "1984",
      degree: "BSc/PH/SNIG",
      description: "Chief Product Officer, STEM-Away",
      image: "/DSAwardee2018/5.jpg",
    },
    {
      name: "Ratun Lahiri",
      year: "1991",
      degree: "BTech/ME/SNIG",
      description:
        "Head of Global Development Programmes, London Stock Exchange Group",
      image: "/DSAwardee2018/6.jpg",
    },
    {
      name: "Subramaniam Sabesh",
      year: "1983",
      degree: "B Tech/CH/AZ",
      description: "Director Global(I) Environment Solutions Pvt. Ltd.",
      image: "/DSAwardee2018/7.jpg",
    },
    {
      name: "Parthasarathi Chatterjee",
      year: "1987",
      degree: "B Tech/CS/RK",
      description: "Program Director, Shell, Global LNG Trading",
      image: "/DSAwardee2018/8.jpg",
    },
    {
      name: "K Rajah Venkataraman",
      year: "1977",
      degree: "B Tech/ME/RP",
      description: "Associate Director, FCL (MEA)",
      image: "/DSAwardee2018/9.jpg",
    },
    {
      name: "Probir Kumar Gupta",
      year: "1971",
      degree: "B Tech/ME/PH",
      description: "Consultant, Corporate and Academic Matters",
      image: "/DSAwardee2018/10.jpg",
    },
  ];

  return (
    <div>
      <div>
        <h2 className="text-2xl font-bold border-b pb-2 mb-4">
          Distinguished Service Awards
        </h2>

        <div className="mb-6">
          <h3 className="font-semibold">Announcements Details:</h3>
          <p>
            Indian Institute of Technology Kharagpur wishes to recognize its
            alumni for providing outstanding service to the Institute. The
            Institute is interested in receiving fresh nominations in respect of
            individual alumnus/alumna for consideration for the award in 2021.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold">Eligibility Criteria for Nominees:</h3>
          <p>
            Any alumnus/alumna may be nominated. However, an alumnus/alumna, who
            is an employee of IIT Kharagpur, shall not be eligible for the award
            during his/her service period.
          </p>
          <p className="mt-2">
            The following aspects will be considered among possible others while
            assessing the roles and contributions of the Nominee:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>
              Number of years of service to the Alumni Chapters/Foundations and
              tangible achievements made.
            </li>
            <li>
              Number of Alumni-related events organized by the nominee, capacity
              in which organized, the number of participants in each, tangible
              outcome in the form of donations collected, etc.
            </li>
            <li>
              Endowments created for Chair-Professorships, Scholarship, Centres,
              Schools, Academy, Lab and other needs of the Institute.
            </li>
            <li>Teaching courses at IIT Kharagpur as Adjunct Faculty.</li>
            <li>
              Joint research collaboration with the faculty of the Institute.
            </li>
            <li>
              Mentoring of students/faculty in innovation and entrepreneurial
              ventures.
            </li>
            <li>
              Financial support to the Institute through CSR Fund from the
              Industry.
            </li>
            <li>
              Initiative for Industry-Academic collaboration in research &
              product development.
            </li>
            <li>
              Collaboration with IIT Kharagpur in lab to market initiative,
              product licensing.
            </li>
            <li>
              Participating in designing new courses and courses in the
              interdisciplinary areas.
            </li>
            <li>
              No. of International collaboration established like Joint Ph D,
              Student exchange Program, Joint Research etc.
            </li>
            <li>Financial support to the Institute incubated Startups.</li>
            <li>Recognitions received within the Alumni fraternity.</li>
          </ul>
        </div>
        <div className="mb-6">
          <h2 className="font-semibold">Criteria for proposer/seconder:</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Past Distinguished Service Awardees</li>
            <li>Past Distinguished Alumnus Awardees</li>
            <li>Present and Former Senate Members</li>
            <li>
              Office Bearers (President, Vice President, Secretary, Treasurer)
              and former Office Bearers (former President, former Vice
              President, former Secretary, former Treasurer) of the Alumni
              Foundations and Alumni Chapters across the globe.
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
            <strong>29th October, Friday</strong>. The signed hard copy needs to
            be sent to the following address by 12th November 2021.
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
            with the subject line <strong>'DSA 2021 Nomination'</strong>.It may
            not be possible to consider nominations received after this date for
            the current year. However, those will be carried forward for
            consideration in the future.
          </p>
        </div>

        <h2 className="font-bold mt-6 mb-1">Process for Selection</h2>
        <p>
          Process for Selection : Nominations shall be shortlisted by a
          Screening Committee (SC) chaired by the Dean (OR).The Standing
          Committee chaired by the Director shall consider all eligible
          nominations as recommendations from the Screening Committee and make
          final recommendations to the Board of Governors for approval.
        </p>
        <button className="mt-6 bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition">
          Download Nomination Form
        </button>

        <h2 className="text-2xl font-bold border-b pb-2 mb-6 mt-4">
          DS AWARDEE 2021
        </h2>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6 border-b pb-4">
          {awardees2021.map((awardee, index) => (
            <div key={index} className="text-center">
              <img
                src={awardee.image}
                alt={awardee.name}
                className="w-40 h-40 mx-auto rounded-lg object-cover"
              />
              <h3 className="text-lg font-semibold mt-2">{awardee.name}</h3>
              <p className="text-sm text-gray-500">
                {awardee.year}/{awardee.degree}
              </p>
              <p className="text-sm mt-1">{awardee.description}</p>
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-bold border-b pb-2 mb-6 mt-4">
          DS AWARDEE 2020
        </h2>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6 border-b pb-4">
          {awardees2020.map((awardee, index) => (
            <div key={index} className="text-center">
              <img
                src={awardee.image}
                alt={awardee.name}
                className="w-40 h-40 mx-auto rounded-lg object-cover"
              />
              <h3 className="text-lg font-semibold mt-2">{awardee.name}</h3>
              <p className="text-sm text-gray-500">
                {awardee.year}/{awardee.degree}
              </p>
              <p className="text-sm mt-1">{awardee.description}</p>
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-bold border-b pb-2 mb-6 mt-4">
          DS AWARDEE 2019
        </h2>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6 border-b pb-4">
          {awardees2019.map((awardee, index) => (
            <div key={index} className="text-center">
              <img
                src={awardee.image}
                alt={awardee.name}
                className="w-40 h-40 mx-auto rounded-lg object-cover"
              />
              <h3 className="text-lg font-semibold mt-2">{awardee.name}</h3>
              <p className="text-sm text-gray-500">
                {awardee.year}/{awardee.degree}
              </p>
              <p className="text-sm mt-1">{awardee.description}</p>
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-bold border-b pb-2 mb-6 mt-4">
          DS AWARDEE 2018
        </h2>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6 border-b pb-4">
          {awardees2018.map((awardee, index) => (
            <div key={index} className="text-center">
              <img
                src={awardee.image}
                alt={awardee.name}
                className="w-40 h-40 mx-auto rounded-lg object-cover"
              />
              <h3 className="text-lg font-semibold mt-2">{awardee.name}</h3>
              <p className="text-sm text-gray-500">
                {awardee.year}/{awardee.degree}
              </p>
              <p className="text-sm mt-1">{awardee.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DistinguishedServiceAwards;
