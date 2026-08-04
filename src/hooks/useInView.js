import { useEffect, useRef, useState } from 'react'

export function useInView(threshold = 0.02) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    
    // Fallback if IntersectionObserver is not available
    if (!('IntersectionObserver' in window)) {
      setInView(true)
      return
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          obs.unobserve(el)
        }
      },
      { threshold, rootMargin: '0px 0px -10px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])

  return { ref, inView }
}
