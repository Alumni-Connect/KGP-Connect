"use server"

import Sidebar from "@/components/admin/sideBar.admin";
import Header from "../../components/Nav";

const layout = ({ children,}: Readonly<{children: React.ReactNode;}>) => {
  return (
    <div className="flex w-full mt-16">
        <Header></Header>
        <Sidebar></Sidebar>
        {children}
   </div>
)
}

export default layout
