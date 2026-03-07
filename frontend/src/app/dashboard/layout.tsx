import DashboardNavbar from "@/components/dashboard/DashboardNavbar"
import DashboardSidebar from "@/components/dashboard/DashboardSidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="bg-gray-100 min-h-screen">

      {/* Navbar */}
      <DashboardNavbar />

      {/* Center container */}
      <div className="flex justify-center mt-10">

        <div className="w-[90%] max-w-6xl flex gap-6 items-stretch">

          {/* Sidebar */}
          <DashboardSidebar />

          {/* Main Content */}
          <div className="flex-1 bg-white shadow-xl rounded-2xl p-8 overflow-y-auto">
            {children}
          </div>

        </div>

      </div>

    </main>
  )
}