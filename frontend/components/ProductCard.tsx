'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, ShoppingCart } from 'lucide-react'
import api from '@/lib/api'
import { getToken } from '@/lib/auth'
import { toast } from 'react-hot-toast'

interface Product {
  id: string
  name: string
  price: number
  imageUrl: string
  description?: string
  stock?: number
}

export default function ProductCard({ product }: { product: Product }) {
  const [addedToCart, setAddedToCart] = useState(false)
  const [addedToWishlist, setAddedToWishlist] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleAddToCart = async () => {
    try {
      const token = getToken()
      if (!token) {
        toast.error('Debes iniciar sesión para agregar al carrito')
        return
      }

      setIsLoading(true)
      await api.post(
        '/items/cart',
        { productId: product.id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      
      setAddedToCart(true)
      toast.success('¡Producto agregado al carrito!')
      setTimeout(() => setAddedToCart(false), 1200)
    } catch (err: any) {
      console.error(err)
      toast.error(err.response?.data?.message || 'Error al agregar al carrito')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddToWishlist = async () => {
    try {
      const token = getToken()
      if (!token) {
        toast.error('Debes iniciar sesión para agregar a la wishlist')
        return
      }

      setIsLoading(true)
      await api.post(
        '/items/wishlist',
        { productId: product.id },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      
      setAddedToWishlist(true)
      toast.success('¡Producto agregado a la wishlist!')
      setTimeout(() => setAddedToWishlist(false), 1200)
    } catch (err: any) {
      console.error(err)
      toast.error(err.response?.data?.message || 'Error al agregar a la wishlist')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg p-4 hover:shadow-xl transition w-full max-w-sm"
      whileHover={{ scale: 1.03 }}
    >
      <img
        src={product.imageUrl}
        alt={product.name}
        className="rounded-xl w-full h-56 object-cover mb-4"
      />
      <h2 className="text-lg font-semibold">{product.name}</h2>
      <p className="text-gray-500">${product.price.toFixed(2)}</p>
      {product.stock !== undefined && product.stock <= 0 && (
        <p className="text-red-500 mt-2">Sin stock disponible</p>
      )}

      <div className="mt-4 flex gap-3">
        <motion.button
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl transition ${
            addedToCart
              ? 'bg-green-600 text-white'
              : product.stock && product.stock > 0
              ? 'bg-green-100 text-green-700 hover:bg-green-200'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
          onClick={handleAddToCart}
          whileTap={{ scale: 0.95 }}
          disabled={isLoading || (product.stock !== undefined && product.stock <= 0)}
        >
          <ShoppingCart size={18} />
          {addedToCart ? '¡Agregado!' : 'Agregar al carrito'}
        </motion.button>

        <motion.button
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl transition ${
            addedToWishlist
              ? 'bg-pink-600 text-white'
              : 'bg-pink-100 text-pink-700 hover:bg-pink-200'
          }`}
          onClick={handleAddToWishlist}
          whileTap={{ scale: 0.95 }}
          disabled={isLoading}
        >
          <Heart size={18} />
          {addedToWishlist ? '¡En wishlist!' : 'Wishlist'}
        </motion.button>
      </div>
    </motion.div>
  )
}
