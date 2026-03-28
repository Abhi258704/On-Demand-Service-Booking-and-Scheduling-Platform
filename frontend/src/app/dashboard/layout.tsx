"use client"

import { useState } from "react"
import DashboardNavbar from "@/components/dashboard/DashboardNavbar"
import DashboardSidebar from "@/components/dashboard/DashboardSidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const [open, setOpen] = useState(false)

  return (
    <main className="bg-gray-100 min-h-screen">

      {/* Navbar */}
      <DashboardNavbar setOpen={setOpen} />

      {/* Center container */}
      <div className="flex justify-center mt-10">

        <div className="w-[90%] max-w-6xl flex gap-6 items-stretch">

          {/* Sidebar */}
          <DashboardSidebar open={open} setOpen={setOpen} />

          {/* Main Content */}
          <div className="flex-1 bg-white shadow-xl rounded-2xl p-8 overflow-y-auto h-[75vh] no-scrollbar">
            {children}
          </div>

        </div>

      </div>

    </main>
  )
}