"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"

export default function CategoriesPage() {

  const [categories, setCategories] = useState([])

  useEffect(() => {

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/categories/view-categories`)
      .then(res => res.json())
      .then(data => {
        setCategories(data.data)
      })

  }, [])

  return (
    <div>

      <h1 className="text-2xl font-bold mb-6">
        Categories
      </h1>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {categories.map((cat: any) => (

          <Link
            key={cat._id}
            href={`/dashboard/categories/${cat._id}`}
            className="group rounded-xl shadow hover:shadow-lg hover:-translate-y-1 transition overflow-hidden"
          >

            {/* Image Container */}
            <div className="relative w-full h-48">

              <Image
                src={cat.coverImage}
                alt={cat.name}
                fill
                 sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition duration-300 group-hover:scale-105"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>

              {/* Category Text */}
              <div className="absolute bottom-3 left-3 text-white">

                <h2 className="text-lg font-semibold">
                  {cat.name}
                </h2>

                <p className="text-sm text-gray-200">
                  {cat.description}
                </p>

              </div>

            </div>

          </Link>

        ))}

      </div>

    </div>
  )
}
