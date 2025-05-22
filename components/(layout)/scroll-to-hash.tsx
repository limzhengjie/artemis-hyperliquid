'use client'

import { useEffect, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

function ScrollToHashContent() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // First, scroll to top immediately when the page loads
    window.scrollTo(0, 0)

    // Get the hash from the URL
    const hash = window.location.hash

    if (hash) {
      // Remove the '#' character
      const id = hash.substring(1)

      // delay scroll to the element by 500ms = 0.5 seconds
      const timeoutId = setTimeout(() => {
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          })
        }
      }, 500)

      return () => clearTimeout(timeoutId)
    }
  }, [pathname, searchParams])

  return null
}

export default function ScrollToHash() {
  return (
    <Suspense fallback={null}>
      <ScrollToHashContent />
    </Suspense>
  )
}
