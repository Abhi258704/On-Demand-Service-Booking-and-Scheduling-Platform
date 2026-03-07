"use client"

import Link from "next/link"

export default function ServiceCategories() {

  const categories = [
    { name: "Plumbing", icon: "🔧" },
    { name: "Cleaning", icon: "🧹" },
    { name: "Electrical", icon: "💡" },
    { name: "AC Repair", icon: "❄️" },
    { name: "Painting", icon: "🎨" },
    { name: "Home Repair", icon: "🏠" }
  ]

  return (
    <section className="flex justify-center mt-16">

      {/* Card Container */}
      <div className="w-[90%] max-w-6xl bg-white shadow-xl rounded-2xl p-12">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            Popular Service Categories
          </h2>

          <p className="text-gray-500 mt-3">
            Choose from a wide range of professional home services
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">

          {categories.map((cat, index) => (
            <Link
              key={index}
              href={`/services?category=${cat.name}`}
              className="group bg-gray-50 hover:bg-gray-100 transition rounded-xl p-6 flex flex-col items-center justify-center shadow-sm hover:shadow-md"
            >
              {/* Icon */}
              <div className="text-4xl mb-3 group-hover:scale-110 transition">
                {cat.icon}
              </div>

              {/* Text */}
              <p className="text-gray-700 font-medium text-sm text-center">
                {cat.name}
              </p>
            </Link>
          ))}

        </div>

      </div>

    </section>
  )
}