"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useRef } from "react";


type Category = {
    _id: string
    name: string
    description?: string
    coverImage: string
}

export default function AdminCategories() {

    const [categories, setCategories] = useState<Category[]>([])
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState<File | null>(null)
    const [editingId, setEditingId] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [showModal, setShowModal] = useState(false)

    // services
    const [services, setServices] = useState<any[]>([])
    const [selectedCategory, setSelectedCategory] = useState<any>(null)
    const [showServicesModal, setShowServicesModal] = useState(false)

    const openCategoryServices = async (cat: any) => {

        setSelectedCategory(cat)

        const res = await fetch(
            `http://localhost:8000/api/v1/services/category/${cat._id}`,
            { credentials: "include" }
        )

        const data = await res.json()

        setServices(data.data)
        setShowServicesModal(true)
    }

    const fetchCategories = async () => {

        const res = await fetch(
            "http://localhost:8000/api/v1/categories/view-categories",
            {
                credentials: "include"
            }
        )

        const data = await res.json()
        setCategories(data.data)
    }

    useEffect(() => {
        fetchCategories()
    }, [])



    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault()
        setLoading(true)

        try {

            const formData = new FormData()
            formData.append("name", name)
            formData.append("description", description)

            if (image) {
                formData.append("coverImage", image)
            }

            if (editingId) {

                await fetch(
                    `http://localhost:8000/api/v1/categories/updateCategory/${editingId}`,
                    {
                        method: "PATCH",
                        credentials: "include",
                        body: formData
                    }
                )

            } else {

                const res = await fetch(
                    "http://localhost:8000/api/v1/categories/create",
                    {
                        method: "POST",
                        credentials: "include",
                        body: formData
                    }
                )

                const data = await res.json()

                if (!res.ok) {
                    setError(data.message || "Category already exists")
                    return
                }



            }

            setName("")
            setDescription("")
            setImage(null)
            setEditingId(null)
            setShowModal(false)

            if (fileInputRef.current) {
                fileInputRef.current.value = ""
            }

            fetchCategories()

        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }





    const handleEdit = (cat: Category) => {

        setName(cat.name)
        setDescription(cat.description || "")
        setEditingId(cat._id)
        setShowModal(true)
    }

    const deleteCategory = async (id: string) => {

        await fetch(
            `http://localhost:8000/api/v1/categories/deleteCategory/${id}`,
            {
                method: "DELETE",
                credentials: "include"
            }
        )

        fetchCategories()
    }

    return (
        <div className="no-scrollbar">

            <div className="flex justify-between items-center mb-6">

                <h1 className="text-2xl font-bold">
                    Manage Services
                </h1>

                <button
                    onClick={() => {
                        setName("")
                        setDescription("")
                        setShowModal(true)
                        setEditingId(null)
                    }}
                    className="bg-black text-white px-4 py-2 rounded-lg"
                >
                    + Create Category
                </button>

            </div>


            {error && (
                <div className="fixed top-6 right-6 bg-red-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-4 z-50">

                    <span>{error}</span>

                    <button
                        onClick={() => setError(null)}
                        className="text-white font-bold text-lg"
                    >
                        ✕
                    </button>

                </div>
            )}



            {/* Categories Grid (Same style as user page) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {categories.map((cat) => (
                    <div
                        onClick={() => openCategoryServices(cat)}
                        key={cat._id}
                        className="rounded-xl shadow hover:shadow-lg overflow-hidden"
                    >

                        <div className="relative w-full h-48">

                            <Image
                                src={cat.coverImage}
                                alt={cat.name}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                loading="eager"
                                className="object-contain"
                            />

                            <div className="absolute inset-0 bg-black/40"></div>

                            <div className="absolute bottom-3 left-3 text-white">

                                <h2 className="font-semibold text-lg">
                                    {cat.name}
                                </h2>

                                <p className="text-sm text-gray-200">
                                    {cat.description}
                                </p>

                            </div>

                        </div>

                        {/* Admin Actions */}
                        <div className="flex justify-between p-3">

                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleEdit(cat)
                                }}
                                className="text-blue-600"
                            >
                                Edit
                            </button>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    deleteCategory(cat._id)
                                }}
                                className="text-red-600"
                            >
                                Delete
                            </button>

                        </div>

                    </div>
                ))}

                {/* services                                     */}


                {showServicesModal && (

                    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

                        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-3xl relative">

                            <button
                                onClick={() => {
                                    setShowServicesModal(false)
                                }}
                                className="absolute top-3 right-3 text-gray-500"
                            >
                                ✕
                            </button>

                            <h2 className="text-xl font-semibold mb-6">
                                Services in {selectedCategory?.name}
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                {services?.map((service) => (

                                    <div
                                        key={service._id}
                                        className="border rounded-lg p-4 flex justify-between items-center"
                                    >

                                        <div>
                                            <h3 className="font-semibold">{service.title}</h3>
                                            <p className="text-sm text-gray-500">
                                                ₹{service.price} • {service.duration} min
                                            </p>
                                        </div>

                                        <div className="flex gap-3">

                                            {/* <button
                onClick={() => handleEditService(service)}
                className="text-blue-600"
              >
                Edit
              </button> */}

                                            {/* <button
                onClick={async() => await deleteService(service._id)}
                className="text-red-600"
              >
                Delete
              </button> */}

                                        </div>

                                    </div>

                                ))}

                            </div>

                        </div>

                    </div>

                )}




                {/* Category Form */}
                {showModal && (

                    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

                        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg relative">

                            {/* Close Button */}
                            <button
                                onClick={() => setShowModal(false)}
                                className="absolute top-3 right-3 text-gray-500"
                            >
                                ✕
                            </button>

                            <h2 className="text-xl font-semibold mb-4">
                                {editingId ? "Update Category" : "Create Category"}
                            </h2>

                            <form
                                onSubmit={(e) => {
                                    handleSubmit(e)
                                }}
                                className="flex flex-col gap-4"
                            >

                                <input
                                    placeholder="Category name"
                                    className="border p-2 rounded"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />

                                <input
                                    placeholder="Description"
                                    className="border p-2 rounded"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />

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

                                    {editingId ? "Update Category" : "Create Category"}

                                </button>

                            </form>

                        </div>

                    </div>

                )}

            </div>

        </div>
    )
}