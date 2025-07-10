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

title: "Embodying the spirit of Vasudhaiva Kutumbakam",

description:

"he world is one family — international students of Indian Institute of Technology, Kharagpur participated in the divine & cultural procession of the Bahuda Yatra of the Lord Jagannath in Kharagpur,...",

image: "https://media.licdn.com/dms/image/v2/D4D22AQF0hOnevRE1mw/feedshare-shrink_800/B4DZfbdDjtGUAg-/0/1751733525402?e=1755129600&v=beta&t=W_MmXWn39rNGdwXdgwcMu3g_fYD32IL2ngIe80i8oR4"

},

{

title: "Unveils New SWAYAM Prabha Office & Studio to Advance Inclusive Digital Education",

description:

"On July 4, 2025, IIT Kharagpur proudly inaugurated its new SWAYAM Prabha Office and Studio, marking a significant step...",

image:

"https://media.licdn.com/dms/image/v2/D4D22AQHC2FCpME6nsA/feedshare-shrink_800/B4DZfVxIvRHkAg-/0/1751638126001?e=1755129600&v=beta&t=vRdeJaqLT7kdLo0I4tEjB_3zL8K4UI1Kuz63M7GnZyw",

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
