import React from "react";

const GuestHouseBooking = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold border-b pb-2 mb-4">
        {" "}
        Guest house Booking{" "}
      </h2>
      <div className="mb-6">
        <p>
          For booking room(s) in the guest house please contact us mentioning
          your first and last names, alum details (degree, department and year
          of passing) and contact details. Specify the room requirements. Keep
          the subject line as "Guest House Accommodation"
        </p>
      </div>
      <div className="mb-6">
        <h3 className="font-semibold">
          Guest House Booking / Accommodation / Car Hire:
        </h3>
        <ul className="list-disc pl-6 mt-2 space-y-2">
          <li>Mr. Sadhan Banerjee,</li>
          <li>Ph. (O): 03222-281065;</li>
          <li>
            Email: sadhan@hijli.iitkgp.ernet.in / alumni@hijli.iitkgp.ernet.in
          </li>
        </ul>
      </div>
      <div className="mb-6">
        <h3 className="font-semibold">Technology Guest House</h3>
        <ul className="list-disc pl-6 mt-2 space-y-2">
          <li>
            Air-conditioned single / double bedded rooms, and suites (total 60
            beds)
          </li>
          <li>Telephone: 03222-282800</li>
        </ul>
      </div>
      <div className="mb-6">
        <h3 className="font-semibold">Asutosh Mukherjee Guest House</h3>
        <ul className="list-disc pl-6 mt-2 space-y-2">
          <li>Accommodation: 48 single rooms</li>
          <li>Telephone: 03222-281138</li>
        </ul>
      </div>
      <div className="mb-6">
        <h3 className="font-semibold">IIT Kharagpur Kolkata Campus</h3>
        <ul className="list-disc pl-6 mt-2 space-y-2">
          <li>HC Block, Sector-III, Salt Lake City, Kolkata – 700106</li>
          <li>Telephone: 033-23379793; Telefax: 033-23348091</li>
        </ul>
      </div>
      <div className="">
        <h2 className="text-2xl font-bold mb-4">
          New Technology Guest House Visveswaraya Guest House
        </h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Room Type</th>
              <th className="border border-gray-300 px-4 py-2">
                Occupancy Type
              </th>
              <th className="border border-gray-300 px-4 py-2">Tariff</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2">D/B AC rooms</td>
              <td className="border border-gray-300 px-4 py-2">
                <p>Single Occupancy</p>
                <p>Double Occupancy</p>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <p>1000/-</p>
                <p>1500/-</p>
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Suite Rooms</td>
              <td className="border border-gray-300 px-4 py-2">Per Room</td>
              <td className="border border-gray-300 px-4 py-2">2000/-</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Meeting Room</td>
              <td className="border border-gray-300 px-4 py-2">Per Meeting</td>
              <td className="border border-gray-300 px-4 py-2">
                <p>5000/- (Without VC)</p>
                <p>8000/- (With VC)</p>
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Banquet Hall</td>
              <td className="border border-gray-300 px-4 py-2">-</td>
              <td className="border border-gray-300 px-4 py-2">
                <p>5000/- (For Lunch or Dinner each)</p>
                <p>8000/-</p>
              </td>
            </tr>
          </tbody>
        </table>

        <h2 className="text-2xl font-bold mt-6 mb-4">
          Technology Guest House (Old Wing)
        </h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Room Type</th>
              <th className="border border-gray-300 px-4 py-2">
                Occupancy Type
              </th>
              <th className="border border-gray-300 px-4 py-2">Tariff</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2">D/B AC rooms</td>
              <td className="border border-gray-300 px-4 py-2">
                <p>Single Occupancy</p>
                <p>Double Occupancy</p>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <p>1000/-</p>
                <p>1500/-</p>
              </td>
            </tr>
          </tbody>
        </table>

        <h2 className="text-2xl font-bold mt-6 mb-4">
          Technology Guest House (Annex)
        </h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Room Type</th>
              <th className="border border-gray-300 px-4 py-2">
                Occupancy Type
              </th>
              <th className="border border-gray-300 px-4 py-2">Tariff</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2">D/B AC rooms</td>
              <td className="border border-gray-300 px-4 py-2">
                <p>Single Occupancy</p>
                <p>Double Occupancy</p>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <p>1000/-</p>
                <p>1500/-</p>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="">
          {/* Heritage Building */}
          <h2 className="text-lg font-bold mb-2">Heritage Building</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 p-2 text-left">
                    Room Type
                  </th>
                  <th className="border border-gray-300 p-2 text-left">
                    Occupancy Type
                  </th>
                  <th className="border border-gray-300 p-2 text-left">
                    Tariff
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2">Suite</td>
                  <td className="border border-gray-300 p-2">Per room</td>
                  <td className="border border-gray-300 p-2">5000/-</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 p-2 text-left">
                    Room Type
                  </th>
                  <th className="border border-gray-300 p-2 text-left">
                    Occupancy Type
                  </th>
                  <th className="border border-gray-300 p-2 text-left">
                    Tariff
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2" rowSpan={2}>
                    D/B AC rooms
                  </td>
                  <td className="border border-gray-300 p-2">
                    Single Occupancy
                  </td>
                  <td className="border border-gray-300 p-2">400/-</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">
                    Double Occupancy
                  </td>
                  <td className="border border-gray-300 p-2">600/-</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2" rowSpan={2}>
                    D/B Non-AC rooms
                  </td>
                  <td className="border border-gray-300 p-2">
                    Single Occupancy
                  </td>
                  <td className="border border-gray-300 p-2">250/-</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">
                    Double Occupancy
                  </td>
                  <td className="border border-gray-300 p-2">300/-</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">
                    Single bedded Non-AC Room
                  </td>
                  <td className="border border-gray-300 p-2">Per Room</td>
                  <td className="border border-gray-300 p-2">150/-</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">
                    3&4 bedded Non-AC Rooms
                  </td>
                  <td className="border border-gray-300 p-2">Per Bed</td>
                  <td className="border border-gray-300 p-2">150/-</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Kolkata Guest House */}
          <h2 className="text-lg font-bold mt-6 mb-2">Kolkata Guest House</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 p-2 text-left">
                    Room Type
                  </th>
                  <th className="border border-gray-300 p-2 text-left">
                    Occupancy Type
                  </th>
                  <th className="border border-gray-300 p-2 text-left">
                    Tariff
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2" rowSpan={2}>
                    D/B AC rooms
                  </td>
                  <td className="border border-gray-300 p-2">
                    Single Occupancy
                  </td>
                  <td className="border border-gray-300 p-2">1200/-</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">
                    Double Occupancy
                  </td>
                  <td className="border border-gray-300 p-2">1500/-</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2" rowSpan={2}>
                    Cottages
                  </td>
                  <td className="border border-gray-300 p-2">
                    Single Occupancy
                  </td>
                  <td className="border border-gray-300 p-2">400/-</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">
                    Double Occupancy
                  </td>
                  <td className="border border-gray-300 p-2">600/-</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">Dormitory</td>
                  <td className="border border-gray-300 p-2">Per Bed</td>
                  <td className="border border-gray-300 p-2">250/-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestHouseBooking;
