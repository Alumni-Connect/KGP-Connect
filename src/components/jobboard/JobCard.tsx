import { Job } from "@/types";
import { Bookmark } from "lucide-react";

const getOrdinal = (n: number) => {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

export default function JobCard({
  title,
  company,
  location,
  salary,
  postedAt,
  url,
}: Job) {
  return (
    <div className="p-3">
      <div className="bg-white w-72 h-60 rounded-2xl shadow-xl hover:shadow-lg p-2">
        {/* orange section  */}
        <div className="rounded-2xl bg-indigo-100 p-4 h-40">
          {/* date */}
          <div className="flex justify-between items-center">
            <div className="p-2 bg-white rounded-3xl text-xs font-semibold">
              <p>{`${getOrdinal(new Date(postedAt).getDate())} ${new Date(postedAt).toLocaleString("en-US", { month: "long" })}, ${new Date(postedAt).getFullYear()}`}</p>
            </div>
            <div className="bg-white rounded-full p-2">
              <Bookmark size={16} />
            </div>
          </div>
          {/* company name */}
          <div className="pt-3 text-sm font-semibold w-50">{company}</div>
          {/* title and logo */}
          <div className="flex justify-between items-center text-xl font-semibold">
            <h2>{title}</h2>
          </div>
        </div>
        {/* salary and location and details */}
        <div className="flex justify-between items-center px-6 py-3">
          <div>
            <p className="font-bold text-sm">{salary}</p>
            <p className="text-gray-400 font-semibold text-xs">{location}</p>
          </div>
          <button className="bg-black text-white font-semibold rounded-3xl px-4 py-2">
            <a href={url}>Link</a>
          </button>
        </div>
      </div>
    </div>
  );
}
