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

export default function ServiceDetails() {

    const params = useParams()
    const serviceId = Array.isArray(params.id) ? params.id[0] : params.id

    const [service, setService] = useState<Service | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        async function fetchService() {
            try {

                const res = await fetch("http://localhost:8000/api/v1/services/viewServices")
                const data = await res.json()

                console.log("Services:", data.data)
                console.log("Service ID from URL:", serviceId)

                const foundService = data.data.find(
                    (s: Service) => String(s._id) === String(serviceId)
                )

                console.log("Found Service:", foundService)

                if (foundService) {
                    setService(foundService)
                }

            } catch (error) {
                console.error("Error loading service:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchService()

    }, [serviceId])


    if (loading) {
        return (
            <p className="text-gray-500">
                Loading service...
            </p>
        )
    }

    if (!service) {
        return (
            <p className="text-red-500">
                Service not found
            </p>
        )
    }

    return (
        <div>

            {/* Title */}
            <h1 className="text-2xl font-bold mb-6">
                {service.title}
            </h1>

            <div className="grid md:grid-cols-2 gap-8">

                {/* Image */}
                <div className="relative w-full h-64">

                    <Image
                        src={service.serviceImage}
                        alt={service.title}
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover rounded-xl"
                    />

                </div>

                {/* Info */}
                <div>

                    <p className="text-gray-600 mb-4">
                        {service.description}
                    </p>

                    <p className="text-lg font-semibold">
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