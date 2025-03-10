import { PlusCircle } from 'lucide-react';
import { useState } from 'react';
import { z } from 'zod';

const profileSchema = z.object({
  question: z.string().min(1, "Name is required"),
  options: z.array(
    z.object({
      id: z.number(),
      text: z.string().min(1, "Option text is required")
    })
  ).optional()
});

interface Props {
  formData: any;
  updateQuestionData: (data: any,index:number) => void;
  prevStep: () => void;
  onSubmit: () => void;
  question: formQuestion[]
  setQuestion: any;
  removeQuestionBar: (indexToRemove:number) => void;
  updateFormQuestionData: (data: any) => void;

}
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
 isDropDown: boolean
}


export default function QuestionForm({ formData, updateFormQuestionData,updateQuestionData, prevStep, onSubmit,question,setQuestion,removeQuestionBar }: Props) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const questionTypes = [
    'Boolean',
    'Paragraph',
    'Multiple Choice',
    'Single Choice'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,questionIndex:number) => {
    const { name, value } = e.target;
    updateQuestionData({ [name]: value },questionIndex);
  };
   const handleUpdateOptionsData=(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, questionIndex:number,optionIndex:number)=>{
    const transformedQuestion= [...question]
    transformedQuestion[questionIndex].options[optionIndex].text=e.target.value

     setQuestion(transformedQuestion)
   }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      updateFormQuestionData({"formQuestions": question})
      console.log(formData)
   //   profileSchema.parse(formData);
      setErrors({});
      onSubmit();
    } catch (error) {
      console.log(error)
      if (error instanceof z.ZodError) {
        const formattedErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path) {
            formattedErrors[err.path[0]] = err.message;
          }
        });
        setErrors(formattedErrors);
      }
    }
  };



 const increaseOption=(index:number)=>{
  console.log(index)
  const newOption= {
    id: question[index].options.length+1,
    text: "Option "+ (question[index].options.length+1)
  }
 setQuestion((prevQuestions:formQuestion[]) => {
  return prevQuestions.map((q:formQuestion, i) => 
      i === index ? { type:q.type, required: q.required, isDropDown: q.isDropDown, question: q.question, options: [...q.options,newOption] } : q
  );
});
 }



  const toggleDropdown = (index:number) => {
    setQuestion((prevQuestions:formQuestion[]) => {
      return prevQuestions.map((q:formQuestion, i) => 
          i === index ? { ...q, isDropDown: !q.isDropDown } : q
      );
  });  
  };
  
  const toggleRequired= (index:number)=>{
    setQuestion((prevQuestions:formQuestion[]) => {
      return prevQuestions.map((q:formQuestion, i) => 
          i === index ? { ...q, required: !q.required } : q
      );
  });  
  }
  const selectQuestionType = (type:string,index:number) => {
    // This is just the UI, no actual functionality
   // setSelectedQuestionType(type);
    let questionType;
    if(type==="Paragraph"){
      questionType=SchFormQuestion.TEXT
    }else if (type==="Multiple Choice"){
      questionType=SchFormQuestion.MULTIPLERADIO
    }else if (type==="Boolean"){
      questionType=SchFormQuestion.BOOLEAN
    }else{
      questionType=SchFormQuestion.RADIO
    }  

    setQuestion((prevQuestions:formQuestion[]) => {
      return prevQuestions.map((q:formQuestion, i) => 
          i === index ? { ...q, type:questionType,isDropDown: false } : q
      );
  }); 
  console.log(type,index,question)
  };

   const decreaseOption=(optionIndexToRemove: number,questionIndex: number)=>{
    const transformedQuestion= [...question]
    transformedQuestion[questionIndex].options=question[questionIndex].options.filter((_,index)=> index!==optionIndexToRemove)

    console.log(transformedQuestion)
     setQuestion(transformedQuestion)
   }

  return (
  
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-6">Quality information for the Scholarlships</h2>
      {question.map((ques:formQuestion,ind:number)=>(
      <div key={ind} className='mb-6'>
      <div className='mb-2'>

      <div className="w-[800px] mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="p-4 bg-gray-50 rounded-lg mb-4">
        <div className="flex justify-between items-start mb-6">
          <div className="w-full">
            <input
              name="question"
              value={ques.question}
              onChange={(e)=>{handleChange(e,ind)}}
              type="text"
              placeholder="Question"
              className="w-full text-lg font-medium bg-transparent border-b border-transparent hover:border-gray-300 focus:border-gray-500 focus:outline-none pb-1 transition-colors"
            />
          </div>
        </div>

        <div className="space-y-3">
          {ques.type!==SchFormQuestion.TEXT && ques.options.map((option, index) => (
            <div key={option.id} className="flex items-center">  
              <input
              onChange={(e)=>handleUpdateOptionsData(e,ind,index)}
                type="text"
                value={option.text}
                className="flex-grow bg-transparent border-b border-transparent hover:border-gray-300 focus:border-gray-500 focus:outline-none py-1 transition-colors"
                placeholder="option"
              />

              
              {index === ques.options.length - 1  && (
                <>
                 {index !== 0 && <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full" onClick={()=>{decreaseOption(index,ind)}}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>}

                <button 
                  className="ml-2 text-blue-600 text-indigo-600 hover:text-indigo-800"
                  onClick={()=>increaseOption(ind)}
                >
                 <PlusCircle></PlusCircle>
                </button></>
              )}
            </div>
          ))}
          
        </div>

        <div className="flex justify-between items-center mt-8">
          <div className="flex space-x-2">
           
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full" onClick={()=>{
             removeQuestionBar(ind)
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
          
          {/* Question Type Dropdown */}
          <div className="relative mr-auto ml-6">
            <button 
            type="button" 
              onClick={()=>{ toggleDropdown(ind)}}
              className="flex items-center px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none"
            >
              <span>{(ques.type===SchFormQuestion.BOOLEAN ? "Boolean":'') +(ques.type===SchFormQuestion.RADIO ? "Single choice":'')+(ques.type===SchFormQuestion.MULTIPLERADIO ? "Multiple Choice":'') + (ques.type===SchFormQuestion.TEXT? "Paragraph":'')}</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={ques.isDropDown ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}></path>
              </svg>
            </button>
            
            {ques.isDropDown && (
              <div className="absolute z-10 w-56 mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
                <ul className="py-1 overflow-auto max-h-60">
                  {questionTypes.map((type) => (
                    <li 
                      key={type}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => selectQuestionType(type,ind)}
                    >
                      {type}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Required</span>
            <div 
              className="relative inline-block w-10 h-5 transition duration-200 ease-in-out rounded-full cursor-pointer"
              onClick={()=>toggleRequired(ind)}
            >
              <div className={`absolute left-0 w-10 h-5 rounded-full transition-colors duration-200 ease-in-out ${ques.required ? 'bg-indigo-500' : 'bg-gray-300'}`}></div>
              <div 
                className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ease-in-out ${
                  ques.required ? 'transform translate-x-5' : 'translate-x-0.5'
                }`}
              ></div>
            
          </div>
          </div>
        </div>
      </div>
    </div>
    </div>
           
        
      </div>
        
     
      ))}
<div className="mt-6 flex justify-between"> 
        <button
          type="button"
          onClick={prevStep}
          className="px-4 py-2 border border-gray-300 text-sm rounded-md"
        >
          Previous
        </button>
        <div className="flex space-x-4">
         
          <button
            type="submit"
            className="px-4 py-2 bg-black text-white text-sm rounded-md hover:bg-gray-800"
          >
            Save
          </button>
          </div>
          </div>
        
    </form>
    
    
  );
}