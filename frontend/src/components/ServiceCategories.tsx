"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import API from "@/lib/api"

export default function ServiceCategories() {

  type Category = {
    _id: string
    name: string
    description?: string
    coverImage?: string
  }

  const [dbCategories, setDbCategories] = useState<Category[]>([])
  const [showMore, setShowMore] = useState(false)

  const defaultCategories = [
    { name: "Plumbing", icon: "🔧" },
    { name: "Cleaning", icon: "🧹" },
    { name: "Electrical", icon: "💡" },
    { name: "AC Repair", icon: "❄️" },
    { name: "Painting", icon: "🎨" },
    { name: "Home Repair", icon: "🏠" }
  ]

  useEffect(() => {
    API.get("/categories/view-categories")
      .then(res => setDbCategories(res.data.data))
      .catch(err => console.log(err))
  }, [])

  // 🔥 helper: match default → db category
  const getCategoryId = (name: string) => {
    const match = dbCategories.find((cat: any) => cat.name === name)
    return match?._id || ""
  }

  return (
    <section className="flex justify-center mt-16">
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

        {/* 🔥 Default Categories */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">

          {dbCategories.length > 0 &&
            defaultCategories.map((cat, index) => {
              const categoryId = getCategoryId(cat.name)

              return (
                <Link
                  key={index}
                  href={`/services?category=${categoryId}`}
                  className="group bg-gray-50 hover:bg-gray-100 transition rounded-xl p-6 flex flex-col items-center justify-center shadow-sm hover:shadow-md"
                >
                  <div className="text-4xl mb-3">
                    {cat.icon}
                  </div>

                  <p className="text-gray-700 text-sm text-center">
                    {cat.name}
                  </p>
                </Link>
              )
            })}

        </div>

        {/* 🔥 Explore More Button */}
        <div className="text-center">
          <button
            onClick={() => setShowMore(!showMore)}
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            {showMore ? "Show Less" : "Explore More"}
          </button>
        </div>

        {/* 🔥 DB Categories */}
        {showMore && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mt-10">

            {dbCategories.map((cat: any) => (
              <Link
                key={cat._id}
                href={`/services?category=${cat._id}`}
                className="group bg-gray-50 hover:bg-gray-100 transition rounded-xl p-6 flex flex-col items-center justify-center shadow-sm hover:shadow-md"
              >
                <div className="text-4xl mb-3">🛠️</div>

                <p className="text-gray-700 font-medium text-sm text-center">
                  {cat.name}
                </p>
              </Link>
            ))}

          </div>
        )}

      </div>
    </section>
  )
}