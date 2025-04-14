'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getToken } from '@/lib/auth'

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    const token = getToken()
    if (token) {
      router.push('/dashboard')
    } else {
      router.push('/login')
    }
  }, [])

  return null // o un spinner si querés
}
