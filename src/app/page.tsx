"use client"
import { signOut, useSession } from "next-auth/react";

import Link from "next/link";
export default function Home() {

  const session=useSession()
  if(!session?.data?.user) return 
  (<div>Hello</div>)

  return (
    <div className="bg-red-500">
      <div className="flex items-center justify-around">
        <div>kgp Connect</div>
        <div>{session.data.user.id}</div>
    { session.data.user ?    
      <button type="submit" onClick={async()=>{
         signOut().then(()=>{
          console.log("signed out")
         })

      }} className="px-4 py-2 bg-blue-500 text-white rounded">
        logout
      </button>
   : <Link href="/login"></Link> }
      </div>
    </div>
  );
}
