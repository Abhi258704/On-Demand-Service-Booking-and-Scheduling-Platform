"use client"

import { useEffect, useState } from "react"

type Booking = {
  _id: string
  bookingDate: string
  status: string
  service: {
    title: string
    price: number
  }
}

export default function MyBookingsPage() {

  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const fetchBookings = async () => {

      try {

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/bookings/my-bookings`,
          { credentials: "include" }
        )

        const data = await res.json()

        setBookings(data.data)

      } catch (error) {
        console.error("Failed to fetch bookings", error)
      } finally {
        setLoading(false)
      }
    }

    fetchBookings()

  }, [])

  if (loading) {
    return <p>Loading bookings...</p>
  }

  return (
    <div>

      <h1 className="text-2xl font-bold mb-6">
        My Bookings
      </h1>

      {bookings.length === 0 ? (
        <p className="text-gray-500">
          You haven't booked any services yet.
        </p>
      ) : (

        <div className="space-y-4">

          {bookings.map((booking) => (

            <div
              key={booking._id}
              className="border rounded-xl p-4 flex justify-between items-center hover:shadow transition"
            >

              {/* Left */}
              <div>

                <h2 className="font-semibold">
                  {booking.service.title}
                </h2>

                <p className="text-sm text-gray-500">
                  {new Date(booking.bookingDate).toLocaleDateString()}
                </p>

              </div>

              {/* Right */}
              <div className="text-right">

                <p className="font-semibold">
                  ₹{booking.service.price}
                </p>

                <span
                  className={`text-xs px-2 py-1 rounded ${
                    booking.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : booking.status === "confirmed"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {booking.status}
                </span>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  )
}