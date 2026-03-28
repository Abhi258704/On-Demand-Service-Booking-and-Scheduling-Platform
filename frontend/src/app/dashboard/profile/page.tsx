"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

type User = {
  fullName: string
  username: string
  email: string
  pfp?: string
}

export default function ProfilePage() {

  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const [fullName, setFullName] = useState("")
  const [username, setUsername] = useState("")

  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")

  const [pfpFile, setPfpFile] = useState<File | null>(null)

  useEffect(() => {

    const fetchUser = async () => {

      try {

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/current-user`,
          { credentials: "include" }
        )

        const data = await res.json()

        setUser(data.data)
        setFullName(data.data.fullName)
        setUsername(data.data.username)

      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()

  }, [])

  const updateProfile = async (e: any) => {

    e.preventDefault()

    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/update-details`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ fullName, username })
      }
    )

    alert("Profile updated")
  }

  const validatePassword = (password: string) => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/

  return regex.test(password)
}

  const changePassword = async (e: any) => {

  e.preventDefault()

  if (!oldPassword || !newPassword) {
    alert("All fields are required")
    return
  }

  if (!validatePassword(newPassword)) {
    alert(
      "Password must be 8 characters and include uppercase, lowercase, number and special character"
    )
    return
  }

  await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/change-password`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        oldPassword,
        newPassword
      })
    }
  )

  alert("Password changed successfully")
}

  const updatePfp = async () => {

    if (!pfpFile) return

    const formData = new FormData()
    formData.append("pfp", pfpFile)

    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/update-pfp`,
      {
        method: "PATCH",
        credentials: "include",
        body: formData
      }
    )

    alert("Profile picture updated")
  }

  if (loading) return <p>Loading profile...</p>

  return (
    <div className="space">

      <h1 className="text-2xl font-bold">
        My Profile
      </h1>

      {/* Profile Picture */}
      <div className="flex items-center gap-6">

        <div className="w-24 h-24 relative">

          {user?.pfp ? (
            <Image
              src={user.pfp}
              alt="profile"
              fill
              className="rounded-full object-contain border bg-fixed"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
              No Image
            </div>
          )}

        </div>

        <div>

          <input
            type="file"
            onChange={(e) =>
              setPfpFile(e.target.files ? e.target.files[0] : null)
            }
          />

          <button
            onClick={updatePfp}
            className="block mt-2 text-sm bg-black text-white px-3 py-1 rounded"
          >
            Update Photo
          </button>

        </div>

      </div>

      {/* Profile Details */}
      <form
        onSubmit={updateProfile}
        className="space-y-4 max-w-md"
      >

        <div>
          <label className="text-sm font-medium">
            Full Name
          </label>

          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full border rounded-lg p-2 mt-1"
          />
        </div>

        <div>
          <label className="text-sm font-medium">
            Username
          </label>

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border rounded-lg p-2 mt-1"
          />
        </div>

        <div>
          <label className="text-sm font-medium">
            Email
          </label>

          <input
            type="email"
            value={user?.email}
            disabled
            className="w-full border rounded-lg p-2 mt-1 bg-gray-100"
          />
        </div>

        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded-lg"
        >
          Update Profile
        </button>

      </form>

      {/* Change Password */}
      <div className="max-w-md">

        <h2 className="text-lg font-semibold mb-3">
          Change Password
        </h2>

        <form
          onSubmit={changePassword}
          className="space-y-4"
        >

          <input
            type="password"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full border rounded-lg p-2"
          />

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full border rounded-lg p-2"
          />
    

          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded-lg"
          >
            Change Password
          </button>

        </form>

      </div>

    </div>
  )
}