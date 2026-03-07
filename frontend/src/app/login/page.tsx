"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {

  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = async (e: any) => {
    e.preventDefault()

    setError("")

    try {

      // 1️⃣ Login request
      const res = await fetch("http://localhost:8000/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password
        })
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message || "Login failed")
        return
      }

      // 2️⃣ Get current user
      const userRes = await fetch(
        "http://localhost:8000/api/v1/users/current-user",
        {
          method: "GET",
          credentials: "include"
        }
      )

      const userData = await userRes.json()

      console.log(userData)

      const user = userData?.data

      if (!user) {
        setError("Unable to fetch user data")
        return
      }

      // 3️⃣ Redirect based on role
      if (user.role === "admin") {
        router.push("/admin/dashboard")
      } else {
        router.push(`/dashboard`)
      }

    } catch (err) {
      console.log(err)
      setError("Something went wrong")
    }
  }

  return (
    <main className="min-h-screen grid md:grid-cols-2">

      {/* Left Side Branding */}
      <div className="hidden md:flex flex-col justify-center items-center bg-gray-900 text-white p-12">

        <h1 className="text-4xl font-bold mb-4">
          ServiceHub
        </h1>

        <p className="text-gray-300 text-center max-w-sm">
          Book trusted home services quickly and easily.
          Plumbing, cleaning, electrical and more.
        </p>

      </div>

      {/* Right Side Login Form */}
      <div className="flex items-center justify-center bg-gray-100">

        <div className="w-[90%] max-w-md bg-white shadow-xl rounded-2xl p-10">

          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-black mb-6 inline-block"
          >
            ← Back to Home
          </Link>

          <h2 className="text-2xl font-bold mb-6 text-center">
            Login
          </h2>

          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">
              {error}
            </p>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-4">

            <input
              type="email"
              placeholder="Email"
              className="border rounded-lg p-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="border rounded-lg p-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="bg-black text-white py-3 rounded-lg hover:bg-gray-800">
              Login
            </button>

          </form>

          <p className="text-sm text-gray-500 text-center mt-6">
            Don’t have an account?{" "}
            <Link href="/register" className="text-black font-medium">
              Register
            </Link>
          </p>

        </div>

      </div>

    </main>
  )
}