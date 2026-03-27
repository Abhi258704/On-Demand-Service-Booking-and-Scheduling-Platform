"use client"

import { useEffect } from "react"
import NProgress from "nprogress"
import { usePathname, useSearchParams } from "next/navigation"

export default function TopLoader() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    NProgress.start()

    const timeout = setTimeout(() => {
      NProgress.done()
    }, 400)

    return () => clearTimeout(timeout)
  }, [pathname, searchParams])

  return null
}