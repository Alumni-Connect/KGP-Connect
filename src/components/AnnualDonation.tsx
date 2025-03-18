import React from 'react'

const AnnualDonation = () => {
  return (
    <div>
    <h1 className="text-2xl font-semibold text-gray-900 mb-4 py-2 border-b">
     Annual Donations
    </h1>
    <img src="/services/8.jpg" className='w-full' />
    <p className='mt-6'>
    The Institute wants to excel its position as an academic and research driven institute with an impact that goes beyond the nation. With new IITs coming up there is a decreasing trend in funding from current sources. This would need more funding from other sources. This fund will help in research & innovations, offer attractive remunerations to faculty and sustain other student oriented initiatives not funded by the Government. This fund needs to be built through regular donations over a long period of time and put into an institute endowment which will take care of future needs.
    <br></br><br></br>Your gift is invested —never dissipated!
    </p>
    <div className='mt-4 flex flex-col gap-2 '>
      <strong>Fund Required: INR 5000000 (upto December 2022)</strong>
      <strong>Fund Received:INR 1146000 </strong>
    </div>
    <div className='hover:text-indigo-600 mt-4 '>
        <a href="https://d3sr7cc30ek8f4.cloudfront.net/images/size:1500x1500/type:cover/prod/62a068730e38100010893144/IITKGPBankingDetails.png" target='_blank' className='cursor-pointer underline'>Banking details of IIT Kharagpur</a>
      </div>


  </div>
  )
}

export default AnnualDonation