"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import type { Product } from "@/types"

interface WishlistContextType {
  items: Product[]
  addItem: (product: Product) => void
  removeItem: (id: string) => void
  clearItems: () => void
}

const WishlistContext = createContext<WishlistContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  clearItems: () => {},
})

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Product[]>([])

  useEffect(() => {
    const storedWishlist = localStorage.getItem("wishlist")
    if (storedWishlist) {
      try {
        setItems(JSON.parse(storedWishlist))
      } catch (error) {
        console.error("Failed to parse wishlist from localStorage", error)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(items))
  }, [items])

  const addItem = (product: Product) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id)

      if (existingItem) {
        return prevItems
      } else {
        return [...prevItems, product]
      }
    })
  }

  const removeItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  const clearItems = () => {
    setItems([])
  }

  return (
    <WishlistContext.Provider value={{ items, addItem, removeItem, clearItems }}>{children}</WishlistContext.Provider>
  )
}

export const useWishlist = () => useContext(WishlistContext)

