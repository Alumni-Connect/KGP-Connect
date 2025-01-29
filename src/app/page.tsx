"use client"
import { signOut, useSession } from "next-auth/react";

import Link from "next/link";
export default function Home() {

  const session=useSession()
  if(!session?.data?.user) return <div>not logged in</div>

  return (
   <div></div>
  );
}
