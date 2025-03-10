import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req:Request){
    try{
       const {ScholarshipId,formQuestions}=await req.json()

       if(!ScholarshipId){
        return NextResponse.json({msg:"we didn't received any id from client to proceed to update the FormQuestions"},{status:400})
       }
       const [updatedScholarships, updateFormQuestion] = await prisma.$transaction([
        prisma.formQuestion.deleteMany({
            where:{
                scholarShipId:ScholarshipId ,
            }
           }),

        prisma.scholarships.update({
            where:{
                id:ScholarshipId
            },
            data:{
                formQuestions:{
                   create:[
                    ...formQuestions
                   ]
                }
            }
           })
      ])
      
       if(!updateFormQuestion){
        return NextResponse.json({msg:"sorry db error occurred and we cannot proceed with request try again"},{status:400})
       }

       return NextResponse.json({msg:"successfully updated Scholarship",id:updateFormQuestion.id},{status:200})

    }catch(e){
        console.log(e)
        return NextResponse.json({msg:"sorry we received some error this time"},{status:400})
    }
}



