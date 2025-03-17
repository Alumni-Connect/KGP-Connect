import React from "react";

interface Member {
  name: string;
  designation: string;
  contact: string;
}

const chapters = [
  {
    title: "IIT Foundation India",
    members: [
      {
        name: "Varadarajan (Varadu) Seshamani",
        designation: "President",
        contact: "seshamani@ergindia.com",
      },
      {
        name: "Neeta Jain Sharma",
        designation: "Vice President",
        contact: "neetasamir@gmail.com",
      },
      {
        name: "Pankaj K Singh",
        designation: "Secretary",
        contact: "pksinghasn@gmail.com",
      },
      {
        name: "Shib Sankar Das",
        designation: "Treasurer",
        contact: "shibsankar@gmail.com",
      },
      {
        name: "Pronob Guha",
        designation: "Co-opted EC Member",
        contact: "pronob.guha@gmail.com",
      },
      {
        name: "Rajah Venkataraman",
        designation: "Co-opted EC Member",
        contact: "rajv@fortuneconsultants.net",
      },
      {
        name: "Pradeep Prasad",
        designation: "Co-opted EC Member",
        contact: "pradeep.prasad@in.ibm.com",
      },
      {
        name: "Kirti Acharya",
        designation: "Co-opted EC Member",
        contact: "acharya.kirti@gmail.com",
      },
    ],
  },
  {
    title: "Bangalore Chapter",
    members: [
      {
        name: "Pradeep Prasad",
        designation: "President",
        contact: "PradeepPrasadIITKgp@gmail.com",
      },
      {
        name: "Subham Sarkar",
        designation: "Secretary",
        contact: "subham.sarkar@gmail.com",
      },
    ],
  },
];

const ChaptersTable: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      {chapters.map((chapter, index) => (
        <div key={index} className="mb-8">
          <h2 className="text-xl font-bold mb-2">{chapter.title}</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left">Name</th>
                  <th className="border p-2 text-left">Designation</th>
                  <th className="border p-2 text-left">Contact</th>
                </tr>
              </thead>
              <tbody>
                {chapter.members.map((member, idx) => (
                  <tr key={idx} className="border">
                    <td className="border p-2">{member.name}</td>
                    <td className="border p-2">{member.designation}</td>
                    <td className="border p-2">{member.contact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChaptersTable;
