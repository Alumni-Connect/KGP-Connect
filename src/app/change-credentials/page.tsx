"use client"
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import {useRouter} from "next/navigation";

export default function ChangePassword() {
    const searchParams=useSearchParams()
    const router=useRouter()
    const token=searchParams.get("token")
    const session= useSession()
    console.log(token)

    return(
        <div>
          <form
                action={async (formdata) => {
                const email = session.data?.user?.email
                const password = formdata.get("password")
                const changePassword = formdata.get("changePassword")
                if(password!=changePassword){
                    return
                }
                const response= await fetch("http://localhost:3000/api/user/change-credentials",{
                    method: "POST",
                    body: JSON.stringify({email,token,password})
                })
                console.log(response)
                const ans= await response.json()
                console.log(ans)
                if(ans.status==200){
                    router.push("/")
                }
                
                }}
                className="space-y-6"
            >

                <div className="h-30 w-30 mt-40">
                <label className="block text-gray-700 font-medium mb-1">Password</label>
                <input
                    name="password"
                    type="password"
                    className="w-full px-4 py-3 rounded-xl text-gray-900 bg-gray-50 border-none focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-200"
                    placeholder="Enter your email"
                />
                </div>

                <div className="h-30 w-30 mt-40">
                <label className="block text-gray-700 font-medium mb-1">Change Password</label>
                <input
                    name="changePassword"
                    type="changePassword"
                    className="w-full px-4 py-3 rounded-xl text-gray-900 bg-gray-50 border-none focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-200"
                    placeholder="Enter your email"
                />
                </div>
          
              
                <button
                type="submit"
                className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all duration-200 animate-fade-in-up animation-delay-600"
                >
                Sign In
                </button>
            </form>
            </div>
)
}
