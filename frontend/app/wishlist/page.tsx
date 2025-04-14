'use client'

import { useEffect, useState } from 'react'
import { Trash2 } from 'lucide-react'

interface WishlistItem {
  id: string
  product: {
    id: string
    name: string
    price: number
    image: string
  }
}

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWishlist = async () => {
      const res = await fetch('http://localhost:3001/api/wishlist', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      const data = await res.json()
      setWishlistItems(data)
      setLoading(false)
    }

    fetchWishlist()
  }, [])

  const removeFromWishlist = async (productId: string) => {
    const res = await fetch(`http://localhost:3001/api/wishlist/${productId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    if (res.ok) {
      setWishlistItems(wishlistItems.filter(item => item.product.id !== productId))
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Mi Wishlist</h1>

      {wishlistItems.length === 0 ? (
        <p className="text-gray-500">Tu wishlist está vacía.</p>
      ) : (
        <div className="space-y-4">
          {wishlistItems.map(item => (
            <div key={item.id} className="flex justify-between items-center p-4 border-b">
              <div className="flex items-center gap-4">
                <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-cover" />
                <div>
                  <h3 className="text-lg font-semibold">{item.product.name}</h3>
                  <p className="text-gray-500">Precio: ${item.product.price}</p>
                </div>
              </div>
              <button
                onClick={() => removeFromWishlist(item.product.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-6 h-6" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
