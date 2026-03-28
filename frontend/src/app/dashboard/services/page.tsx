


import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Suspense } from "react"

type Service = {
  _id: string
  title: string
  description: string
  price: number
  duration: number
  serviceImage: string
  category: {
    _id: string
    name: string
  }
}

function ServicesPageContent() {
  "use client"

  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  const searchParams = useSearchParams()
  const categoryId = searchParams.get("category")

  useEffect(() => {

    async function fetchServices() {
      try {

        const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/services/viewServices${
          categoryId ? `?category=${categoryId}` : ""
        }`

        const res = await fetch(url)
        const data = await res.json()

        setServices(data.data)

      } catch (error) {
        console.error("Error loading services:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchServices()

  }, [categoryId])

  // 🔥 Loading State
  if (loading) {
    return (
      <div className="p-10">
        <p className="text-gray-500">Loading services...</p>
      </div>
    )
  }

  return (
    <div className="p-10">

      {/* 🔥 Heading */}
      <h1 className="text-2xl font-bold mb-6">
        {categoryId ? "Filtered Services" : "All Services"}
      </h1>

      {/* 🔥 Empty State */}
      {services.length === 0 ? (
        <div className="text-center text-gray-500 mt-20">
          <p>No services found for this category 😢</p>

          <Link
            href="/services"
            className="mt-4 inline-block text-blue-600 underline"
          >
            View All Services
          </Link>
        </div>
      ) : (

        <div className="grid md:grid-cols-3 gap-6">

          {services.map((service) => (

            <Link
              key={service._id}
              href={`/dashboard/services/${service._id}`}
              className="border rounded-xl overflow-hidden hover:shadow-lg transition"
            >

              {/* Image */}
              <div className="relative w-full h-48">

                <Image
                  src={service.serviceImage || "/placeholder.jpg"}
                  alt={service.title}
                  fill
                  className="object-cover"
                />

              </div>

              {/* Content */}
              <div className="p-4">

                <h2 className="font-semibold text-lg">
                  {service.title}
                </h2>

                <p className="text-gray-500 text-sm mt-1">
                  {service.duration} minutes
                </p>

                <p className="font-semibold mt-2">
                  ₹{service.price}
                </p>

                {/* Category Tag */}
                <span className="inline-block mt-2 text-xs bg-gray-200 px-2 py-1 rounded">
                  {service.category?.name}
                </span>

              </div>

            </Link>

          ))}

        </div>
      )}

    </div>
  )
}

export default function ServicesPage() {
  return (
    <Suspense fallback={<div className="p-10">Loading...</div>}>
      <ServicesPageContent />
    </Suspense>
  )
}