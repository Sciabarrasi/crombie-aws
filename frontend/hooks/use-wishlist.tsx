import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'
import { ProductType } from "@/types/product";
import { toast } from '@/components/ui/use-toast'
import { sampleProducts } from "@/lib/products";

interface UseWishlistType {
    wishlistItems: ProductType[],
    addToWishlist: (data: ProductType) => void
    removeFromWishlist: (id: number) => void
}

export const useWishlist = create(persist<UseWishlistType>((set, get) => ({
    wishlistItems: sampleProducts.slice(0, 3), // Inicialmente añadimos 3 productos como ejemplo
    addToWishlist: (data: ProductType) => {
        const currentWishlistItems = get().wishlistItems;
        const existingItem = currentWishlistItems.find((item) => item.id === data.id)

        if (existingItem) {
            return toast({
                title: "El producto ya está en tu lista de deseos 💔",
                variant: "destructive"
            })
        }

        set({
            wishlistItems: [...get().wishlistItems, data]
        })
        toast({
            title: "Producto añadido a tu lista de deseos 🧡"
        })
    },
    removeFromWishlist: (id: number) => {
        set({ wishlistItems: [...get().wishlistItems.filter((item) => item.id !== id)] })
        toast({
            title: "Producto eliminado de tu lista de deseos ❤️‍🔥"
        })
    }
}), {
    name: "wishlist-storage",
    storage: createJSONStorage(() => localStorage)
})) 