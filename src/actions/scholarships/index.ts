import {prisma}  from "@/lib/prisma";
import { getSession } from "../user";

export  async function getScholarship(){
    try{
        const scholarship=await prisma.scholarships.findMany({
            where:{
                isVerified:true
            },
            include:{ScholarshipForms:true},
        })
        
        if(!scholarship){
            return {msg:"no user is found with the given email id"}
        }
        return {msg:"user found",scholarship}
    }catch(e:any){
        return {msg:"error occured in db side"+e}
    }
}

export  async function getSpecificScholarship(id:string){
      try{
          const scholarship=await prisma.scholarships.findUnique({
              where:{
                  id
              },
              include:{formQuestions:true}

          })
          if(!scholarship){
              return {msg:"no user is found with the given email id"}
          }
          return {msg:"user found",scholarship}
      }catch(e:any){
          return {msg:"error occured in db side"+e}
      }
}

export async function getScholarshipByUser(id:string){
    try{
        const scholarship=await prisma.scholarships.findMany({
            where:{
               createdBy: id
            },
            include:{formQuestions:true}

        })
        if(!scholarship){
            return {msg:"no user is found with the given email id"}
        }
        return scholarship
    }catch(e:any){
        return {msg:"error occured in db side"+e}
    }
}


export async function getAppliedScholarship(){
  try{
    const session= await getSession()
    const studentAppliedOn= await prisma.scholarshipForm.findMany({
        where:{
            studentId: session?.user.id
        },
        select:{
            id:true,
            Scholarship:{
                select:{
                    id:true
                }
            }
        }
    })
    if(!studentAppliedOn){
        console.log("no user find with this id")
        return
    }

    return studentAppliedOn
  }catch(e){
    console.log(e)
    return 
  }
}


interface UserInfo {
    id: string;
    name: string;
    email: string;
    department: string;
    hall: string;
    rollNumber: string;
    curriculumVitae:string
    responses: {
      question: string;
      answer: string;
    }[];
  }




export  const paginatedResponses=async(page:number,limit:number,id:string)=>{
    try{
        console.log(id)
       const responses=await prisma.scholarshipForm.findMany({
        skip:(page-1)*limit,
        take:limit,
        where:{
            ScholarshipId:id
        },
        select:{
            
            id: true,
            name: true,
            email: true,
            Department: true,
            hall: true,
            rollNumber: true,
            curriculumVitae:true,
            formResponses:{
                select:{
                    answer:true,
                    linkedToFormQuestion:{
                       select:{
                        description:true
                       }
                    }
                }
            }
        }
       })

        console.log(responses)
       if(!responses) return undefined

       const cleanedResponses:UserInfo[] =[];
       responses.map((res)=>{
        cleanedResponses.push({
            id: res.id,
            name: res.name,
            email: res.email,
            department: res.Department,
            hall: res.hall,
            curriculumVitae: res.curriculumVitae,
            rollNumber: res.rollNumber,
            responses: res.formResponses.map(res=> { return {question: res.linkedToFormQuestion.description, answer:res.answer.join(',')}})
        })
       })
       return cleanedResponses
    }catch(e){
        console.log(e)
        return undefined
    }
}

export async function countScholarship(id:string){
    try{
      const count= await prisma.scholarshipForm.count({
        where:{
            ScholarshipId:id
        }
      })
      if(!id){
        return 0
      }
      return count
    }catch(e){
        console.log(e)
        return 0
    }
} 