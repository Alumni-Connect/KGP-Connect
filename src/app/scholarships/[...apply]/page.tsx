"use server"


import { getSpecificScholarship } from "@/actions/scholarships";
import { getUser } from "@/actions/user";
import ApplicationForm from "@/components/scholarships/apply.scholarships";

export default async function applyScholarship({ params }: { params: { apply: string } }){
    const { apply } = params; 

    const session= await getUser()
    const scholarship = await getSpecificScholarship(apply[1])
  
    function onSubmit(data:any){
      
    }
    return(
        <ApplicationForm user={session?.user} scholarship={scholarship} ></ApplicationForm>
    )
}