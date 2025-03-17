"use client"

import { Minus, Plus, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/useCart"
import { Navbar } from "@/components/navbar"

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart } = useCart()

  const subtotal = items.reduce((total, item) => {
    return total + item.price * item.quantity
  }, 0)

  const shipping = 10.0
  const total = subtotal + shipping

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Tu Carrito</h1>
          <div className="flex flex-col items-center justify-center py-12">
            <h2 className="text-xl font-medium mb-4">Tu carrito está vacío</h2>
            <p className="text-muted-foreground mb-6">Parece que aún no has agregado nada a tu carrito.</p>
            <Link href="/">
              <Button>Continuar Comprando</Button>
            </Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Tu Carrito</h1>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="border rounded-lg overflow-hidden">
              <div className="divide-y">
                {items.map((item) => (
                  <div key={item.id} className="p-4 flex gap-4">
                    <div className="relative h-24 w-24 flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <Link href={`/product/${item.id}`}>
                          <h3 className="font-medium hover:underline">{item.name}</h3>
                        </Link>
                        <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">${item.price.toFixed(2)} c/u</p>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border rounded-md">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-none"
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-none"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:text-red-600 hover:bg-red-50"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 flex justify-between">
              <Button variant="outline" onClick={clearCart}>
                Vaciar Carrito
              </Button>
              <Link href="/">
                <Button variant="outline">Continuar Comprando</Button>
              </Link>
            </div>
          </div>
          <div className="md:col-span-1">
            <div className="border rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4">Resumen del Pedido</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Envío</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 mt-2 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <Button className="w-full mt-6">Finalizar Compra</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

