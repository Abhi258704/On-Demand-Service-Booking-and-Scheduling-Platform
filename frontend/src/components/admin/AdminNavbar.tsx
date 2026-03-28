"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"


type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}


export default function AdminNavbar({ setOpen }: Props) {

  const router = useRouter()

  const handleLogout = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/logout`, {
      method: "POST",
      credentials: "include"
    })

    router.push("/") // redirect to landing page
  }

  return (
    <div className="flex justify-center pt-6">

      <div className="w-[90%] max-w-6xl bg-white shadow-lg rounded-2xl px-8 py-4 flex justify-between items-center">

        {/* Hamburger for mobile */} <button onClick={() => setOpen(true)} className="md:hidden text-2xl" > ☰ </button>

        <Link href="/" className="font-bold text-lg">
          ServiceHub
        </Link>

        <div className="flex items-center gap-6">

          <Link href="/admin/dashboard" className="text-gray-600 hover:text-black">
            Home
          </Link>

          <button
            onClick={handleLogout}
            className="bg-black text-white px-4 py-2 rounded-lg text-sm"
          >
            Logout
          </button>

        </div>

      </div>

    </div>
  )
}