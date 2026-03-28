"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

type Service = {
  _id: string
  title: string
  description: string
  price: number
  duration: number
  serviceImage: string
}

export default function ServiceDetailsPage() {

  const params = useParams()
  const serviceId = params.id

  const [service, setService] = useState<Service | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    async function fetchService() {
      try {

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/services/viewServices`
        )

        const data = await res.json()

        const foundService = data.data.find(
          (s: Service) => s._id === serviceId
        )

        setService(foundService)

      } catch (error) {
        console.error("Error loading service:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchService()

  }, [serviceId])

  if (loading) {
    return <p className="text-gray-500">Loading service...</p>
  }

  if (!service) {
    return <p className="text-red-500">Service not found</p>
  }

  return (
    <div className="max-w-5xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">
        {service.title}
      </h1>

      <div className="grid md:grid-cols-2 gap-10">

        {/* Service Image */}
        <div className="relative w-full h-80">

          <Image
            src={service.serviceImage}
            alt={service.title}
            fill
            className="object-cover rounded-xl"
          />

        </div>

        {/* Service Info */}
        <div>

          <p className="text-gray-600 mb-4">
            {service.description}
          </p>

          <p className="text-2xl font-semibold mb-2">
            ₹{service.price}
          </p>

          <p className="text-gray-500 mb-6">
            Duration: {service.duration} minutes
          </p>

          <Link
            href={`/dashboard/services/${service._id}/book`}
            className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Book Service
          </Link>

        </div>

      </div>

    </div>
  )
}