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
      { name: "Varadarajan (Varadu) Seshamani", designation: "President", contact: "seshamani@ergindia.com" },
      { name: "Neeta Jain Sharma", designation: "Vice President", contact: "neetasamir@gmail.com" },
      { name: "Pankaj K Singh", designation: "Secretary", contact: "pksinghasn@gmail.com" },
      { name: "Shib Sankar Das", designation: "Treasurer", contact: "shibsankar@gmail.com" },
      { name: "Pronob Guha", designation: "Co-opted EC Member", contact: "pronob.guha@gmail.com" },
      { name: "Rajah Venkataraman", designation: "Co-opted EC Member", contact: "rajv@fortuneconsultants.net" },
      { name: "Pradeep Prasad", designation: "Co-opted EC Member", contact: "pradeep.prasad@in.ibm.com" },
      { name: "Kirti Acharya", designation: "Co-opted EC Member", contact: "acharya.kirti@gmail.com" },
    ],
  },
  {
    title: "Bangalore Chapter",
    members: [
      { name: "Pradeep Prasad", designation: "President", contact: "PradeepPrasadIITKgp@gmail.com" },
      { name: "Subham Sarkar", designation: "Secretary", contact: "subham.sarkar@gmail.com" },
    ],
  },
  {
    title: "Delhi / North India Chapter",
    members: [
      { name: "Sukhamoy Paul", "designation": "President", "contact": "sukhamoypaul@hotmail.com" },
      { name: "Abhudaya Dasgupta", "designation": "General Secretary", "contact": "abhyudaydg@gmail.com" }
    ]
  },
  {
    title: "Mumbai Chapter",
    members: [
      { name: "Anil Govind Rajadhyaksha", "designation": "President", "contact": "anil.gr@gmail.com" },
      { name: "Arvind Saxena", "designation": "Secretary", "contact": "architectarvindsaxena@gmail.com" }
    ]
  },
  {
    title: "Pune Chapter",
    members: [
      { name: "Kalyan Chakravarti", "designation": "President", "contact": "kalyan.chakravarti@gmail.com" },
      { name: "Shyamal Basu", "designation": "Secretary", "contact": "shyamal_basu@hotmail.com" }
    ]
  },
  {
    title: "Hyderabad Chapter",
    members: [
      {
        name: "Col S Balachandrudu",
        designation: "President",
        contact: "bala4659@gmail.com"
      },
      {
        name: "Panduranga Rathod",
        designation: "Secretary",
      contact: "jit.rathod89@gmail.com"
      }
    ]
  },
  {
    title: "Chennai Chapter",
    members: [
      {
        name: "Rajashri Natarajan",
        designation: "President",
        contact: "sairaj.rajashree@gmail.com"
      },
      {
        name: "Praveen Reddy",
        designation: "Secretary",
        contact: "praveen.reddy@induswealth.com"
      }
    ]
  },
  {
    title: "Kolkata Chapter",
  members: [
      {
        name: "Kabindra Daga",
        designation: "President",
        contact: "kdaga62@gmail.com"
      },
      {
        name: "Siddharth Roy Chowdhury",
        designation: "Secretary",
        contact: "src@alumnimaiL.iitkgp.ac.in"
      }
    ]
  },
  {
    title: "Kharagpur Chapter",
    members: [
      { name: "Kingshuk Bhattacharyya", designation: "President", contact: "king@mech.iitkgp.ac.in" },
      { name: "Dr Probal Sengupta", designation: "Secretary", contact: "probal@gg.iitkgp.ac.in" }
    ]
  },
  {
    title: "Bhubaneswar Chapter",
    members: [
      { name: "Ratnam Varada Raja Kumar", designation: "President", contact: "director@iitbbs.ac.in" },
      { name: "Prasenjeet Pati", designation: "Secretary", contact: "prasenjeet.pati@gmail.com" }
    ]
  },
  {
    title: "Jamshedpur Chapter",
    members: [
      { name: "B K Das", designation: "President", contact: "bkdas@tatasteel.com" },
      { name: "Keshari Kumar", designation: "General Secretary", contact: "kesharik@tatasteel.com" }
    ]
  },
  {
    title: "Jaipur Chapter",
    members: [
      { name: "M L Gupta", designation: "President", contact: "guptamuraril@gmail.com" },
      { name: "Kartik Sharma", designation: "Secretary", contact: "shkartik90@gmail.com" }
    ]
  },
  {
    title: "Lucknow Chapter",
    members: [
      { name: "Prof B K Mathur", designation: "President", contact: "bk259m@gmail.com" },
      { name: "Prof S P Singh", designation: "Secretary", contact: "sujeet97@gmail.com" }
    ]
  },
  {
    title: "Nagpur Chapter",
    members: [
      { name: "M G Srikant", designation: "President", contact: "mgsrikant@gmail.com" },
      { name: "Ramesh Kherdekar", designation: "Secretary", contact: "rwkherdekar@gmail.com" }
    ]
  },
  {
    title: "Chandigarh Chapter",
    members: [
      { name: "Manikant Prasad Singh", designation: "President", contact: "mpsinghias@gmail.com" },
      { name: "Mahavir S Jagdev", designation: "Secretary", contact: "mahavirindia@yahoo.com" }
    ]
  },
  {
    title: "Madhya Pradesh Chapter",
    members: [
      { name: "Dr. Achal", designation: "President", contact: "akc@ipsacademy.org" },
      { name: "Rupesh Dubey", designation: "Secretary", contact: "hod.telecom@ipsacademy.org" }
    ]
  }
  
  
  
 
];

const ChaptersTable: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold py-2 border-b mb-4 text-gray-600">Domestic Chapters</h1>
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