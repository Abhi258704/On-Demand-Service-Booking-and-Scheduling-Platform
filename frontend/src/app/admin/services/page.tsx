"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"

type Category = {
    _id: string
    name: string
}

type Service = {
    _id: string
    title: string
    description?: string
    price: number
    duration: number
    category: Category
    serviceImage: string
}

export default function AdminServices() {

    const [services, setServices] = useState<Service[]>([])
    const [categories, setCategories] = useState<Category[]>([])

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [duration, setDuration] = useState("")
    const [category, setCategory] = useState("")
    const [image, setImage] = useState<File | null>(null)

    const [editingId, setEditingId] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const [showForm, setShowForm] = useState(false)

    const [showModal, setShowModal] = useState(false)

    const fileInputRef = useRef<HTMLInputElement>(null)

    

    // Fetch services
    const fetchServices = async () => {

        const res = await fetch(
            "http://localhost:8000/api/v1/services/viewServices",
            { credentials: "include" }
        )

        const data = await res.json()
        setServices(data.data)
    }

    // Fetch categories
    const fetchCategories = async () => {

        const res = await fetch(
            "http://localhost:8000/api/v1/categories/view-categories",
            { credentials: "include" }
        )

        const data = await res.json()
        setCategories(data.data)
    }

    useEffect(() => {
        fetchServices()
        fetchCategories()
    }, [])

    // Create / Update service
    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault()
        setLoading(true)

        try {

            const formData = new FormData()

            formData.append("title", title)
            formData.append("description", description)
            formData.append("price", price)
            formData.append("duration", duration)
            formData.append("category", category)

            if (image) {
                formData.append("serviceImage", image)
            }

            if (editingId) {

                await fetch(
                    `http://localhost:8000/api/v1/services/update/${editingId}`,
                    {
                        method: "PATCH",
                        credentials: "include",
                        body: formData
                    }
                )

            } else {

                const res = await fetch(
                    "http://localhost:8000/api/v1/services/create",
                    {
                        method: "POST",
                        credentials: "include",
                        body: formData
                    }
                )

                const data = await res.json()

                if (!res.ok) {
                    setError(data.message || "Error creating service")
                    return
                }
            }

            setTitle("")
            setDescription("")
            setPrice("")
            setDuration("")
            setCategory("")
            setImage(null)
            setEditingId(null)
            

            if (fileInputRef.current) {
                fileInputRef.current.value = ""
            }

            fetchServices()
            setShowModal(false)

        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    // Edit
    const handleEdit = (service: Service) => {

        setTitle(service.title)
        setDescription(service.description || "")
        setPrice(String(service.price))
        setDuration(String(service.duration))
        setCategory(service.category._id)

        setEditingId(service._id)
        setShowModal(true)
    }

    // Delete
    const deleteService = async (id: string) => {

        await fetch(
            `http://localhost:8000/api/v1/services/delete/${id}`,
            {
                method: "DELETE",
                credentials: "include"
            }
        )

        fetchServices()
    }

    return (

        <div>

            <div className="flex justify-between items-center mb-6">

                <h1 className="text-2xl font-bold">
                    Manage Services
                </h1>

                <button
                    onClick={() => {
                        setShowModal(true)
                        setEditingId(null)
                    }}
                    className="bg-black text-white px-4 py-2 rounded-lg"
                >
                    + Create Service
                </button>

            </div>

            {/* Error Popup */}

            {error && (
                <div className="fixed top-6 right-6 bg-red-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-4 z-50">

                    <span>{error}</span>

                    <button
                        onClick={() => {
                            setError(null)
                        }}
                        className="font-bold"
                    >
                        ✕
                    </button>

                </div>
            )}



            {/* Services Grid */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {services.map((service) => (

                    <div
                        key={service._id}
                        className="rounded-xl shadow hover:shadow-lg overflow-hidden"
                    >

                        <div className="relative w-full h-48">

                            <Image
                                src={service.serviceImage}
                                alt={service.title}
                                fill
                                sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                                loading="eager"
                                className="object-cover"
                            />

                            <div className="absolute inset-0 bg-black/40"></div>

                            <div className="absolute bottom-3 left-3 text-white">

                                <h2 className="font-semibold text-lg">
                                    {service.title}
                                </h2>

                                <p className="text-sm">
                                    ₹{service.price} • {service.duration} min
                                </p>

                                <p className="text-xs text-gray-200">
                                    {service.category?.name}
                                </p>

                            </div>

                        </div>

                        {/* Admin Actions */}

                        <div className="flex justify-between p-3">

                            <button
                                onClick={() => handleEdit(service)}
                                className="text-blue-600"
                            >
                                Edit
                            </button>

                            <button
                                onClick={() => deleteService(service._id)}
                                className="text-red-600"
                            >
                                Delete
                            </button>

                        </div>

                    </div>

                ))}

            </div>

            {showModal && (

                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

                    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg relative">

                        {/* Close Button */}

                        <button
                            onClick={() => {
                                setTitle("")
                                setDescription("")
                                setPrice("")
                                setDuration("")
                                setCategory("")
                                setShowModal(false)
                            }}
                            className="absolute top-3 right-3 text-gray-500"
                        >
                            ✕
                        </button>

                        <h2 className="text-xl font-semibold mb-4">

                            {editingId ? "Update Service" : "Create Service"}

                        </h2>

                        <form
                            onSubmit={(e) => {
                                handleSubmit(e)
                                
                            }}
                            className="flex flex-col gap-4"
                        >

                            <input
                                placeholder="Service title"
                                className="border p-2 rounded"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />

                            <input
                                placeholder="Description"
                                className="border p-2 rounded"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />

                            <input
                                type="number"
                                placeholder="Price"
                                className="border p-2 rounded"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />

                            <input
                                type="number"
                                placeholder="Duration (minutes)"
                                className="border p-2 rounded"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                            />

                            <select
                                className="border p-2 rounded"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >

                                <option value="">Select Category</option>

                                {categories.map((cat) => (
                                    <option key={cat._id} value={cat._id}>
                                        {cat.name}
                                    </option>
                                ))}

                            </select>

                            <input
                                type="file"
                                ref={fileInputRef}
                                accept="image/*"
                                onChange={(e) => setImage(e.target.files?.[0] || null)}
                            />

                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-black text-white py-2 rounded flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                 {loading && (
                                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                    )}

                                {editingId ? "Update Service" : "Create Service"}

                            </button>

                        </form>

                    </div>

                </div>

            )}

        </div>
    )
}

