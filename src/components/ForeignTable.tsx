import React from "react";

interface Member {
  name: string;
  designation: string;
  contact: string;
}
const chapters2 = [
  {
    title: "Atlanta & South East",
    members: [
      { name: "Rajan Sriram", contact: "rajansriram@rediffmail.com" },
      { name: "Sandip Dutta", contact: "sand_dut@hotmail.com" },
      { name: "Manas Bajaj", contact: "manasbajaj@yahoo.com" },
    ],
  },
  {
    title: "Chicago & Midwest",
    members: [
      {
        name: "Shailendra Verma",
        contact: "sverma2000@kellogg.northwestern.edu",
      },
      { name: "L Ramachandran", contact: "ramurama@yahoo.com" },
      { name: "Vikram Vuppala", contact: "vikram.vuppala@gmail.com" },
    ],
  },
  {
    title: "Houston",
    members: [
      { name: "Hemant Jha", contact: "hemant_jha@yahoo.com" },
      { name: "Partha Sarathi Chatterjee", contact: "chatterjeep@yahoo.com" },
    ],
  },
  {
    title: "Minneapolis & Twin Cities",
    members: [
      { name: "Rajiv Tandon", contact: "rajivtandon@yahoo.com" },
      { name: "Balram Suman", contact: "balramsuman@gmail.com" },
    ],
  },
  {
    title: "Seattle",
    members: [{ name: "Pankaj Sethi", contact: "pankaj.sethi@gmail.com" }],
  },
  {
    title: "Ohio",
    members: [{ name: "Jacob Mathew", contact: "jacob@icbs.com" }],
  },
  {
    title: "New York",
    members: [{ name: "Arnab Dey", contact: "arnab.dey.nyc@gmail.com" }],
  },
  {
    title: "Southern California",
    members: [
      {
        name: "Alok Kumar Chatterjee",
        contact: "alok.chatterjee@jpl.nasa.gov",
      },
    ],
  },
];

const chapters = [
  {
    title: "IITKGP Foundation (USA)",
    members: [
      {
        name: "Asoke Deysarkar",
        designation: "President",
        contact: "asoke@pfptechnology.com",
      },
      {
        name: "Rakesh Gupta",
        designation: "Treasurer",
        contact: "rakesh.gupta@biberk.com",
      },
      {
        name: "Meenakshi N. Khazanchi",
        designation: "Executive Director",
        contact: "iitkgpfoundation@gmail.com",
      },
    ],
  },
  {
    title: "UK Chapters",
    members: [
      {
        name: "Ratun Lahiri",
        designation: "President",
        contact: "ratun@btinternet.com",
      },
      {
        name: "Prashant Gupta",
        designation: "Vice President",
        contact: "prashantrex@gmail.com",
      },
      {
        name: "Vivek Agarwal",
        designation: "Treasurer",
        contact: "swapnavivek@rediffmail.com",
      },
      {
        name: "Nikunj Mall",
        designation: "Secretary",
        contact: "mallniku@gmail.com",
      },
    ],
  },
  {
    title: "Canada Chapter",
    members: [
      {
        name: "Alok Sinha",
        designation: "President",
        contact: "sinha.alok@hotmail.com",
      },
    ],
  },
  {
    title: "Kuwait Chapter",
    members: [
      {
        name: "Indrajit Bhowmick",
        designation: "President",
        contact: "indrajit_bhowmick@hotmail.com",
      },
    ],
  },
  {
    title: "Singapore Chapter",
    members: [
      {
        name: "Sayanta Basu",
        designation: "President",
        contact: "sayanta@yahoo.com",
      },
      {
        name: "Biswajit Khan",
        designation: "Vice President",
        contact: "biswa.khan@gmail.com",
      },
    ],
  },
  {
    title: "Dubai Chapter",
    members: [
      {
        name: "K Rajah Venkataraman",
        designation: "President",
        contact: "rajv@fortuneconsultants.net",
      },
    ],
  },
  {
    title: "UAE Chapters",
    members: [
      {
        name: "Krishna Kumar",
        designation: "President",
        contact: "krishna@alphaicapital.com",
      },
      {
        name: "Suraj Kumar",
        designation: "Vice President",
        contact: "surajkumargopal@gmail.com",
      },
      {
        name: "Nishant Soni",
        designation: "Vice President",
        contact: "nishantsoni.iitkgp@gmail.com",
      },
      {
        name: "Ashish Mehta",
        designation: "Secretary",
        contact: "ashish@incmantra.com",
      },
      {
        name: "Ashish Jha",
        designation: "Joint Secretary",
        contact: "ashish@thejhas.com",
      },
      {
        name: "Kiran Kumar Koppuravuri",
        designation: "Joint Secretary",
        contact: "kiran.iitkgp1701@gmail.com",
      },
    ],
  },
];

const ForeignTable: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold py-2 border-b mb-4 text-gray-600">
        Global Chapters
      </h1>
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
      <h2 className="text-xl font-bold mb-4">US Chapters</h2>
      {chapters2.map((chapter, index) => (
        <div key={index} className="mb-4 px-3">
          <h2 className="text-xl font-bold mb-2">{chapter.title}</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left">Name</th>
                  <th className="border p-2 text-left">Contact</th>
                </tr>
              </thead>
              <tbody>
                {chapter.members.map((member, idx) => (
                  <tr key={idx} className="border">
                    <td className="border p-2">{member.name}</td>
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

export default ForeignTable;
