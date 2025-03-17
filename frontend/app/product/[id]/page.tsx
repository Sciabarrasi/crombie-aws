"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart, Minus, Plus, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/useCart"
import { useWishlist } from "@/hooks/useWishlist"
import { Navbar } from "@/components/navbar"
import type { Product } from "@/types"

const products: Product[] = [
  {
    id: "1",
    name: "Remera Casual",
    price: 19.99,
    description:
      "Remera de algodón cómoda para uso diario. Hecha con 100% algodón orgánico, esta remera es cómoda y respetuosa con el medio ambiente. Disponible en múltiples colores y tallas.",
    image: "/placeholder.svg?height=600&width=600",
    category: "Remeras",
    quantity: 10,
  },
  {
    id: "2",
    name: "Zapatillas para Correr",
    price: 89.99,
    description:
      "Zapatillas livianas con suelas acolchadas. Diseñadas para máxima comodidad y rendimiento, estas zapatillas cuentan con tecnología de amortiguación avanzada y materiales transpirables para mantener tus pies cómodos durante largas carreras.",
    image: "/placeholder.svg?height=600&width=600",
    category: "Zapatillas",
    quantity: 5,
  },
  {
    id: "3",
    name: "Auriculares Inalámbricos",
    price: 129.99,
    description:
      "Auriculares con cancelación de ruido y larga duración de batería. Disfruta de hasta 30 horas de reproducción con una sola carga. La tecnología avanzada de cancelación de ruido bloquea el ruido ambiental, permitiéndote concentrarte en tu música o llamadas.",
    image: "/placeholder.svg?height=600&width=600",
    category: "Accesorios",
    quantity: 8,
  },
  {
    id: "4",
    name: "Mochila",
    price: 49.99,
    description:
      "Mochila duradera con múltiples compartimentos. Perfecta para la escuela, el trabajo o los viajes, esta mochila cuenta con un compartimento acolchado para laptop, bolsillos para botellas de agua y mucha organización para todos tus elementos esenciales.",
    image: "/placeholder.svg?height=600&width=600",
    category: "Accesorios",
    quantity: 12,
  },
  {
    id: "5",
    name: "Buzo con Capucha",
    price: 59.99,
    description:
      "Buzo cálido y cómodo para clima frío. Hecho con vellón suave y pesado y un ajuste relajado para máxima comodidad.",
    image: "/placeholder.svg?height=600&width=600",
    category: "Buzos",
    quantity: 7,
  },
  {
    id: "6",
    name: "Jeans",
    price: 79.99,
    description: "Jeans clásicos con un ajuste moderno. Hechos con denim de alta calidad que es duradero y cómodo.",
    image: "/placeholder.svg?height=600&width=600",
    category: "Pantalones",
    quantity: 15,
  },
  {
    id: "7",
    name: "Campera de Invierno",
    price: 129.99,
    description:
      "Campera de invierno cálida con exterior resistente al agua. Cuenta con forro aislante y múltiples bolsillos.",
    image: "/placeholder.svg?height=600&width=600",
    category: "Camperas",
    quantity: 4,
  },
  {
    id: "8",
    name: "Shorts Deportivos",
    price: 34.99,
    description:
      "Shorts livianos perfectos para entrenamientos. Cuentan con tela que absorbe la humedad y una cómoda cintura elástica.",
    image: "/placeholder.svg?height=600&width=600",
    category: "Pantalones",
    quantity: 20,
  },
  {
    id: "9",
    name: "Zapatillas Casuales",
    price: 69.99,
    description:
      "Zapatillas elegantes para uso diario. Cuentan con plantillas acolchadas y suelas duraderas para comodidad durante todo el día.",
    image: "/placeholder.svg?height=600&width=600",
    category: "Zapatillas",
    quantity: 6,
  },
]

export default function ProductPage({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1)
  const { addItem: addToCart } = useCart()
  const { addItem: addToWishlist, items: wishlistItems } = useWishlist()

  const product = products.find((p) => p.id === params.id)

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center py-12">
            <h2 className="text-xl font-medium mb-4">Producto no encontrado</h2>
            <p className="text-muted-foreground mb-6">El producto que buscas no existe.</p>
            <Button>Volver al Inicio</Button>
          </div>
        </main>
      </div>
    )
  }

  const isInWishlist = wishlistItems.some((item) => item.id === product.id)

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity,
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative aspect-square">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover rounded-lg"
            />
            {product.category && (
              <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm">
                {product.category}
              </div>
            )}
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center justify-between mb-4">
              <p className="text-2xl font-semibold">${product.price.toFixed(2)}</p>
              <p className="text-sm bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 px-2 py-1 rounded">
                Stock: {product.quantity} disponibles
              </p>
            </div>
            <p className="text-muted-foreground mb-6">{product.description}</p>

            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Cantidad</h3>
                <div className="flex items-center border rounded-md w-fit">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-none"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-none"
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={quantity >= product.quantity}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-4">
                <Button className="flex-1" onClick={handleAddToCart} disabled={product.quantity <= 0}>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Agregar al Carrito
                </Button>
                <Button
                  variant="outline"
                  className={isInWishlist ? "text-red-500" : ""}
                  onClick={() => addToWishlist(product)}
                >
                  <Heart className="mr-2 h-4 w-4" fill={isInWishlist ? "currentColor" : "none"} />
                  {isInWishlist ? "En Lista de Deseos" : "Agregar a Lista de Deseos"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

