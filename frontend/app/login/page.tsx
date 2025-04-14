'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/lib/api'
import { setToken } from '@/lib/auth'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async () => {
    try {
      const res = await api.post('/cognito-auth/login', { email, password })
      if (res.data?.data?.accessToken) {
        setToken(res.data.data.accessToken)
        router.push('/dashboard')
      } else {
        setError('Error en la respuesta del servidor')
      }
    } catch (err) {
      console.error('Login error:', err)
      setError('Login incorrecto. Verifica tus credenciales.')
    }
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl mb-4">Iniciar sesión</h1>
      <input className="border p-2 w-full mb-2" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input className="border p-2 w-full mb-2" type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin} className="bg-green-600 text-white w-full p-2">Ingresar</button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  )
}
