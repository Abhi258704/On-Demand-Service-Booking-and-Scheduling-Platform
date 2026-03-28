import { Suspense } from "react"
import ServicesPageContent from "./ServicesPageContent"

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <ServicesPageContent />
    </Suspense>
  )
}