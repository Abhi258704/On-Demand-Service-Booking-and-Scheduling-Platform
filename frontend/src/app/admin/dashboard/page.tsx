"use client"

import { useEffect, useState } from "react"
import { Users, Wrench, Layers, Calendar } from "lucide-react"

export default function AdminDashboard() {

  const iconMap = {
    users: Users,
    services: Wrench,
    categories: Layers,
    bookings: Calendar
  }

  type CardKey = keyof typeof iconMap

  const [stats, setStats] = useState({
    users: 0,
    services: 0,
    categories: 0,
    bookings: 0
  })

  useEffect(() => {

    const fetchStats = async () => {

      try {

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/stats`,
          { credentials: "include" }
        )

        const data = await res.json()

        setStats(data.data)

      } catch (err) {
        console.error(err)
      }
    }

    fetchStats()

  }, [])

  const cards: { key: CardKey; label: string; value: number }[] = [
    { key: "users", label: "Users", value: stats.users },
    { key: "services", label: "Services", value: stats.services },
    { key: "categories", label: "Categories", value: stats.categories },
    { key: "bookings", label: "Bookings", value: stats.bookings }
  ]

  return (
    <div className="p-8">

      <h1 className="text-3xl font-semibold text-gray-800 mb-8">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {cards.map((card) => {

          const Icon = iconMap[card.key]

          return (

            <div
              key={card.key}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition duration-200"
            >

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {card.label}
                  </p>

                  <h2 className="text-3xl font-bold text-gray-900 mt-2">
                    {card.value}
                  </h2>
                </div>

                <div className="p-3 rounded-xl bg-blue-100 text-blue-600">
                  <Icon size={22} />
                </div>

              </div>

            </div>

          )
        })}

      </div>

    </div>
  )
}