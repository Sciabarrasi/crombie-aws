"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Filter, Heart, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/hooks/useCart"
import { useWishlist } from "@/hooks/useWishlist"
import type { Product } from "@/types"

// Datos de productos con categorías y cantidad
const products: Product[] = [
  {
    id: "1",
    name: "Remera Casual",
    price: 19.99,
    description: "Remera de algodón cómoda para uso diario",
    image: "/placeholder.svg?height=300&width=300",
    category: "Remeras",
    quantity: 10,
  },
  {
    id: "2",
    name: "Zapatillas para Correr",
    price: 89.99,
    description: "Zapatillas livianas con suelas acolchadas",
    image: "/placeholder.svg?height=300&width=300",
    category: "Zapatillas",
    quantity: 5,
  },
  {
    id: "3",
    name: "Auriculares Inalámbricos",
    price: 129.99,
    description: "Auriculares con cancelación de ruido y larga duración de batería",
    image: "/placeholder.svg?height=300&width=300",
    category: "Accesorios",
    quantity: 8,
  },
  {
    id: "4",
    name: "Mochila",
    price: 49.99,
    description: "Mochila duradera con múltiples compartimentos",
    image: "/placeholder.svg?height=300&width=300",
    category: "Accesorios",
    quantity: 12,
  },
  {
    id: "5",
    name: "Buzo con Capucha",
    price: 59.99,
    description: "Buzo cálido y cómodo para clima frío",
    image: "/placeholder.svg?height=300&width=300",
    category: "Buzos",
    quantity: 7,
  },
  {
    id: "6",
    name: "Jeans",
    price: 79.99,
    description: "Jeans clásicos con un ajuste moderno",
    image: "/placeholder.svg?height=300&width=300",
    category: "Pantalones",
    quantity: 15,
  },
  {
    id: "7",
    name: "Campera de Invierno",
    price: 129.99,
    description: "Campera de invierno cálida con exterior resistente al agua",
    image: "/placeholder.svg?height=300&width=300",
    category: "Camperas",
    quantity: 4,
  },
  {
    id: "8",
    name: "Shorts Deportivos",
    price: 34.99,
    description: "Shorts livianos perfectos para entrenamientos",
    image: "/placeholder.svg?height=300&width=300",
    category: "Pantalones",
    quantity: 20,
  },
  {
    id: "9",
    name: "Zapatillas Casuales",
    price: 69.99,
    description: "Zapatillas elegantes para uso diario",
    image: "/placeholder.svg?height=300&width=300",
    category: "Zapatillas",
    quantity: 6,
  },
]

// Obtener categorías únicas
const categories = Array.from(new Set(products.map((product) => product.category)))

export default function ProductList() {
  const { addItem: addToCart } = useCart()
  const { addItem: addToWishlist, items: wishlistItems } = useWishlist()
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Filtrar productos cuando cambian las categorías seleccionadas
  useEffect(() => {
    if (selectedCategories.length === 0) {
      setFilteredProducts(products)
    } else {
      setFilteredProducts(products.filter((product) => selectedCategories.includes(product.category || "")))
    }
  }, [selectedCategories])

  const isInWishlist = (productId: string) => {
    return wishlistItems.some((item: { id: string }) => item.id === productId)
  }

  const handleCategoryChange = (category: string, isChecked: boolean) => {
    setSelectedCategories((prev) => {
      if (isChecked) {
        return [...prev, category]
      } else {
        return prev.filter((c) => c !== category)
      }
    })
  }

  const clearFilters = () => {
    setSelectedCategories([])
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Productos</h2>
        <div className="flex items-center gap-2">
          {selectedCategories.length > 0 && (
            <Button variant="outline" size="sm" onClick={clearFilters}>
              Limpiar Filtros
            </Button>
          )}
          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="md:hidden">
                <Filter className="h-4 w-4 mr-2" />
                Filtrar
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">Filtrar por Categoría</h3>
                  <Button variant="ghost" size="sm" onClick={() => setIsFilterOpen(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-4">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={`mobile-category-${category}`}
                        checked={selectedCategories.includes(category!)} //arreglar esto
                        onCheckedChange={(isChecked) => handleCategoryChange(category!, !isChecked)}
                      />
                      <Label
                        htmlFor={`mobile-category-${category}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="grid md:grid-cols-[220px_1fr] gap-6">
        {/* Filtro de Sidebar para Desktop */}
        <div className="hidden md:block space-y-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-3">Categorías</h3>
            <div className="space-y-3">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category}`}
                    checked={selectedCategories.includes(category!)} //arreglar esto
                    onCheckedChange={(isChecked) => handleCategoryChange(category!, !isChecked)}
                  />
                  <Label
                    htmlFor={`category-${category}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cuadrícula de Productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <h3 className="text-lg font-medium mb-2">No se encontraron productos</h3>
              <p className="text-muted-foreground mb-4">Intenta cambiar tus criterios de filtro</p>
              <Button onClick={clearFilters}>Limpiar Filtros</Button>
            </div>
          ) : (
            filteredProducts.map((product) => (
              <div key={product.id} className="border rounded-lg overflow-hidden group">
                <div className="relative aspect-square">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`absolute top-2 right-2 bg-background/80 hover:bg-background ${
                      isInWishlist(product.id) ? "text-red-500" : "text-muted-foreground"
                    }`}
                    onClick={() => addToWishlist(product)}
                  >
                    <Heart className="h-5 w-5" fill={isInWishlist(product.id) ? "currentColor" : "none"} />
                  </Button>
                  {product.category && (
                    <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                      {product.category}
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <Link href={`/product/${product.id}`}>
                    <h3 className="font-semibold text-lg mb-1 hover:underline">{product.name}</h3>
                  </Link>
                  <p className="text-muted-foreground text-sm mb-2 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold">${product.price.toFixed(2)}</span>
                    <span className="text-sm text-muted-foreground">Stock: {product.quantity}</span>
                  </div>
                  <div className="flex justify-end">
                    <Button onClick={() => addToCart(product)}>Agregar</Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}