import Link from "next/link";
import React from "react";

const youtubeVideos = [
  {
    id: 1,
    title: "Beneficiary speaks: Amit & Deepali Sinha Fellowship",
    link: "https://www.youtube.com/embed/OpQI9aVbPeQ?si=90PQyO3JS82kDYGH",
  },
  {
    id: 2,
    title: "Beneficiary speaks: Amit & Deepali Sinha Fellowship",
    link: "https://www.youtube.com/embed/JVKgACVJfxI?si=smh5YogsT5ilk8fT",
  },
  {
    id: 3,
    title: "Donor Wall",
    link: "https://www.youtube.com/embed/o402VTAwEis?si=CoIQNnzSVuhj8VVx",
  },
];

const YoutubeSection: React.FC = () => {
  return (
    <section className="py-10 px-5">
      <div className="flex flex-col md:flex-row justify-between items-center mb-5">
        <h2 className="text-xl font-bold border-b-4 border-indigo-500 mb-4 md:mb-0">
          FROM ALUMNI RELATIONS YOUTUBE CHANNEL
        </h2>
        <Link
          href="https://www.youtube.com/@StudentsAlumniCellIITKharagpur"
          target="_blank"
        >
          <button className="bg-[#fd7e14] text-white px-4 py-2 rounded-md hover:bg-orange-700">
            View all
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {youtubeVideos.map((video) => (
          <div key={video.id} className="w-full flex justify-center">
            <iframe
              className="w-full  md:w-[560px] h-[200px] md:h-[315px] "
              src={video.link}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          </div>
        ))}
      </div>
    </section>
  );
};

export default YoutubeSection;
