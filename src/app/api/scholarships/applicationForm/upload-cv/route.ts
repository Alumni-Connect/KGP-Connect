import { NextResponse } from "next/server"
import {writeFile , unlink , mkdir} from "fs/promises"
import { join } from "path"
import { prisma } from "@/lib/prisma"

export async function POST(req:Request){
    try{
     const data= await req.formData()
     const cv = data.get("files-cv") as unknown as File
     const id = data.get("id") as unknown as string

     
     if(!cv && !id){
        return NextResponse.json({msg:"photo or id is not provided"},{status:400})
     }
    

     const scholarship=await prisma.scholarshipForm.findFirst({
        where:{
            id: id
        },
        select:{
            curriculumVitae:true,
            applicants:{
                select:{
                    email:true
                }
            }
        }
     })
    if(!scholarship?.applicants.email){
        return NextResponse.json({msg:"no user found with this id"},{status:400})
    }


     if(scholarship?.curriculumVitae){
        const filePath = join("./", "public",scholarship.curriculumVitae);

         await unlink(filePath);
     }
     const bytes= await cv.arrayBuffer()
     const buffer = Buffer.from(bytes)
     
     const dirPath = join("./", "public", "/scholarships-CV",`/${id}`);
     const filePath = join(dirPath, scholarship?.applicants.email+".pdf");
 
     // Ensure directory exists
     await mkdir(dirPath, { recursive: true });
 
     // Write file to the directory
     await writeFile(filePath, buffer);
        
     //update-scholarship
     const updateScholarship= await prisma.scholarshipForm.update({
        where:{
            id
        },
        data:{
            curriculumVitae: `/scholarships-CV/${id}/${scholarship.applicants.email}.pdf`
        }
     })
     
     return NextResponse.json({msg:"photo os appended",url:updateScholarship.curriculumVitae},{status:200})
    }catch(e){
        console.log(e)
        return NextResponse.json({msg:"sorry error encountered in the server side"}, {status:400})
    }
}

