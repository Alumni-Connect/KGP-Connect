import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const scholarships = await prisma.scholarships.findMany();

    if (!scholarships) {
      return NextResponse.json(
        { msg: "sorry no response can be found at this time" },
        { status: 400 },
      );
    }
    return NextResponse.json(
      {
        scholarships,
        msg: "hey there your shcolarhsip is already createed try to manage it in a way more thna it is requeriredd",
      },
      { status: 200 },
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { msg: "sorry error occurred while fetching the scholarships" },
      { status: 400 },
    );
  }
}

// export  async function POST(){
//   try{
//     const scholarships= await prisma.scholarships.findMany({
//       select:{
//         tags:true
//       }
//     })

//    let resultantScholarship:string[]=[];

//    scholarships.map((scholarship)=>{
//      scholarship.tags.map((tag)=>{
//          if(!resultantScholarship.find((scholar)=>scholar===tag)){
//             resultantScholarship.push(tag)
//          }
//      })
//    })

//     if(!scholarships){
//       return NextResponse.json({msg:"sorry no response can be found at this time"},{status:400})
//     }
//     return NextResponse.json({tags:resultantScholarship},{status:200})

//    }catch(e){
//     console.log(e)
//     return NextResponse.json({msg:"sorry error occurred while fetching the scholarships"},{status:400})
//    }
// }
