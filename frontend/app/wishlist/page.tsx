"use client"

import { Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useWishlist } from "@/hooks/useWishlist"
import { useCart } from "@/hooks/useCart"
import { Navbar } from "@/components/navbar"

export default function WishlistPage() {
  const { items, removeItem, clearItems } = useWishlist()
  const { addItem: addToCart } = useCart()

  const handleAddToCart = (item) => {
    addToCart(item)
    removeItem(item.id)
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Tu Lista de Deseos</h1>
          <div className="flex flex-col items-center justify-center py-12">
            <h2 className="text-xl font-medium mb-4">Tu lista de deseos está vacía</h2>
            <p className="text-muted-foreground mb-6">Guarda los artículos que te gusten para más tarde.</p>
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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Tu Lista de Deseos</h1>
          <Button variant="outline" onClick={clearItems}>
            Limpiar Todo
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item.id} className="border rounded-lg overflow-hidden">
              <div className="relative aspect-square">
                <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                {item.category && (
                  <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                    {item.category}
                  </div>
                )}
              </div>
              <div className="p-4">
                <Link href={`/product/${item.id}`}>
                  <h3 className="font-semibold text-lg mb-1 hover:underline">{item.name}</h3>
                </Link>
                <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold">${item.price.toFixed(2)}</span>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-600 hover:bg-red-50"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button onClick={() => handleAddToCart(item)}>Agregar al Carrito</Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

