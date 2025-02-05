"use client"
import { signIn } from "next-auth/react";
import { createToken } from "../../../utils/GenerateToken";
export default  function ChangePassword() {
    return(
        <div>
          <form action={async (formdata) => {
            
                const email  = formdata.get("email") as string;
                if(!email){
                    console.log("no email is provided")
                   
                }
                const token=await createToken(email)
                const response = await signIn("nodemailerForChangePassword", {
                    email,
                    callbackUrl:`http://localhost:3000/change-credentials?token=${token}`
                });
               
                }}
                className="space-y-6"
            >
                <div className="h-30 w-30 mt-40">
                <label className="block text-gray-700 font-medium mb-1">Email</label>
                <input
                    name="email"
                    type="email"
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
