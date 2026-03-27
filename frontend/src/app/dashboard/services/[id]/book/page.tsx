"use client"

import { useParams } from "next/navigation"
import { useState } from "react"
import Link from "next/link"

export default function BookServicePage() {

  const params = useParams()
  const serviceId = Array.isArray(params.id) ? params.id[0] : params.id

  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [address, setAddress] = useState("")
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleBooking = async (e: any) => {
    e.preventDefault()

    setLoading(true)
    setError("")

    try {

      const res = await fetch("http://localhost:8000/api/v1/bookings/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          serviceId,
          bookingDate: date,
          timeSlot: time,
          address
        })
      })

      if (!res.ok) {
        throw new Error("Booking request failed")
      }

      const data = await res.json()
      console.log("Booking created:", data)

      setSuccess(true)

    } catch (err: any) {
      console.error(err)
      setError("Failed to send booking request")
    } finally {
      setLoading(false)
    }
  }


  // SUCCESS SCREEN
  if (success) {
    return (
      <div className="text-center py-20">

        <h2 className="text-3xl font-bold text-green-600 mb-4">
          Booking Request Sent
        </h2>

        <p className="text-gray-500 mb-8">
          Your booking request has been submitted.
          Please wait for approval.
        </p>

        <Link
          href="/dashboard/myBookings"
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
        >
          Go to My Bookings
        </Link>

      </div>
    )
  }


  return (
    <div>

      <h1 className="text-2xl font-bold mb-6">
        Book Service
      </h1>

      <form onSubmit={handleBooking} className="space-y-5 max-w-md">

        {/* Date */}
        <div>
          <label className="block text-sm mb-1">
            Date
          </label>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>


        {/* Time */}
        <div>
          <label className="block text-sm mb-1">
            Time
          </label>

          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>


        {/* Address */}
        <div>
          <label className="block text-sm mb-1">
            Address
          </label>

          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>


        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm">
            {error}
          </p>
        )}


        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
        >
          {loading ? "Submitting..." : "Confirm Booking"}
        </button>

      </form>

    </div>
  )
}