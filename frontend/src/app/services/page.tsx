
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Navbar from "@/components/Navbar"
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
const [isLoggedIn, setIsLoggedIn] = useState(false)
const [categoryName, setCategoryName] = useState("")

const searchParams = useSearchParams()
const categoryId = searchParams.get("category")

useEffect(() => {

const fetchServices = async () => {
    try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/services/viewServices${categoryId ? `?category=${categoryId}` : ""
            }`

        const res = await fetch(url)
        const data = await res.json()

        setServices(data.data)

        if (data.data.length > 0 && categoryId) {
            setCategoryName(data.data[0].category?.name || "")
        }
    } catch (error) {
        console.error("Error loading services:", error)
    } finally {
        setLoading(false)
    }
}

fetchServices()

}, [categoryId])

// 🔥 Loading
if (loading) {
return (
    <div className="bg-gray-100 min-h-screen">
        <Navbar />
        <div className="p-10">Loading services...</div>
    </div>
)
}

return (
<div className="bg-gray-100 min-h-screen">

    {/* Navbar */}
    <Navbar />

    {/* Container */}
    <div className="flex justify-center mt-10">

        <div className="w-[90%] max-w-6xl">

            {/* Heading */}
            <h1 className="text-2xl font-bold mb-6">
                {categoryId
                    ? `${categoryName}`
                    : "All Services"}
            </h1>

            {/* Empty */}
            {services.length === 0 ? (
                <div className="text-center text-gray-500 mt-20">
                    No services found 😢
                </div>
            ) : (

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

                    {services.map((service, index) => (

                        <div
                            key={service._id}
                            className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
                        >

                            {/* Image */}
                            <div className="relative w-full h-40">
                                <Image
                                    src={service.serviceImage || "/placeholder.jpg"}
                                    alt={service.title}
                                    fill
                                    className="object-cover"
                                />

                                {/* 🔥 Popular Badge */}
                                {index < 2 && (
                                    <span className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded">
                                        Popular
                                    </span>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-4">

                                <h2 className="font-semibold text-md">
                                    {service.title}
                                </h2>

                                {/* ⭐ Rating (fake UI for now) */}
                                {/* <div className="flex items-center gap-1 text-yellow-500 text-sm mt-1">
                                    ⭐ 4.5 <span className="text-gray-400 text-xs">(120)</span>
                                </div> */}

                                <p className="text-gray-500 text-xs mt-1">
                                    {service.duration} mins
                                </p>

                                <p className="font-semibold mt-2">
                                    ₹{service.price}
                                </p>

                                <span className="text-[10px] bg-gray-100 px-2 py-1 rounded mt-2 inline-block">
                                    {service.category?.name}
                                </span>

                                {/* Button */}
                                <button
                                    onClick={() => {
                                       window.location.href = "/login"
                                    }}
                                    className="w-full mt-4 bg-black text-white py-2 rounded-lg text-sm hover:bg-gray-800 transition"
                                >
                                    Book Now
                                </button>

                            </div>

                        </div>

                    ))}

                </div>
            )}

        </div>

    </div>

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