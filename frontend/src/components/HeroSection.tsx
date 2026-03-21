"use client"

import Link from "next/link"

export default function HeroSection() {
  return (
    <div className="flex justify-center mt-10">

      <section className="w-[90%] max-w-6xl bg-white shadow-xl rounded-2xl px-12 py-20 text-center">

        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Book Trusted Services Near You
        </h1>

        <p className="text-gray-600 text-lg mb-10 max-w-2xl mx-auto">
          Find professional services like plumbing, cleaning, repairs and more.
          Schedule appointments instantly with trusted providers.
        </p>

        <div className="flex justify-center gap-6">

          <Link
            href="/services"
            className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition"
          >
            Explore Services
          </Link>

        </div>

      </section>

    </div>
  )
}