import AdminSidebar from "@/components/admin/AdminSidebar"
import AdminNavbar from "@/components/admin/AdminNavbar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="bg-gray-100 h-screen flex flex-col">

      <AdminNavbar />

      <div className="flex flex-1 overflow-hidden justify-center">

        <div className="w-[90%] max-w-7xl flex gap-6 py-6">

          <AdminSidebar />

          <div className="flex-1 bg-white shadow-xl rounded-2xl p-8 overflow-y-auto no-scrollbar">
            {children}
          </div>

        </div>

      </div>

    </main>
  )
}