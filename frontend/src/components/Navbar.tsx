"use client"

import Link from "next/link"

export default function Navbar() {
  return (
    <div className="sticky top-0 z-50 flex justify-center pt-6">

      <nav className="w-[90%] max-w-6xl bg-white shadow-lg rounded-2xl px-8 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-gray-800">
          ServiceHub
        </Link>

        {/* Links */}
        <div className="hidden md:flex gap-8 text-gray-600 font-medium">
          <Link href="/" className="hover:text-black transition">
            Home
          </Link>

          {/* ✅ FIXED */}
          <Link href="/services" className="hover:text-black transition">
            Services
          </Link>

          {/* Optional */}
          {/* <Link href="/categories" className="hover:text-black transition">
            Categories
          </Link> */}

          {/* Later you can protect this */}
          <Link href="/login" className="hover:text-black transition">
            Bookings
          </Link>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-gray-700 font-medium hover:text-black"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Sign Up
          </Link>
        </div>

      </nav>

    </div>
  )
}