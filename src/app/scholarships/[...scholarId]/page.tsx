"use server"
import ScholarshipId from "@/components/scholarships/scholarshipWithId.scholarship";
import { prisma } from "@/lib/prisma";

export default async function ScholarshipWithId({params}:{ params: { scholarId: string[] };}){
  const  scholarId  = params.scholarId[0];
  const scholarship=await prisma.scholarships.findFirst({
    where:{
      id:scholarId
    }
  })
  if(!scholarship){
    return <div>...loading</div>
  }
     return(
    <ScholarshipId scholarship={scholarship}></ScholarshipId>
  )
}