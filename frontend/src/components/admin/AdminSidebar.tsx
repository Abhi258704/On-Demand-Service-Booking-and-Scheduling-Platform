"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"


export default function AdminSidebar() {

  const pathname = usePathname()

  const links = [
    { name: "Dashboard", href: "/admin/dashboard" },
    { name: "Categories", href: "/admin/categories" },
    { name: "Services", href: "/admin/services" },
    { name: "Bookings", href: "/admin/bookings" }
  ]

  return (
    <>

      <aside
         className="w-56 bg-white shadow-lg rounded-xl p-4 h-fit"
      >
        {/* Close button (mobile only)
        <button
          onClick={() => setOpen(false)}
          className="md:hidden mb-4 text-lg"
        >
          ✕
        </button> */}

        <h2 className="font-bold text-lg mb-6">
          Admin Panel
        </h2>

        <nav className="flex flex-col gap-3">

          {links.map((link) => (

            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-2 rounded-lg ${pathname === link.href
                  ? "bg-black text-white"
                  : "hover:bg-gray-100"
                }`}
            >
              {link.name}
            </Link>

          ))}

        </nav>
      </aside>

    </>
  )
}