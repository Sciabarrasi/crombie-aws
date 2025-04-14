'use client'

import { useEffect, useState } from 'react'
import { Trash2 } from 'lucide-react'
import api from '@/lib/api'
import { getToken } from '@/lib/auth'
import { toast } from 'react-hot-toast'

interface CartItem {
  id: string
  product: {
    id: string
    name: string
    price: number
    imageUrl: string
    stock: number
  }
  quantity: number
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = getToken()
        if (!token) {
          setError('Debes iniciar sesión para ver tu carrito')
          setLoading(false)
          return
        }

        const res = await api.get('/items/cart', {
          headers: { Authorization: `Bearer ${token}` }
        })
        setCartItems(res.data)
      } catch (err: any) {
        setError(err.response?.data?.message || 'Error al cargar el carrito')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchCart()
  }, [])

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    try {
      const token = getToken()
      if (!token) return

      if (newQuantity <= 0) {
        await removeFromCart(itemId)
        return
      }

      await api.patch(`/items/cart/${itemId}`, { quantity: newQuantity }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      setCartItems(items => 
        items.map(item => 
          item.id === itemId 
            ? { ...item, quantity: newQuantity }
            : item
        )
      )
      toast.success('Cantidad actualizada')
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Error al actualizar cantidad')
      console.error('Error al actualizar cantidad:', err)
    }
  }

  const removeFromCart = async (itemId: string) => {
    try {
      const token = getToken()
      if (!token) return

      await api.delete(`/items/cart/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setCartItems(items => items.filter(item => item.id !== itemId))
      toast.success('Producto eliminado del carrito')
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Error al eliminar del carrito')
      console.error('Error al eliminar del carrito:', err)
    }
  }

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  )

  if (loading) return <div className="p-6">Cargando...</div>
  if (error) return <div className="p-6 text-red-500">{error}</div>

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Mi Carrito</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Tu carrito está vacío.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map(item => (
            <div key={item.id} className="flex justify-between items-center p-4 border rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <img 
                  src={item.product.imageUrl} 
                  alt={item.product.name} 
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div>
                  <h3 className="text-lg font-semibold">{item.product.name}</h3>
                  <p className="text-gray-600">Precio: ${item.product.price.toFixed(2)}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <label className="text-sm text-gray-600">Cantidad:</label>
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      max={item.product.stock}
                      className="w-16 p-1 border rounded text-center"
                      onChange={e => updateQuantity(item.id, parseInt(e.target.value))}
                    />
                    <span className="text-sm text-gray-500">
                      (Stock disponible: {item.product.stock})
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <p className="font-semibold text-lg">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 transition-colors p-2"
                  title="Eliminar del carrito"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
          
          <div className="mt-6 flex justify-between items-center p-4 bg-gray-50 rounded-xl">
            <span className="text-xl font-semibold">Total:</span>
            <span className="text-xl font-bold">${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      )}
    </div>
  )
}
