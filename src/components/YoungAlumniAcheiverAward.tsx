import React from "react";

const YoungAlumniAcheiverAward = () => {
  const awardees = [
    {
      name: "Arka Majumdar",
      year: "2007",
      degree: "B Tech/EC/PH",
      description: "Associate Professor at University of Washington",
      image: "/YAA2022/1.jpg",
    },
    {
      name: "Rakesh Kumar",
      year: "2001",
      degree: "B Tech/CS/PH",
      description: "Professor, University of Illinois",
      image: "/YAA2022/2.png",
    },
    {
      name: "Jayasree Chakraborty",
      year: "2013",
      degree: "Ph D/EC/RLB",
      description:
        "Assistant Attending, Dept. of Surgery, Memorial Sloan Kettering Cancer Center",
      image: "/YAA2022/3.jpg",
    },
    {
      name: "Ashish Modi",
      year: "2011",
      degree: "B Tech/EC/PH",
      description: "District Collector & District Magistrate, Bhilwara (IAS)",
      image: "/YAA2022/4.jpg",
    },
    {
      name: "Abhinav Kumar",
      year: "2008",
      degree: "B Tech/CH/LLR",
      description:
        "Divisional Forest Officer, Hapoli Forest Division, Govt. of Arunachal Pradesh (IFS)",
      image: "/YAA2022/5.png",
    },
    {
      name: "Swapnil Tembe",
      year: "2009",
      degree: "B Tech/ME/RP",
      description:
        "Deputy Commissioner, West Garo Hills District, Meghalaya (IAS)",
      image: "/YAA2022/6.png",
    },
    {
      name: "Saroj Kumar Thakur",
      year: "2006",
      degree: "D/EC/AZ",
      description: "District Superintendent of Police, Krishnagiri, Tamil Nadu",
      image: "/YAA2022/7.png",
    },
    {
      name: "Shashwat Singh",
      year: "2007",
      degree: "MBA/BM/MMM",
      description: "Chief Information Officer - boaF Lifestyle",
      image: "/YAA2022/8.png",
    },
    {
      name: "H R Sampreet",
      year: "2009",
      degree: "MBA/BM/MM",
      description: "Business Franchise Head - Cell & Gene Therapies",
      image: "/YAA2022/9.png",
    },
    {
      name: "Arnav",
      year: "2010",
      degree: "M Sc/MA/RP",
      description:
        "Founder & Director at Outleap Technologies Pvt. Ltd. (Leap Finance)",
      image: "/YAA2022/10.jpg",
    },
    {
      name: "Debayn Saha",
      year: "2012",
      degree: "DD/ME/NH",
      description: "Cofounder & Director, PerSapien Innovations Pvt. Ltd.",
      image: "/YAA2022/11.png",
    },
    {
      name: "Madhav Datt",
      year: "2019",
      degree: "D/CS/AZ",
      description:
        "Product Manager at Google and Co-founder & Board Chair at Nostos Homes",
      image: "/YAA2022/12.jpg",
    },
    {
      name: "Prateek Chakravarty",
      year: "2002",
      degree: "B Tech/ME/RP",
      description:
        "Chief Executive Officer & Board Director at Ziner, San Francisco Bay Area",
      image: "/YAA2022/13.jpg",
    },
    {
      name: "Dodda Raviteja",
      year: "2010",
      degree: "B Tech/CS/RK",
      description: "Founder & CEO, MoEngage India Private Limited",
      image: "/YAA2022/14.jpg",
    },
    {
      name: "Sachin Jaiswal",
      year: "2011",
      degree: "B Tech/EE/RK",
      description: "Director of Product Management, Swiggy",
      image: "/YAA2022/15.jpg",
    },
    {
      name: "Kintali Shiva Prasad",
      year: "1999",
      degree: "B Tech/CS/RP",
      description: "Founder & CEO, True Dat Inc., California",
      image: "/YAA2022/16.png",
    },
    {
      name: "Amandeep Singh Kochar",
      year: "2007",
      degree: "MBA/BM/MMM",
      description: "Chairman, CEO & President, Baker & Taylor, Charlotte",
      image: "/YAA2022/17.png",
    },
    {
      name: "Joy Deep Nath",
      year: "2008",
      degree: "D/CS/RK",
      description:
        "Entrepreneurship | Co-founder and Head - Sales & Institutional Partnerships, SplashLearn",
      image: "/YAA2022/18.png",
    },
    {
      name: "Aman Jain",
      year: "2013",
      degree: "D/DS/RK",
      description:
        "Co-founder and Head - Marketing and Communications, SplashLearn",
      image: "/YAA2022/19.png",
    },
    {
      name: "Unnati Jain",
      year: "2016",
      degree: "D/CS/PH",
      description:
        "Co-founder, Head - Curriculum Design and Technology, SplashLearn",
      image: "/YAA2022/20.png",
    },
    {
      name: "Kshitij Dixit",
      year: "2014",
      degree: "D/EC/CAS",
      description: "Founder & CEO at ZeoUto",
      image: "/YAA2022/21.png",
    },
    {
      name: "Abhipsita Saha",
      year: "2015",
      degree: "D/BT/NH",
      description:
        "Senior Scientist at Novo Nordisk, Denmark, Co-founder at AMGO Therapeutics",
      image: "/YAA2022/22.png",
    },
    {
      name: "Tejas Singh Kushwaha",
      year: "2017",
      degree: "D/EE/ME",
      description:
        "Senior Vice President, Customer Success & Support Ops, Healthiply (Healthcare SaaS)",
      image: "YAA2022/23.png",
    },
    {
      name: "Tushar Kanti Behera",
      year: "2016",
      degree: "D/CH/LLR",
      description:
        "Minister of State (Independent Charge) for E & IT, Sports & Youth Affairs, Government of Odisha",
      image: "/YAA2022/24.png",
    },
    {
      name: "Abhishek Kumar Yadav",
      year: "2009",
      degree: "B Tech/CS/RP",
      description: "Founder & Chairman at Griffiths International School",
      image: "/YAA2022/25.png",
    },
    {
      name: "Ankit Jain",
      year: "2010",
      degree: "M Tech/PH",
      description: "Co-founder, GDI Global",
      image: "/YAA2022/26.png",
    },
  ];
  return (
    <div>
      <h2 className="text-2xl font-bold border-b pb-2 mb-4">
        Distinguished Alumni Awards
      </h2>

      <div className="mb-6">
        <h3 className="font-semibold">Announcements Details:</h3>
        <p>
          IIT Kharagpur invites nominations for the Young Alumni Achiever Award
          to recognize young and promising alumni who have achieved great
          success and recognition in their chosen profession. The Young Alumni
          Achiever Awards serve as an opportunity for current and future
          students to be inspired by their seniors who have achieved notable
          success following graduation.
        </p>
        <p className="mt-2">
          The Young Alumni Achiever Award will recognize alumni aged 45 or
          younger who have demonstrated emerging and unique innovation,
          creativity, and success in his or her chosen career. Selections are
          based on success in chosen careers; however, a demonstrated commitment
          to excellence in IIT Kharagpur and opportunity for future involvement
          may also be considered.
        </p>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold">Eligibility:</h3>
        <p>
          Any person who has received a degree from the Institute is eligible to
          be considered for the Young Alumni Achiever Award, except in the
          following cases:
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-2">
          <li>
            <strong>A.</strong>An alumnus/alumna should not be more than 45
            years of age on 18th August 2021 i.e. on the Foundation Day of the
            Institute, the day on which awards will be conferred.
          </li>
          <li>
            <strong>B.</strong> An alumnus/alumna, who is an employee of IIT
            Kharagpur, shall not be eligible for the award during his/her
            service.
          </li>
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold">Criteria for nominees</h3>
        <p>The alumnus and alumna selected must meet the following criteria:</p>
        <ul className="list-disc pl-6 mt-2 space-y-2">
          <li>
            Excelled early in life and showed potential for continued success.
          </li>
          <li>
            Received recognition as an emerging leader in professional and/or
            community achievements.
          </li>
          <li>
            Attained increasingly responsible positions within their
            organization, business or field of work.
          </li>
          <li>
            Received recognition for significant professional contributions,
            discoveries or creative work through honors, awards and/or media
            attention.
          </li>
          <li>
            Served as an outstanding young role model for current and future IIT
            Kharagpur students.
          </li>
          <li>Contribution to the growth and development of the country.</li>
          <li>Other contributions</li>
        </ul>
      </div>
      <div className="mb-6">
        <h2 className="font-semibold">Criteria for proposer/seconder:</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Past Distinguished Service Awardees</li>
          <li>Present and Former Senate Members</li>
          <li>
            Office Bearers (President, Vice President, Secretary, Treasurer) and
            former Office Bearers (former President, former Vice President,
            former Secretary, former Treasurer) of the Alumni Foundations and
            Alumni Chapters across the globe.
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
          <strong>07th June 2021</strong>. The signed hard copy needs to be sent
          to the following address by 20th June 2021.
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
          with the subject line <strong>'DAA 2021 Nomination'</strong>.It may
          not be possible to consider nominations received after this date for
          the current year. However, those will be carried forward for
          consideration in the future.
        </p>
      </div>

      <h2 className="font-bold mt-6 mb-1">Process for Selection</h2>
      <p>
        Nominations shall be shortlisted by a{" "}
        <strong>Screening Committee (SC)</strong> chaired by the Dean (OR) with
        the approval of the Director. The SC will form a panel of reviewers,
        preferably past Distinguished Alumnus Awardees. Shortlisted nominations
        shall undergo peer review, and based on recommendations, the SC will
        make a final recommendation.The Standing Committee will normally
        comprise Director as the Chairman, Deputy Director, Dean (OR), Associate
        Dean (Alumni Affairs & Branding) as members and 2 (two) External
        Experts. The Committee will follow the guidelines of DAA selection
        considering all eligible nominations and their recommendations of the
        peer reviewers as well as the recommendation of the Screening Committee
        and make final recommendations to the Senate and the Board of Governors
        for approval.
      </p>
      <button className="mt-6 bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition">
        Download Nomination Form
      </button>

      <h2 className="text-2xl font-bold border-b pb-2 mb-6 mt-4">
        YAA AWARDEE 2022
      </h2>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
        {awardees.map((awardee, index) => (
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
  );
};

export default YoungAlumniAcheiverAward;
