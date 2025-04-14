'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { LogOut, ShoppingCart, Heart } from 'lucide-react'

export default function Navbar() {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await fetch('/api/cognito-auth/logout', { method: 'POST' })
      router.push('/login')
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          Crombie
        </Link>

        <div className="flex gap-4 items-center">
          <Link href="/cart" className="hover:text-blue-600 transition">
            <ShoppingCart className="w-6 h-6" />
          </Link>
          <Link href="/wishlist" className="hover:text-pink-600 transition">
            <Heart className="w-6 h-6" />
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 text-red-500 hover:text-red-700 transition"
          >
            <LogOut className="w-5 h-5" />
            <span className="hidden sm:inline">Cerrar sesión</span>
          </button>
        </div>
      </div>
    </nav>
  )
}
