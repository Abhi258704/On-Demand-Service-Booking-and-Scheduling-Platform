"use client"

import Link from "next/link"
import { LayoutGrid, Calendar, User, LogOut } from "lucide-react"

export default function DashboardSidebar() {
  return (
    <aside className="w-64 bg-white shadow-xl rounded-2xl p-6 flex flex-col h-[75vh]">

      {/* Top */}
      <div>

        <h2 className="text-lg font-semibold mb-6">
          Dashboard
        </h2>

        <nav className="flex flex-col gap-2">

          <Link
            href="/dashboard/categories"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100"
          >
            <LayoutGrid size={18} />
            Categories
          </Link>

          <Link
            href="/dashboard/myBookings"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100"
          >
            <Calendar size={18} />
            My Bookings
          </Link>

          <Link
            href="/dashboard/profile"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100"
          >
            <User size={18} />
            Profile
          </Link>

        </nav>

      </div>

      {/* Logout */}
      <button className="mt-auto flex items-center gap-3 p-2 rounded-lg text-red-500 hover:bg-red-50">
        <LogOut size={18} />
        Logout
      </button>

    </aside>
  )
}