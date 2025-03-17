"use server"
import {getScholarship,getAppliedScholarship} from "@/actions/scholarships";
import Scholarship from "@/components/scholarships/students.scholarships";
import Sidebar from "@/components/Sidebar";
import Header from "../../components/Nav";


export default async function Page() {

   const scholarships= await getScholarship()
   const appliedOnScholarships= await getAppliedScholarship()
  return (
    <div className="flex w-full bg-gray-100 px-44">
      <Header></Header>
  <Sidebar></Sidebar>
  <div className=" flex flex-col px-6 py-5 gap-6 mt-16 w-4/5">
    {/* <img src="https://static.wixstatic.com/media/400eca_2a34c721d9c74cef898ee2ded7b158bf~mv2.jpg/v1/fill/w_980,h_562,al_c/400eca_2a34c721d9c74cef898ee2ded7b158bf~mv2.jpg" className="w-full "></img> */}
    {/* <div className="absolute top-0 left-0 h-full w-full bg-[rgba(0,0,0,0.6)]"></div> */}
    
    {/* <div className=" flex flex-col gap-6 w-[60%] max-h-[500px] overflow-y-auto pr-3"> */}
     { scholarships.scholarship && scholarships.scholarship.map((scholarship)=>{
      
      const foundIndex=appliedOnScholarships?.findIndex((s)=> s.Scholarship.id===scholarship.id)
     console.log(foundIndex,appliedOnScholarships) 
      if(foundIndex!==undefined && foundIndex>=0 && appliedOnScholarships){
        const response  =appliedOnScholarships[foundIndex]?.id
        console.log(response)
      //check for the expiration
      if(scholarship.lastDate< new Date()){
        return
      }
      return(
      <Scholarship key={scholarship.id} scholarshipId={scholarship.id} eligibility={scholarship.criteria} description={scholarship.description} createdAt={scholarship.createdAt} createdBy={scholarship.createdBy} title={scholarship.title} applied={true} responseId={response}  lastDate={scholarship.lastDate}/>
      )
    }else{
      

      return(
        <Scholarship key={scholarship.id} scholarshipId={scholarship.id} eligibility={scholarship.criteria} description={scholarship.description} createdAt={scholarship.createdAt} lastDate={scholarship.lastDate} createdBy={scholarship.createdBy} title={scholarship.title} applied={false} responseId={undefined} />
        )
    }
     })}
      
    
      
    {/* </div> */}
  </div>
  </div>
  );
}