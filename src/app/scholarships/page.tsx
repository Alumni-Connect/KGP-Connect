"use server"
import getScholarship from "@/actions/scholarships/getScholarship";
import Scholarship from "@/components/scholarships/students.scholarships";
import Sidebar from "@/components/scholarships/sidebar.scholarships";


export default async function Page() {

   const scholarships= await getScholarship()

  return (
    <div className="flex w-full">
  <Sidebar></Sidebar>
  <div className=" flex flex-col px-6 py-5 gap-6 mt-16 w-4/5">
    {/* <img src="https://static.wixstatic.com/media/400eca_2a34c721d9c74cef898ee2ded7b158bf~mv2.jpg/v1/fill/w_980,h_562,al_c/400eca_2a34c721d9c74cef898ee2ded7b158bf~mv2.jpg" className="w-full "></img> */}
    {/* <div className="absolute top-0 left-0 h-full w-full bg-[rgba(0,0,0,0.6)]"></div> */}
    
    {/* <div className=" flex flex-col gap-6 w-[60%] max-h-[500px] overflow-y-auto pr-3"> */}
     {scholarships.map((scholarship)=>{
      return(
      <Scholarship eligibility={scholarship.criteria} description={scholarship.description} createdAt={scholarship.createdAt} createdBy={scholarship.createdBy} title={scholarship.title}/>
      )
     })}
      
    
      
    {/* </div> */}
  </div>
  </div>
  );
}