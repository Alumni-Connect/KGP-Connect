import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req:Request){
   try{
    const limit=10
    const url= new URL(req.url)
    const searchParams = new URLSearchParams(url.search);
    const body = searchParams.get("cursor")
    const filter= searchParams.get("filter")
    const filterArray= filter===null? undefined: filter.split(',') 
    console.log(filterArray)

    const cursor=body as string

    const firstScholarsip=await prisma.scholarships.findFirst({
      take: 1, // Limits to one result
      orderBy: {
        createdAt: "desc",
      },
    })
    
    const cursorObj= cursor==='0' ? {id:firstScholarsip!.id} : { id: cursor }

    let scholarships;
  if(filterArray){
     scholarships= await prisma.scholarships.findMany({
      where:{
        tags:{
          hasSome:filterArray
        }
      },
      skip:cursor==="0"? 0:1,
      take:limit,
      cursor:cursorObj,
      orderBy:{
        createdAt: "desc",

      }
    })
  }else{
    scholarships= await prisma.scholarships.findMany({
    
      skip:cursor==="0"? 0:1,
      take:limit,
      cursor:cursorObj,
      orderBy:{
        createdAt: "desc",

      }
    })
  }
    if(!scholarships){
      return NextResponse.json({msg:"sorry no response can be found at this time"},{status:400})
    }
    return NextResponse.json({scholarships,nextId: scholarships.length === limit ? scholarships[limit - 1].id : undefined},{status:200})

   }catch(e){
    console.log(e)
    return NextResponse.json({msg:"sorry error occurred while fetching the scholarships"},{status:400})
   }
}


export  async function POST(){
  try{
    const scholarships= await prisma.scholarships.findMany({
      select:{
        tags:true
      }
    })

   let resultantScholarship:string[]=[];

   scholarships.map((scholarship)=>{
     scholarship.tags.map((tag)=>{
         if(!resultantScholarship.find((scholar)=>scholar===tag)){
            resultantScholarship.push(tag)
         }
     })
   })
    
    if(!scholarships){
      return NextResponse.json({msg:"sorry no response can be found at this time"},{status:400})
    }
    return NextResponse.json({tags:resultantScholarship},{status:200})

   }catch(e){
    console.log(e)
    return NextResponse.json({msg:"sorry error occurred while fetching the scholarships"},{status:400})
   }
}
