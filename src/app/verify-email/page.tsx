// "use server"

// import { redirect } from "next/navigation"
// import { checkVerificationToken } from "../../../db/token"
// export default async function  CheckToken({ searchParams }: { searchParams: { token: string } }){

//     const token= searchParams.token

//         if(!token){
//         console.log("no token provided")
//         return
//         }

// const response=await checkVerificationToken(token)

//     if(response){
//         console.log(response)
//         redirect("/")
//     }else{
//         redirect("/login")
//     }

// }
