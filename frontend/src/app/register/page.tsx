"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function RegisterPage() {

  const router = useRouter()

  const [fullName, setFullName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [pfp, setPfp] = useState<File | null>(null)

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setError("")
    setSuccess("")

    // Basic validation
    if (!fullName || !username || !email || !password) {
      setError("All fields are required")
      return
    }

    if (!pfp) {
      setError("Profile picture is required")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    try {

      setLoading(true)

      const formData = new FormData()

      formData.append("fullName", fullName)
      formData.append("username", username)
      formData.append("email", email)
      formData.append("password", password)

      if (pfp) {
        formData.append("pfp", pfp)
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/register`, {
        method: "POST",
        body: formData
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message || "Registration failed")
        return
      }

      // success message
      setSuccess("Account created successfully! Redirecting to login...")

      setTimeout(() => {
        router.push("/login")
      }, 4000)

    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen grid md:grid-cols-2">

      {/* Left branding */}
      <div className="hidden md:flex flex-col justify-center items-center bg-gray-900 text-white p-12">

        <h1 className="text-4xl font-bold mb-4">
          ServiceHub
        </h1>

        <p className="text-gray-300 text-center max-w-sm">
          Join ServiceHub and start booking trusted home services quickly and easily.
        </p>

      </div>

      {/* Form */}
      <div className="flex items-center justify-center bg-gray-100">

        <div className="w-[90%] max-w-md bg-white shadow-xl rounded-2xl p-10">

          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-black mb-6 inline-block"
          >
            ← Back to Home
          </Link>

          <h2 className="text-2xl font-bold text-center mb-6">
            Create an account
          </h2>

          {/* Error message */}
          {error && (
            <p className="text-red-500 text-sm mb-3 text-center">
              {error}
            </p>
          )}

          {/* Success message */}
          {success && (
            <p className="text-green-600 text-sm mb-3 text-center">
              {success}
            </p>
          )}

          <form onSubmit={handleRegister} className="flex flex-col gap-4">

            <input
              type="file"
              accept="image/*"
              className="border rounded-lg p-3 text-sm"
              onChange={(e) =>
                setPfp(e.target.files ? e.target.files[0] : null)
              }
            />

            <input
              type="text"
              placeholder="Full Name"
              className="border rounded-lg p-3"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Username"
              className="border rounded-lg p-3"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

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

            <button
              disabled={loading}
              className="bg-black text-white py-3 rounded-lg hover:bg-gray-800"
            >
              {loading ? "Creating account..." : "Register"}
            </button>

          </form>

          <p className="text-sm text-gray-500 text-center mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-black font-medium">
              Login
            </Link>
          </p>

        </div>

      </div>

    </main>
  )
}