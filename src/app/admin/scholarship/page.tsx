// import ScholarshipForm from "@/components/adminScholarship/scholarship.admin"


// export default function Page(){
//     return(
//         <div>
// <ScholarshipForm></ScholarshipForm>
//         </div>
//     )
// }

// File: app/page.tsx


"use client";
import { useState } from 'react';
import ScholarshipCreation from '@/components/adminScholarship/workExperienceForm';
import ProfileForm from '@/components/adminScholarship/ProfileForm';
import ProgressBar from '@/components/adminScholarship/ProgressBar';
import { CirclePlus } from 'lucide-react';


enum SchFormQuestion {
  RADIO,
  MULTIPLERADIO,
  BOOLEAN,
  TEXT
  }

type formQuestion ={
 type : SchFormQuestion,
 question : string,
 required : boolean,
 options: {id: number, text: string}[],
 isDropDown : boolean
}

export default function Home() {
  const startingQuestion : formQuestion={
    type : SchFormQuestion.MULTIPLERADIO,
    question :'',
    required: false,
    options: [{id: 1 , text: "Option 1" }],
    isDropDown : false
  }

  const [currentStep, setCurrentStep] = useState(2);
  const [formData, setFormData] = useState({
    // Work Experience form data
    title: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    description: '',
    criteria:[''],
    
    // Profile form data
   ...startingQuestion
  });
 

  const [question, setQuestion]= useState<formQuestion[]>([startingQuestion]);
  
  const addQuestionBar=()=>{
    setQuestion([...question,startingQuestion])
  }

  const removeQuestionBar=(indexToRemove : number)=>{
    setQuestion(question.filter((_,index)=> index!==indexToRemove))
  }

  const updateQuestionBar=(updateQues:formQuestion, index : number)=>{
    const newQuestion= [...question]
    newQuestion[index]=updateQues
    setQuestion(newQuestion)
  }

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    console.log("sjodj")
    setCurrentStep(prev => prev - 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 mt-12">
    <div className='flex justify-center items-end'>

      <div className="w-3/4  px-4">
        
      <ProgressBar currentStep={currentStep} totalSteps={2} />

        <div className={`bg-white rounded-lg shadow-md mt-6 p-6 ${currentStep===1? null : `flex items-center justify-center`}`}>
          {currentStep === 1 && (
            <ScholarshipCreation
              formData={formData} 
              updateFormData={updateFormData} 
              nextStep={nextStep} 
            />
          )}
          
          {currentStep === 2 && (
            <>
            <ProfileForm 
              formData={formData} 
              updateFormData={updateFormData} 
              prevStep={prevStep} 
              question={question}
              setQuestion={setQuestion}
              removeQuestionBar={removeQuestionBar}
              updateQuestionBar={updateQuestionBar}
              onSubmit={async () => {
                // Handle final form submission here
                try {
                  const response = await fetch('/api/submit-form', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                  });
                  
                  if (response.ok) {
                    alert('Form submitted successfully!');
                    // Reset form or redirect
                  } else {
                    const error = await response.json();
                    alert(`Error: ${error.message}`);
                  }
                } catch (error) {
                  console.error('Error submitting form:', error);
                  alert('Failed to submit form. Please try again.');
                }
              }}
            />
            
             </>
          )}
        </div>
        
      </div>
      <button onClick={addQuestionBar} className='h-10 w-10 bg-indigo-600 text-white rounded-lg flex flex-col items-center justify-center'>
        <CirclePlus></CirclePlus>
      </button>
      </div>
    </div>
  );
}