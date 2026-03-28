"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

type Props = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AdminSidebar({ open, setOpen }: Props) {

  const pathname = usePathname()

  const links = [
    { name: "Dashboard", href: "/admin/dashboard" },
    { name: "Categories", href: "/admin/categories" },
    { name: "Services", href: "/admin/services" },
    { name: "Bookings", href: "/admin/bookings" }
  ]

  return (
    <>
      {/* Overlay for mobile */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      <aside
        className={`
    fixed md:static top-0 left-0 h-full w-56 bg-white shadow-lg p-4
    transform transition-transform duration-300 z-50
    ${open ? "translate-x-0" : "-translate-x-full"}
    md:translate-x-0
  `}
      >
        {/* Close button (mobile only) */}
        <button
          onClick={() => setOpen(false)}
          className="md:hidden mb-4 text-lg"
        >
          ✕
        </button>

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