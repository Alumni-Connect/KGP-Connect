import React, { useState } from "react";

const youtubeVideos = [
  {
    id: 1,
    title: "Beneficiary speaks: Amit & Deepali Sinha Fellowship",
    link: "https://www.youtube.com/watch?v=YOUR_VIDEO_ID_HERE",
  },
  {
    id: 2,
    title: "Beneficiary speaks: Amit & Deepali Sinha Fellowship",
    link: "https://www.youtube.com/watch?v=YOUR_VIDEO_ID_HERE",
  },
  {
    id: 3,
    title: "Donor Wall",
    link: "https://www.youtube.com/watch?v=YOUR_VIDEO_ID_HERE",
  },
];

const YoutubeSection: React.FC = () => {
  const [index, setIndex] = useState(0);

  const nextSlide = () => setIndex((prev) => (prev + 1) % youtubeVideos.length);
  const prevSlide = () =>
    setIndex((prev) => (prev - 1 + youtubeVideos.length) % youtubeVideos.length);

  return (
    <section className="py-10 px-5">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-bold inline-block border-b-4 border-indigo-500">FROM ALUMNI RELATIONS YOUTUBE CHANNEL</h2>
        <button className="bg-[#fd7e14] text-white px-4 py-2 rounded-md">View all</button>

      </div>

     <div className="flex justify-evenly items-center gap-4">
     <iframe width="560" height="315" src="https://www.youtube.com/embed/OpQI9aVbPeQ?si=90PQyO3JS82kDYGH" title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  ></iframe>
     <iframe width="560" height="315" src="https://www.youtube.com/embed/OpQI9aVbPeQ?si=90PQyO3JS82kDYGH" title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe>
     <iframe width="560" height="315" src="https://www.youtube.com/embed/OpQI9aVbPeQ?si=90PQyO3JS82kDYGH" title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe>
     </div>
      

      
    </section>
  );
};

export default YoutubeSection;
