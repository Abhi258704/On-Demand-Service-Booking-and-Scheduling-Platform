"use client"

import { useState } from "react"

import AdminSidebar from "@/components/admin/AdminSidebar"
import AdminNavbar from "@/components/admin/AdminNavbar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const [open, setOpen] = useState(false)


  return (
    <main className="bg-gray-100 min-h-screen flex flex-col">

      <AdminNavbar  setOpen={setOpen}/>

      <div className="flex flex-1 overflow-hidden justify-center">

        <div className="w-[90%] max-w-7xl flex gap-6 py-6">

          <AdminSidebar open={open} setOpen={setOpen}/>

          <div className="flex-1 bg-white shadow-xl rounded-2xl p-8 overflow-y-auto no-scrollbar">
            {children}
          </div>

        </div>

      </div>

    </main>
  )
}
