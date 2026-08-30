'use client'

import { useCallback, useRef, useState } from 'react'

// Tracks whether an element has scrolled into view, for one-time staggered
// reveal animations. Stays true once triggered so items don't re-hide.
//
// Uses a callback ref rather than useEffect + a plain ref: the target can
// mount well after this hook's owning component first renders (e.g. content
// inside a dialog that renders `null` until opened), and a plain ref read
// inside a one-time effect would miss that later attachment entirely.
export function useReveal<T extends HTMLElement>(threshold = 0.15) {
  const [visible, setVisible] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  const ref = useCallback(
    (node: T | null) => {
      observerRef.current?.disconnect()
      if (!node) return

      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true)
            observerRef.current?.disconnect()
          }
        },
        { threshold },
      )
      observerRef.current.observe(node)
    },
    [threshold],
  )

  return { ref, visible }
}
