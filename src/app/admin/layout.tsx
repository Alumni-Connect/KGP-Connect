"use server";

import Sidebar from "@/components/admin/sideBar.admin";

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="flex w-full mt-16 min-h-screen">
      <Sidebar />
      <div className="flex-1 min-w-0">
        {children}
      </div>
    </div>
  );
};

export default layout;
