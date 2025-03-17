"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Mi Perfil</h1>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Información de la Cuenta</CardTitle>
              <CardDescription>Tus datos personales</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm text-muted-foreground">Nombre</div>
                <div className="font-medium">{user.name}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Email</div>
                <div className="font-medium">{user.email}</div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline">Editar Perfil</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Configuración de la Cuenta</CardTitle>
              <CardDescription>Administra tu cuenta</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Cambiar Contraseña</div>
                  <div className="text-sm text-muted-foreground">Actualiza tu contraseña</div>
                </div>
                <Button variant="outline" size="sm">
                  Cambiar
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Configuración de Notificaciones</div>
                  <div className="text-sm text-muted-foreground">Administra notificaciones por email</div>
                </div>
                <Button variant="outline" size="sm">
                  Configurar
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="destructive" onClick={logout}>
                Cerrar Sesión
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}

