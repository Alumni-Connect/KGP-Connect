"use client"
import { signOut, useSession } from "next-auth/react";
import UserPage from "../components/UserPage"
export default function Home() {

  const session=useSession()
  if(!session?.data?.user) return <div>not logged in</div>

  return (
    <UserPage/>
  );
}
