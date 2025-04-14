'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/lib/api'

export default function ConfirmPage() {
  const [email, setEmail] = useState('')
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const router = useRouter()

  const handleConfirm = async () => {
    try {
      setError('')
      const res = await api.post('/cognito-auth/confirm', {
        email,
        pin
      })
      setSuccess('Cuenta confirmada exitosamente')
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    } catch (err: any) {
      console.error('Confirmation error:', err)
      if (err.response?.data?.message) {
        setError(err.response.data.message)
      } else if (err.response?.data?.error) {
        setError(err.response.data.error)
      } else {
        setError('Error al confirmar la cuenta. Por favor intenta nuevamente.')
      }
    }
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl mb-4">Confirmar cuenta</h1>
      <input 
        className="border p-2 w-full mb-2" 
        placeholder="Email" 
        value={email} 
        onChange={e => setEmail(e.target.value)} 
      />
      <input 
        className="border p-2 w-full mb-2" 
        placeholder="PIN de confirmación" 
        value={pin} 
        onChange={e => setPin(e.target.value)} 
      />
      <button 
        onClick={handleConfirm} 
        className="bg-green-600 text-white w-full p-2"
      >
        Confirmar
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-500 mt-2">{success}</p>}
    </div>
  )
} 