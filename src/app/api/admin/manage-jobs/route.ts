import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET(req:Request){

try {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page");
    const limit= searchParams.get("limit")

    //   console.log("u[date",updateData)
      if (!page || !limit) {
        return NextResponse.json({ msg: "sorry page number is missing in the manage-job" }, { status: 400 });
      }
  
    //   console.log("validate",validUpdateData)
  
      const job = await prisma.job.findMany({
       skip: Number(page)*Number(limit),
       take: Number(limit),
       select:{
        title: true,
        id:true,
        company: true,
        location: true,
        isVerified: true
       }
      });

    
      if (!job) {
        return NextResponse.json({ msg: "No job found at last" }, { status: 404 });
      }
  
      return NextResponse.json({ msg: "User updated successfully", job }, { status: 200 });
  
    } catch (error) {
      return NextResponse.json({ msg: `Database error: ${error}` }, { status: 500 });
    }

}




export async function PATCH(req:Request){

    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
       
    
        //   console.log("u[date",updateData)
          if (!id) {
            return NextResponse.json({ msg: "sorry page number is missing in the manage-job" }, { status: 400 });
          }
      
        //   console.log("validate",validUpdateData)
      
          const job = await prisma.job.update({
            where:{
                id:id
            },
            data:{
                isVerified: true
            }
          })
    
      
          if (!job) {
            return NextResponse.json({ msg: "No job found at last" }, { status: 404 });
          }
      
          return NextResponse.json({ msg: "job updated successfully", job }, { status: 200 });
      
        } catch (error) {
          return NextResponse.json({ msg: `Database error: ${error}` }, { status: 500 });
        }
    
    }







    export async function DELETE(req:Request){

        try {
            const { searchParams } = new URL(req.url);
            const id = searchParams.get("id");
           
        
            //   console.log("u[date",updateData)
              if (!id) {
                return NextResponse.json({ msg: "sorry user id is missing in the manage-job" }, { status: 400 });
              }
          
            //   console.log("validate",validUpdateData)
          
              const job = await prisma.job.delete({
                where:{
                    id:id
                }
              })
        
          
              if (!job) {
                return NextResponse.json({ msg: "No job found at last" }, { status: 404 });
              }
          
              return NextResponse.json({ msg: "job deleted successfully", job }, { status: 200 });
          
            } catch (error) {
              return NextResponse.json({ msg: `Database error: ${error}` }, { status: 500 });
            }
        
        }