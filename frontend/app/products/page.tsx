'use client'

import { useEffect, useState } from 'react'
import api from '@/lib/api'
import { getToken } from '@/lib/auth'

interface Product {
  id: string
  name: string
  image: string
  price: number
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await api.get('/products', {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
      setProducts(res.data)
    }
    fetchProducts()
  }, [])

  const addToCart = async (id: string) => {
    await api.post('/cart', { productId: id }, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
    alert('Agregado al carrito')
  }

  const addToWishlist = async (id: string) => {
    await api.post('/wishlist', { productId: id }, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
    alert('Agregado a wishlist')
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Productos</h1>
      <div className="grid grid-cols-2 gap-4">
        {products.map(product => (
          <div key={product.id} className="border p-4 rounded shadow">
            <img src={product.image} className="w-full h-40 object-cover mb-2" />
            <h2 className="text-lg">{product.name}</h2>
            <p>${product.price}</p>
            <button onClick={() => addToCart(product.id)} className="bg-blue-500 text-white p-1 mt-2 mr-2">Carrito</button>
            <button onClick={() => addToWishlist(product.id)} className="bg-pink-500 text-white p-1 mt-2">Wishlist</button>
          </div>
        ))}
      </div>
    </div>
  )
}
