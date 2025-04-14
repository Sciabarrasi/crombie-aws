'use client'

import { useState } from 'react'
import api from '@/lib/api'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleRegister = async () => {
    try {
      await api.post('/cognito-auth/register', { email, password })
      setMessage('Registro exitoso. Revisá tu email para confirmar.')
    } catch {
      setMessage('Error al registrar.')
    }
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl mb-4">Registro</h1>
      <input className="border p-2 w-full mb-2" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input className="border p-2 w-full mb-2" type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleRegister} className="bg-blue-600 text-white w-full p-2">Registrarme</button>
      {message && <p className="mt-2">{message}</p>}
    </div>
  )
}
