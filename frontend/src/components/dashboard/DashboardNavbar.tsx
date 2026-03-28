"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Menu } from "lucide-react"

interface Props {
  setOpen: (value: boolean) => void
}

export default function DashboardNavbar({ setOpen }: Props) {

  const router = useRouter()

  const handleLogout = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/logout`, {
      method: "POST",
      credentials: "include"
    })

    router.push("/")
  }

  return (
    <div className="flex justify-center pt-6">

      <div className="w-[90%] max-w-6xl bg-white shadow-lg rounded-2xl px-6 py-4 flex justify-between items-center">

        {/* Hamburger */}
        <button
          onClick={() => setOpen(true)}
          className="lg:hidden"
        >
          <Menu size={24}/>
        </button>

        <Link href="/" className="font-bold text-lg">
          ServiceHub
        </Link>

        <button
          onClick={handleLogout}
          className="bg-black text-white px-4 py-2 rounded-lg text-sm"
        >
          Logout
        </button>

      </div>

    </div>
  )
}