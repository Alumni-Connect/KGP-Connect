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
import {ScholarshipCreation} from '@/components/adminScholarship/workExperienceForm';
import ProfileForm from '@/components/adminScholarship/ProfileForm';
import ProgressBar from '@/components/adminScholarship/ProgressBar';
import { CirclePlus } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
enum SchFormQuestion {
  RADIO="RADIO",
  MULTIPLERADIO="MULTIPLERADIO",
  BOOLEAN="BOOLEAN",
  TEXT="TEXT"
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
  const session= useSession()
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Work Experience form data
    title: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    description: '',
    criteria:[''],
    
    // Profile form data
   formQuestions:[startingQuestion]
  });
  const router=useRouter()
 

  const [question, setQuestion]= useState<formQuestion[]>([startingQuestion]);
  
  const addQuestionBar=()=>{
    setQuestion([...question,startingQuestion])
  }

  const removeQuestionBar=(indexToRemove : number)=>{
    setQuestion(question.filter((_,index)=> index!==indexToRemove))
  }



  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const updateQuestionData= (data: Partial<formQuestion>,index:number) => {
    console.log(data)
    setQuestion((prev:formQuestion[]) => {
      return prev.map((q:formQuestion, i) => 
        i === index ? { ...q,...data } : q
    );
    });
  }

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
              updateQuestionData={updateQuestionData} 
              prevStep={prevStep} 
              question={question}
              setQuestion={setQuestion}
              removeQuestionBar={removeQuestionBar}
              onSubmit={async () => {
                // Handle final form submission here
                function convertToDateTime(dateStr: string): Date {
                  const [day, month, year] = dateStr.split("-").map(Number);
                  const fullYear = year < 50 ? 2000 + year : 1900 + year; // Adjust year based on assumption
                  return new Date(fullYear, month - 1, day); // Months are 0-based
              }
                try {
                  const queryFormQuestion=formData.formQuestions.map((question)=> { 
                    return {
                      description:question.question,
                      type:question.type, 
                      required: question.required,
                      options: question.options.map(option=> {return option.text.includes("Option")? '': option.text}) 
                    }})
                  const query={
                    title:formData.title,
                    description:formData.description,
                    criteria:formData.criteria,
                    createdBy: session.data?.user.id,
                    lastDate: convertToDateTime(formData.endDate),
                    formQuestions: queryFormQuestion
                  }
                  const response = await fetch('/api/scholarships/adminsOperation', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      ...query
                    }),
                  });
                  
                  if (response.ok) {
                   
                    console.log("done")
                    router.push("/admin")
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
      {currentStep===2 && <button onClick={addQuestionBar} className='h-10 w-10 bg-indigo-600 text-white rounded-lg flex flex-col items-center justify-center'>
        <CirclePlus></CirclePlus>
      </button>}
      </div>
    </div>
  );
}