import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { title } from "process";


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
  
      const post = await prisma.post.findMany({
       skip: Number(page)*Number(limit),
       take: Number(limit),
       select:{
        id:true,
        title: true,
        author:{
          select:{
            name:true
          }
        },
        createdAt: true,
        isVerified: true
       }
      });

      if (!post) {
        return NextResponse.json({ msg: "No user found at last" }, { status: 404 });
        }
        
      const reqPost= post.map((p)=> ({
        id: p.id,
        author: p.author.name,
        createdAt: p.createdAt,
        isVerified: p.isVerified,
        title:p.title
      }))
        console.log(post)
   
  
      return NextResponse.json({ msg: "User updated successfully", post:reqPost }, { status: 200 });
  
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
            return NextResponse.json({ msg: "sorry page number is missing in the manage-post" }, { status: 400 });
          }
      
        //   console.log("validate",validUpdateData)
      
          const post = await prisma.post.update({
            where:{
                id:id
            },
            data:{
                isVerified: true
            }
          })
    
      
          if (!post) {
            return NextResponse.json({ msg: "No post found at last" }, { status: 404 });
          }
      
          return NextResponse.json({ msg: "post updated successfully", post }, { status: 200 });
      
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
          
              const post = await prisma.post.delete({
                where:{
                    id:id
                }
              })
        
          
              if (!post) {
                return NextResponse.json({ msg: "No post found at last" }, { status: 404 });
              }
          
              return NextResponse.json({ msg: "post deleted successfully", post }, { status: 200 });
          
            } catch (error) {
              return NextResponse.json({ msg: `Database error: ${error}` }, { status: 500 });
            }
        
        }