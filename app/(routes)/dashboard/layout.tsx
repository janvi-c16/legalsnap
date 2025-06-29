import React from "react";
import NavBar from "./_components/NavBar";

function DashboardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return(
        <div>
            <NavBar />
            <div className="px-10 md:px-20 lg:px-40 py-10">
                {children}
            </div>
        </div>
    )
  }

export default DashboardLayout