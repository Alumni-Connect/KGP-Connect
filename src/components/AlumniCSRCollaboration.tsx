import React from 'react'

const AlumniCSRCollaboration = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-4 py-2 border-b">
        Alumni CSR Collaboration
      </h1>
      <img src="/services/1.jpg" className='w-full' />
      <p className='mt-6'>
        In accordance to National CSR Award (NCSRA) instituted by the Ministry of Corporate Affairs, Govt. of India, IIT KGP aims to undertake / support projects in the areas as mentioned below:
      </p>

      <ul className='mt-4 flex flex-col gap-1 list-disc px-6'>
        <li>Education</li>
        <li>Environment and sustainable development including solar energy</li>
        <li>Health, safe drinking water and sanitation (including Hunger, Poverty, Malnutrition)</li>
        <li>Women and Child Development (including Gender Equality and Women Empowerment)</li>
        <li>National Heritage, Art and Culture</li>
        <li>Support to the differently abled</li>
        <li>Technology incubation</li>
        <li>Agriculture and Rural Development</li>
        <li>Skills development & Livelihood</li>
        <li>Slum area development</li>
        <li>Promotion of sports</li>
      </ul>



      <div className='mt-4 flex flex-col gap-2'>
        <h2 className='font-bold'>Why IIT Kharagpur?</h2>
        <p>
          IIT Kharagpur has 700+ strong faculty staff who are working in diverse areas of R&D in STEM, social sciences, interdisciplinary areas of national and global relevance. They are supported by 2000+ research fellows pursuing their doctoral studies and also 9000+ students undergoing R&D projects for Postgraduate and Undergraduate studies.
        </p>
      </div>


      <div className='mt-4 flex flex-col gap-2 ' >
        <h2 className='font-bold'>Our Facilities</h2>
        <ul  className=' flex flex-col gap-1 list-disc px-6'>
          <li>Equipped to develop and deploy technology and manage the pilot stage</li>
          <li>Involvement of domain experts, best-in-class laboratories and researchers</li>
          <li>Co-branding with an institute of national importance and availability of proper channel to deliver the projects</li>
          <li>Due diligence for Intellectual Property Rights, Research Output and Impact</li>
          <li>100% Tax exemption U/S 80G</li>
          <li>Select Naming Rights and Publicity</li>
        </ul>
      </div>
      <div className='mt-4 flex flex-col gap-2 '>
        <h2 className='font-bold'>Vision</h2>
        <p>Drive to an equitable and sustainable world through technology innovation, diversity and societal impact.</p>
    </div>


    <div className='mt-4 flex flex-col gap-2 '>
        <h2 className='font-bold'>Mission</h2>
        <ul className=' flex flex-col gap-1 list-disc px-6'>
            <li>To foster and promote technology innovation that will have a transformational impact on quality of life at the bottom of the pyramid</li>
            <li>To promote innovation and startups focusing on social and environmental challenges and solutions</li>
            <li>To facilitate affordable healthcare for all sections of the society</li>
            <li>To ensure holistic health and wellness in the IT community, and by extension, the youth of the nation, through focus on mental health and challenges of persons with disabilities</li>
            <li>To conserve and promote Indian classical art and heritage</li>
        </ul>
    </div>

    
    <div className='mt-4 flex flex-col gap-2 '>
        <p>Please contact <a href="mailto:anirban.biswas@adm.iitkgp.ac.in" className='cursor-pointer font-bold px-2'>anirban.biswas@adm.iitkgp.ac.in</a> / <a href="mailto:alumni@hijli.iitkgp.ac.in" className='cursor-pointer font-bold px-2'>alumni@hijli.iitkgp.ac.in</a></p>
    </div>
    </div>
  )
}

export default AlumniCSRCollaboration