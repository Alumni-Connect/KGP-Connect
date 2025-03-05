import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req:Request){
    try{
      const {formQuestions,...body}= await req.json()
     
      if (!body || Object.keys(body).length === 0) {
        return NextResponse.json(
          { msg: "We didn't receive any response from the client to proceed to create scholarships" },
          { status: 400 }
        );
      }
      console.log(body,...formQuestions)

     const scholarships=await prisma.scholarships.create({
           data:{
              ...body,
              formQuestions:{
                create:[
                    ...formQuestions
                ]
              }
           } 
     })
      
      if(!scholarships.id){
        return NextResponse.json({msg:"sorry db error occurred and we cannot proceed with request try again"},{status:400})
      }

      return NextResponse.json({msg:"successfully created Scholarship",id:scholarships.id},{status:200})
    }catch(e){
        console.log(e)
        return NextResponse.json({msg:"sorry we received some error this time"},{status:400})
    }
}


export async function PUT(req:Request){
    try{
       const {id,...updatedData}=await req.json()
       if(!id){
        return NextResponse.json({msg:"we didn't received any id from client to proceed to update the scholarships"},{status:400})
       }
       const updatedScholarships= await prisma.scholarships.update({
        where:{
            id,
        },

        data:{
            ...updatedData
        }
       })

       if(!updatedScholarships){
        return NextResponse.json({msg:"sorry db error occurred and we cannot proceed with request try again"},{status:400})
       }

       return NextResponse.json({msg:"successfully updated Scholarship",id:updatedScholarships.id},{status:200})

    }catch(e){
        console.log(e)
        return NextResponse.json({msg:"sorry we received some error this time"},{status:400})
    }
}



export async function DELETE(req:Request){
    try{
        const { searchParams } = new URL(req.url);
        const query = searchParams.get("scholarshipId");
        console.log(query)
        if(!query){
            return NextResponse.json({msg:"we didn't received any id from client to proceed to delete the scholarships"},{status:400})
        }

        const deletedScholarships=await  prisma.scholarships.delete({
            where:{
                id:query
            }
           })

           if(!deletedScholarships ){
            return NextResponse.json({msg:"sorry db error occurred and we cannot proceed with request try again"},{status:400})
           }
    
           return NextResponse.json({msg:"successfully deleted Scholarship"},{status:200})
    }catch(e){
        console.log(e)
        return NextResponse.json({msg:"sorry we received some error this time"},{status:400})
    }
}
