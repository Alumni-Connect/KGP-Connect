import React from "react";

const AlumniCell: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Students' Alumni Cell</h2>
      <p className="text-gray-700 mb-4">
        The Students' Alumni Cell, IIT Kharagpur is an active and central
        student body working under the aegis of the Dean Outreach that
        coordinates all the alumni activities. The cell comes under the Office
        of Alumni Affairs and Branding. It works in conjunction with the student
        administration bodies. The cell connects students with alumni and works
        towards ensuring the mutual benefit of alumni as well as students. This
        helps the alumni in staying connected to their alma mater and promotes a
        sense of belongingness among them.
      </p>
      <p className="text-gray-700 mb-4">
        To serve the above purpose, the Students' Alumni Cell organizes various
        events and has several initiatives.{" "}
        <span className="font-semibold">
          Student Alumni Mentorship Programme (SAMP)
        </span>{" "}
        and
        <span className="font-semibold">
          {" "}
          Alumni Career Assistance Programme (ACAP)
        </span>{" "}
        help students from IIT Kharagpur to take guidance from our prominent
        alumni who have experience in the same field and can guide them better
        than anybody else.
      </p>
      <p className="text-gray-700 mb-4">
        The <span className="font-semibold">My Imprint</span> Class Gift
        Programme is an opportunity for the soon-to-be alumni to get a head
        start in paying their tributes to their alma mater. Various meets like
        the
        <span className="font-semibold"> Annual Alumni Meet, Homecoming</span>,
        and <span className="font-semibold">Students’ Alumni Meet</span>
        are organized by SAC, which helps the student community and alumni to
        have a strong bond and proves to be beneficial for both.
      </p>
      <p className="text-gray-700 mb-4">
        Through <span className="font-semibold">Affinity</span>, SAC works
        towards establishing and strengthening relations with multinational
        companies through two-way ties, in which they provide KGPians with
        incentives and discounts on goods and services. In{" "}
        <span className="font-semibold">
          Alumni Talks and Leadership Summit
        </span>
        , reputed alumni from various fields come together on one platform,
        sharing the secrets of their success.
      </p>
      <p className="text-gray-700 mb-4">
        In addition to this, SAC also publishes three important publications:{" "}
        <span className="font-semibold">Yearbook, Yearnings of Yore</span>, and{" "}
        <span className="font-semibold">Tempo Shout</span>.
      </p>
      <p className="mt-6 text-blue-600 hover:underline">
        <a
          href="https://sac.iitkgp.ac.in"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit our website - https://sac.iitkgp.ac.in
        </a>
      </p>
    </div>
  );
};

export default AlumniCell;
