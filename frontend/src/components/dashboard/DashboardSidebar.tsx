"use client"

import Link from "next/link"
import { LayoutGrid, Calendar, User, LogOut, X } from "lucide-react"
import { useRouter } from "next/navigation"

interface Props {
  open: boolean
  setOpen: (value: boolean) => void
}

export default function DashboardSidebar({ open, setOpen }: Props) {

  const router = useRouter()

  const handleLogout = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/logout`, {
      method: "POST",
      credentials: "include"
    })

    router.push("/")
  }

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      <aside
        className={`fixed lg:static top-0 left-0 z-50 w-64 bg-white shadow-xl p-6 flex flex-col h-full transition-transform
        ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >

        {/* Mobile Close */}
        <div className="flex justify-between items-center mb-6 lg:hidden">
          <h2 className="font-semibold">Dashboard</h2>
          <button onClick={() => setOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <nav className="flex flex-col gap-2">

          <Link href="/dashboard/categories" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100">
            <LayoutGrid size={18}/>
            Categories
          </Link>

          <Link href="/dashboard/myBookings" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100">
            <Calendar size={18}/>
            My Bookings
          </Link>

          <Link href="/dashboard/profile" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100">
            <User size={18}/>
            Profile
          </Link>

        </nav>

        <button
          onClick={handleLogout}
          className="mt-auto flex items-center gap-3 p-2 rounded-lg text-red-500 hover:bg-red-50"
        >
          <LogOut size={18}/>
          Logout
        </button>

      </aside>
    </>
  )
}