import React from 'react'

const HallEndowment = () => {
  return (
    <div>
    <h1 className="text-2xl font-semibold text-gray-900 mb-4 py-2 border-b">
    Hall Endowment Campaign
    </h1>
    <img src="/services/6.jpg" className='w-full' />
    <p className='mt-6'>
    It's not how much we give . . . but how much love . . . we put into giving............ Your Hall Your Pride
      <br></br><br></br>
      It has been years since you left your second home - the Halls of IIT-KGP. Most of them have been refurbished and renovated. Some new Halls have come up too. For the students these Halls still stand as the Citadel during the years of stay at the KGP campus. It is time you lend your support to this home of yours and help them be the way you wanted them. To facilitate you help the Halls we have launched the Hall Endowment Campaign.
    </p>
    <ul className='mt-4 flex flex-col gap-1 list-disc px-6'>
    <li>Modernization in old halls - Appliances like washing machine, electric water heater, microwave</li>
        <li>Hall Capacity Building - Uplift amenities and introduce new facilities</li>
        <li>Upgrading Mess facility, Kitchen, Dining area, Washing area, Service area</li>
        <li>Recreation rooms - TV room, Soundproof music room, Theatre room, Happiness Room</li>
        <li>Adding sports facilities and modifications - Gym, Table Tennis room, Indoor-outdoor courts for sports facility</li>
        <li>Student service and providing support to student clubs - Instruments for clubs like movie camera, DSLR camera, telescope etc</li>
        <li>Special Night Canteen</li>
      </ul>
      <p className='mt-6'>
      Yes you can help with all of these by giving to the Hall Endowment Campaign!
      <br></br><br></br>
      You will be encouraged to donate to your respective hall to uplift amenities and introduce new facilities. Hall giving back initiative will help you to reconnect with your old folks to revive the nostalgia of raising the hall tempo. Hall Usage— Warden and hall president will survey and will decide on the priority requirement of the hall. Chairman, Hall Management Committee will approve the project/projects and then the Alumni Office will connect to the alumni fraternity.
    </p>
      <div className='mt-4 flex flex-col gap-2 '>
        <h2 className='font-bold'>Donors’ Services:</h2>
        <ul className=' flex flex-col gap-1 list-disc px-6'>
        <li>Exemption of Income Tax u/s 80(G) of the Income Tax Act-1961 for Indian Donors.</li>
        <li>Charitable Donations made to IIT Foundation, a 501(c)(3) organization, are deductible for US Federal and State Income tax purposes.</li>
        <li>Campaign reports, brochures</li>
        <li>Special goodies for contributors</li>
        <li>The alumni have been a great source of support for us over the years and we could see your enthusiasm increasing. Hit the 2020 Sixer with your Hallmates, wing mates and achieve this trophy of success and glory for your Halls.</li>
        </ul>
    </div>
    <div className="container mx-auto p-4">
        <p className="text-lg text-gray-700 mb-4">
            KGP Halls where you spent the most eventful and colourful years of your life. Now make your Halls a place of grandeur.
        </p>

  
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-2 px-4 border-b text-left text-gray-600">Name of Hall</th>
                        <th className="py-2 px-4 border-b text-left text-gray-600">Fund Required (INR)</th>
                        <th className="py-2 px-4 border-b text-left text-gray-600">Fund Received (INR)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="py-2 px-4 border-b">Azad Hall</td>
                        <td className="py-2 px-4 border-b">5 Cr</td>
                        <td className="py-2 px-4 border-b">1,149,092.00</td>
                    </tr>
                    <tr>
                        <td className="py-2 px-4 border-b">LLR Hall</td>
                        <td className="py-2 px-4 border-b">5 Cr</td>
                        <td className="py-2 px-4 border-b">325,284.00</td>
                    </tr>
                    <tr>
                        <td className="py-2 px-4 border-b">Patel Hall</td>
                        <td className="py-2 px-4 border-b">5 Cr</td>
                        <td className="py-2 px-4 border-b">10,573,977.00</td>
                    </tr>
                    <tr>
                        <td className="py-2 px-4 border-b">RK Hall</td>
                        <td className="py-2 px-4 border-b">5 Cr</td>
                        <td className="py-2 px-4 border-b">2,449,153.00</td>
                    </tr>
                    <tr>
                        <td className="py-2 px-4 border-b">RP Hall</td>
                        <td className="py-2 px-4 border-b">5 Cr</td>
                        <td className="py-2 px-4 border-b">2,614,159.00</td>
                    </tr>
                    <tr>
                        <td className="py-2 px-4 border-b">SN Hall</td>
                        <td className="py-2 px-4 border-b">5 Cr</td>
                        <td className="py-2 px-4 border-b">80,000.00</td>
                    </tr>
                    <tr>
                        <td className="py-2 px-4 border-b">JCB Hall</td>
                        <td className="py-2 px-4 border-b">5 Cr</td>
                        <td className="py-2 px-4 border-b">100,000.00</td>
                    </tr>
                    <tr>
                        <td className="py-2 px-4 border-b">B C Roy Hall</td>
                        <td className="py-2 px-4 border-b">5 Cr</td>
                        <td className="py-2 px-4 border-b">100,000.00</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div className='hover:text-indigo-600 mt-4 '>
        <a href="https://d3sr7cc30ek8f4.cloudfront.net/images/size:1500x1500/type:cover/prod/62a068730e38100010893144/IITKGPBankingDetails.png" target='_blank' className='cursor-pointer underline'>Banking details of IIT Kharagpur</a>
      </div>


  </div>
  )
}

export default HallEndowment