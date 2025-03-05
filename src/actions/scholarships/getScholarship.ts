import {prisma}  from "@/lib/prisma";

export default async function getScholarship(){

    const scholarship=await prisma.scholarships.findMany()
    return scholarship
}