import { Suspense } from "react"
import ServicesPageContent from "./ServicesPageContent"

export default function ServicesPage() {
  return (
    <Suspense fallback={<div className="p-10">Loading...</div>}>
      <ServicesPageContent />
    </Suspense>
  )
}