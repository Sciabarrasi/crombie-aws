"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validación simple
    if (!email || !password) {
      setError("Por favor ingresa email y contraseña")
      return
    }

    // Intento de inicio de sesión
    try {
      login(email, password)
      router.push("/")
    } catch (err) {
      setError("Email o contraseña inválidos")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8 flex justify-center items-center">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Iniciar Sesión</CardTitle>
            <CardDescription>Ingresa tu email y contraseña para acceder a tu cuenta</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && <div className="bg-red-50 text-red-500 px-3 py-2 rounded-md text-sm">{error}</div>}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Contraseña</Label>
                  <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full">
                Iniciar Sesión
              </Button>
              <div className="text-center text-sm">
                ¿No tienes una cuenta?{" "}
                <Link href="/register" className="text-primary hover:underline">
                  Registrarse
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </main>
    </div>
  )
}

