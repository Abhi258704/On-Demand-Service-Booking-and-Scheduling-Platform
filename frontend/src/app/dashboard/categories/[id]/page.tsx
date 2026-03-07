"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

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

export default function CategoryServices() {

  const params = useParams()
  const categoryId = Array.isArray(params.id) ? params.id[0] : params.id

  const [services, setServices] = useState<Service[]>([])
  const [categoryName, setCategoryName] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    async function fetchServices() {

      try {

        const res = await fetch("http://localhost:8000/api/v1/services/viewServices")
        const data = await res.json()

        const filteredServices = data.data.filter(
          (service: Service) => String(service.category._id) === String(categoryId)
        )

        setServices(filteredServices)

        if (filteredServices.length > 0) {
          setCategoryName(filteredServices[0].category.name)
        }

      } catch (error) {
        console.error("Error loading services:", error)
      } finally {
        setLoading(false)
      }

    }

    fetchServices()

  }, [categoryId])


  if (loading) {
    return <p className="text-gray-500">Loading services...</p>
  }

  return (
    <div>

      {/* Title */}
      <h1 className="text-2xl font-bold mb-6">
        {categoryName ? `${categoryName} Services` : "Services"}
      </h1>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {services.map((service) => (

          <Link
            key={service._id}
            href={`/dashboard/services/${service._id}`}
            className="group bg-white rounded-xl shadow hover:shadow-lg hover:-translate-y-1 transition overflow-hidden"
          >

            {/* Image */}
            <div className="relative w-full h-40">

              <Image
                src={service.serviceImage}
                alt={service.title}
                fill
                sizes="(max-width:768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition duration-300"
              />

            </div>

            {/* Service Info */}
            <div className="p-4">

              <h2 className="font-semibold text-lg">
                {service.title}
              </h2>

              <p className="text-gray-500 text-sm">
                ₹{service.price}
              </p>

              <p className="text-gray-400 text-xs">
                Duration: {service.duration} mins
              </p>

            </div>

          </Link>

        ))}

      </div>

    </div>
  )
}