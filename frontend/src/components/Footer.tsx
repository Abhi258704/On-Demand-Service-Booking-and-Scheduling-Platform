"use client"

import Link from "next/link"

export default function Footer() {
  return (
    <footer className="flex justify-center mt-16 mb-8">

      {/* Footer Card */}
      <div className="w-[90%] max-w-6xl bg-white shadow-xl rounded-2xl px-10 py-10">

        <div className="grid md:grid-cols-3 gap-8">

          {/* Brand */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              ServiceHub
            </h2>
            <p className="text-gray-600 text-sm">
              Book trusted home services quickly and easily.
              Find professionals for cleaning, repairs, and more.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">
              Quick Links
            </h3>

            <div className="flex flex-col gap-2 text-gray-600 text-sm">
              <Link href="/" className="hover:text-black">Home</Link>
              <Link href="/services"
              className="hover:text-black">Services</Link>
              {/* <Link href="/categories" className="hover:text-black">Categories</Link> */}
              <Link href="/login"
              className="hover:text-black">My Bookings</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">
              Contact
            </h3>

            <p className="text-gray-600 text-sm">
              support@servicehub.com
            </p>

            <p className="text-gray-600 text-sm mt-2">
              +91 blah blah
            </p>
          </div>

        </div>

        {/* Bottom line */}
        <div className="border-t mt-8 pt-4 text-center text-gray-500 text-sm">
          © 2026 ServiceHub. All rights reserved.
        </div>

      </div>

    </footer>
  )
}