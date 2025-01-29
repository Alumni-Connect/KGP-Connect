"use client"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
export default function Login(){
  const router=useRouter()
    return(
        <div className="w-full flex items-center justify-between h-screen">
          <div className="w-1/2 h-full 96 flex items-center flex-col">
            <p className="font-sans text-5xl font-bold">kgp connect</p>
            <div className="flex items-center h-full">
            <p className="font-bold">Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis fuga odit asperiores autem temporibus? Nisi alias numquam sit accusantium, iste officiis ad minima rerum vero cum architecto, consequatur eius excepturi, id assumenda? Itaque repellendus earum fugit ex ut voluptatem cumque. Facere laborum, sequi qui temporibus dolorem deserunt veniam cupiditate quaerat!</p>
            </div>
          </div>
          <div className="w-1/2 h-full bg-indigo-200 flex items-center justify-center">
          <div className="w-[450px] bg-white text-black shadow-xl rounded-2xl">
            <div className="text-4xl font-bold text-center mt-4">Sign In</div>
            <div className="text-sm text-center mb-4">Don't have an account create one?</div>
          <form action={async (formdata)=>{
             const email=formdata.get("email")
             const password=formdata.get("password")
           const response=await signIn("credentials",{
            email,
            password
           ,redirect:false})
            console.log(email,password)
            if(response?.status==200){
              router.push("/")
            }
          }} className="flex flex-col ">
          <label className="text-black text-xl">
            <p className="mx-4">Email</p>
            <input name="email" type="email" className="m-4 p-2 border border-black rounded-xl w-[400px]"/>
          </label>
          <label className="text-black text-xl">
          <p className="mx-4">Password</p>
            <input name="password" type="password" className="m-4 p-2 border border-black rounded-xl w-[400px]"/>
          </label>
          <div className="flex justify-center m-4">         
             <button className="font-bold w-28 h-10 bg-red-400 rounded-lg text-white ">Sign In</button>
          </div>
            </form>
            </div>
            </div>
        </div>
    )
}
