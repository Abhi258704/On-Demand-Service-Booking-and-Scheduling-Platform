"use client"

import Link from "next/link"

export default function DashboardNavbar() {
  return (
    <div className="flex justify-center pt-6">

      <div className="w-[90%] max-w-6xl bg-white shadow-lg rounded-2xl px-8 py-4 flex justify-between items-center">

        <Link href="/" className="font-bold text-lg">
          ServiceHub
        </Link>

        <div className="flex items-center gap-6">

          <Link href="/dashboard/categories" className="text-gray-600 hover:text-black">
            Home
          </Link>

          <button className="bg-black text-white px-4 py-2 rounded-lg text-sm">
            Logout
          </button>

        </div>

      </div>

    </div>
  )
}