import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET(req:Request){

try {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page");
    const limit= searchParams.get("limit")

    //   console.log("u[date",updateData)
      if (!page || !limit) {
        return NextResponse.json({ msg: "sorry page number is missing in the manage-user" }, { status: 400 });
      }
  
    //   console.log("validate",validUpdateData)
  
      const user = await prisma.user.findMany({
       skip: Number(page)*Number(limit),
       take: Number(limit),
       select:{
        id:true,
        name:true,
        email:true,
        isVerified:true,
        emailVerified:true
       }
      });

  
      if (!user) {
        return NextResponse.json({ msg: "No user found at last" }, { status: 404 });
      }
  
      return NextResponse.json({ msg: "User updated successfully", user }, { status: 200 });
  
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
            return NextResponse.json({ msg: "sorry page number is missing in the manage-user" }, { status: 400 });
          }
      
        //   console.log("validate",validUpdateData)
      
          const user = await prisma.user.update({
            where:{
                id:id
            },
            data:{
                isVerified: true
            }
          })
    
      
          if (!user) {
            return NextResponse.json({ msg: "No user found at last" }, { status: 404 });
          }
      
          return NextResponse.json({ msg: "User updated successfully", user }, { status: 200 });
      
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
                return NextResponse.json({ msg: "sorry user id is missing in the manage-user" }, { status: 400 });
              }
          
            //   console.log("validate",validUpdateData)
          
              const user = await prisma.user.delete({
                where:{
                    id:id
                }
              })
        
          
              if (!user) {
                return NextResponse.json({ msg: "No user found at last" }, { status: 404 });
              }
          
              return NextResponse.json({ msg: "User deleted successfully", user }, { status: 200 });
          
            } catch (error) {
              return NextResponse.json({ msg: `Database error: ${error}` }, { status: 500 });
            }
        
        }