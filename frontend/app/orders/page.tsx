"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"

// Datos de pedidos de ejemplo
const MOCK_ORDERS = [
  {
    id: "ORD-001",
    date: "15-05-2023",
    status: "Entregado",
    total: 149.98,
    items: [
      { id: "1", name: "Remera Casual", quantity: 2, price: 19.99 },
      { id: "3", name: "Auriculares Inalámbricos", quantity: 1, price: 129.99 },
    ],
  },
  {
    id: "ORD-002",
    date: "22-06-2023",
    status: "En Proceso",
    total: 89.99,
    items: [{ id: "2", name: "Zapatillas para Correr", quantity: 1, price: 89.99 }],
  },
]

export default function OrdersPage() {
  const { user } = useAuth()
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
        <h1 className="text-3xl font-bold mb-6">Mis Pedidos</h1>

        {MOCK_ORDERS.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-medium mb-4">Aún no has realizado ningún pedido</h2>
            <p className="text-muted-foreground mb-6">Comienza a comprar para ver tus pedidos aquí.</p>
            <Link href="/">
              <Button>Explorar Productos</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {MOCK_ORDERS.map((order) => (
              <Card key={order.id}>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Pedido #{order.id}</CardTitle>
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-muted-foreground">{order.date}</div>
                    <div
                      className={`px-2 py-1 text-xs rounded-full ${
                        order.status === "Entregado" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {order.status}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-md divide-y">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex justify-between p-4">
                          <div>
                            <div className="font-medium">{item.name}</div>
                            <div className="text-sm text-muted-foreground">Cantidad: {item.quantity}</div>
                          </div>
                          <div className="font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>${order.total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        Seguir Pedido
                      </Button>
                      <Button size="sm">Ver Detalles</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

