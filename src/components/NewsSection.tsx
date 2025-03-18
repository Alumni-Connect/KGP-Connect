import React from "react";

type NewsItem = {
  title: string;
  description: string;
  image: string;
  link:string;
};

type NewsletterItem = {
  image: string;
  month: string;
  year: string;
};

const newsData: NewsItem[] = [
  {
    title: "Holi Celebration",
    description:
      "On the occasion of Holi, the Students' Alumni Cell extends warm wishes to the students and alumni of IIT Kharagpur.Let us celebrate the spirit of togetherness, harmony, and renewal that this festival brings. As we ....",
    image:
      "/Holi.jpg",
      link:"https://www.facebook.com/share/16Ej1qhd5h/"
  },
  {
    title: "Union of Batch 1970",
    description:
      "Students' Alumni Cell hosted the reunion of the Incredibles: Batch of 1970, bringing together pioneers who shaped their journeys at IIT KGP and beyond. From reliving cherished memories to rekindling lifelong bonds, the .....",
    image:
      "/Union.jpg",
      link:"https://www.facebook.com/share/1BKUeHWTit/"
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
                    href={news.link} target="_blank"
                    className="text-indigo-500 text-sm md:text-base mt-2 font-medium cursor-pointer"
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
