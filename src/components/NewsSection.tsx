import React from "react";

type NewsItem = {
  title: string;
  description: string;
  image: string;
};

type NewsletterItem = {
  image: string;
  month: string;
  year: string;
};

const newsData: NewsItem[] = [
  {
    title: "Project Abhay: Transforming Truck Driver Health",
    description:
      "Project Abhay, an initiative by the Centre for Rural Development & Technology (CRDT), IIT Delhi, in...",
    image:
      "https://alumni.iitd.ac.in/uploads/News/1739967764IIT%20Delhi%20and%20University%20of%20Exeter%20Strengthen%20Collaborative%20Partnership.jpg",
  },
  {
    title: "IIT Delhi and University of Exeter Strengthen Collaboration",
    description:
      "On January 22, 2024, IIT Delhi and the University of Exeter signed a landmark agreement to...",
    image:
      "https://alumni.iitd.ac.in/uploads/News/1739967803project%20abhay.jpg",
  },
];

const newslettersData: NewsletterItem[] = [
  {
    image: "/images3.png",
    month: "January",
    year: "2025",
  },
  {
    image: "/images2.jpg",
    month: "December",
    year: "2024",
  },
];

const NewsSection: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* News Section */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold border-b-4 border-[#fd7e14] inline-block mb-4">
            NEWS
          </h2>
          <div className="space-y-6">
            {newsData.map((news, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row gap-4 bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full sm:w-1/3 h-40 object-cover"
                />
                <div className="p-4 flex flex-col">
                  <h3 className="font-semibold text-lg md:text-xl">
                    {news.title}
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                    {news.description}
                  </p>
                  <a
                    href="#"
                    className="text-indigo-500 text-sm md:text-base mt-2 font-medium"
                  >
                    Read more
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Newsletters Section */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold border-b-4 border-[#fd7e14] inline-block mb-4">
            MONTHLY NEWSLETTERS
          </h2>
          <div className="space-y-6">
            {newslettersData.map((newsletter, index) => (
              <div
                key={index}
                className="relative w-full h-40 bg-gray-200 rounded-lg overflow-hidden shadow-md"
              >
                <img
                  src={newsletter.image}
                  alt={`${newsletter.month} ${newsletter.year}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <span className="text-white text-xl md:text-2xl font-bold">
                    {newsletter.month} {newsletter.year}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsSection;
