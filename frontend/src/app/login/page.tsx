"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {

  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleLogin = async (e: any) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("All fields are required")
      return
    }

    if (!validateEmail(email)) {
      setError("Enter a valid email (example@gmail.com)")
      return
    }

    try {
      setLoading(true)

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password })
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message || "Login failed")
        return
      }

      const userRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/current-user`,
        { credentials: "include" }
      )

      const userData = await userRes.json()
      const user = userData?.data

      if (!user) {
        setError("Unable to fetch user data")
        return
      }

      router.push(user.role === "admin" ? "/admin/dashboard" : "/dashboard")

    } catch {
      setError("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen grid md:grid-cols-2">

      {/* Left */}
      <div className="hidden md:flex flex-col justify-center items-center bg-gray-900 text-white p-12">
        <h1 className="text-4xl font-bold mb-4">ServiceHub</h1>
        <p className="text-gray-300 text-center max-w-sm">
          Book trusted home services quickly and easily.
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center justify-center bg-gray-100">

        <div className="w-[90%] max-w-md bg-white shadow-xl rounded-2xl p-10">

          <Link href="/" className="text-sm text-gray-500 mb-6 inline-block">
            ← Back to Home
          </Link>

          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-4">

            {/* Email */}
            <input
              type="email"
              placeholder="Email"
              className={`border rounded-lg p-3 ${
                error && !validateEmail(email) ? "border-red-500" : ""
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="border rounded-lg p-3 w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>

            <button
              disabled={loading}
              className="bg-black text-white py-3 rounded-lg hover:bg-gray-800 disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
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