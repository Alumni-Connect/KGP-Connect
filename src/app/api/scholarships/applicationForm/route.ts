import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req:Request){
    try{
      const {formResponses,...body} = await req.json();
      
      const scholarshipForm= await prisma.scholarshipForm.create({
            data:{
               ...body,
               formResponses:{
                    create:[
                        ...formResponses
                    ]
               }
            }
      })

    //   const createFormResponse = await prisma.formResponses.createMany({
    //     data:[...formResponses]        
    //   })

      if(!scholarshipForm ){
        return NextResponse.json({msg:"sorry unable to create a scholarship form"},{status:400})
      }

      return NextResponse.json({msg:"your form response is successfully submitted", formResponses:scholarshipForm.id},{status:200})
    }catch(e){
        console.log(e)
        return NextResponse.json({msg:"sorry error occurred in the session please try again later"},{status:400})

    }
}


export async function PUT(req : Request){
    try{
      const {id,formResponses,scholarshipFormData} = await req.json()
     
     
      const [deletePreviousResponses, createNewFormResponse] = await prisma.$transaction([
      prisma.formResponses.deleteMany({
        where:{
            scholarshipFormId : id
        }
        }),
      prisma.scholarshipForm.update({
           where:{
            id:id
           },
           data:{
            ...scholarshipFormData,
            formResponses:{
                create:[
                    ...formResponses
                ]
            }
           }
        })
    ])

  if(!deletePreviousResponses && createNewFormResponse){
    return NextResponse.json({msg:"sorry unable to update a scholarship form"},{status:400})
  }

  return NextResponse.json({msg:"your form response is successfully updated", formResponses:createNewFormResponse },{status:200})
    }catch(e){
        console.log(e)
        return NextResponse.json({msg:"sorry error occurred in the session please try again later"},{status:400})

    }
}
