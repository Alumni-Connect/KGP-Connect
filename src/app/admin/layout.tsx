"use server"

import Sidebar from "@/components/admin/sideBar.admin";

const layout = ({ children,}: Readonly<{children: React.ReactNode;}>) => {
  return (
    <div className="flex w-full mt-16">
        <Sidebar></Sidebar>
        {children}
   </div>
)
}

export default layout
