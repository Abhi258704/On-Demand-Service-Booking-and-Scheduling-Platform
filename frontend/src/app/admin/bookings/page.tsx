"use client"

import { useEffect, useState } from "react"

type Booking = {
  _id: string
  bookingDate: string
  timeSlot: string
  address: string
  status: string
  user: {
    fullName: string
    email: string
  }
  service: {
    title: string
    price: number
    duration: number
  }
}

export default function AdminBookings() {

  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(false)

  const fetchBookings = async () => {

    const res = await fetch(
      "http://localhost:8000/api/v1/bookings/allBookings",
      { credentials: "include" }
    )

    const data = await res.json()
    setBookings(data.data)
  }

  useEffect(() => {
    fetchBookings()
  }, [])


  const updateStatus = async (id: string, status: string) => {

    setLoading(true)

    await fetch(
      `http://localhost:8000/api/v1/bookings/status/${id}`,
      {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ status })
      }
    )

    await fetchBookings()

    setLoading(false)
  }


  return (

    <div className="space-y-6">

      <h1 className="text-2xl font-bold">
        Manage Bookings
      </h1>


      <div className="space-y-4">

        {bookings.map((b) => (

          <div
            key={b._id}
            className="border rounded-xl p-5 flex justify-between items-center shadow-sm"
          >

            {/* Booking info */}
            <div>

              <h2 className="font-semibold text-lg">
                {b.service?.title}
              </h2>

              <p className="text-sm text-gray-500">
                {b.user?.fullName} • {b.user?.email}
              </p>

              <p className="text-sm">
                {b.bookingDate} • {b.timeSlot}
              </p>

              <p className="text-sm text-gray-500">
                Address: {b.address}
              </p>

              <p className="text-sm text-gray-500">
                ₹{b.service?.price} • {b.service?.duration} min
              </p>

            </div>


            {/* Status dropdown */}
            <div>

              <select
                value={b.status}
                disabled={loading}
                onChange={(e) =>
                  updateStatus(b._id, e.target.value)
                }
                className={`px-3 py-2 rounded border text-sm

                ${b.status === "approved"
                    ? "bg-green-100 text-green-700"

                    : b.status === "cancelled"
                      ? "bg-red-100 text-red-700"

                      : b.status === "completed"
                        ? "bg-blue-100 text-blue-700"

                        : "bg-yellow-100 text-yellow-700"
                  }
                `}
              >

                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="cancelled">Cancelled</option>
                <option value="completed">Completed</option>

              </select>

            </div>

          </div>

        ))}

      </div>

    </div>
  )
}