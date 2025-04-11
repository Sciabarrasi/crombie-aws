"use client"
import { useWishlist } from "@/hooks/use-wishlist"
import WishlistItemProduct from "./components/wishlist-item-product"

export default function Page() {
    const { wishlistItems } = useWishlist()

    return (
        <div className="max-w-4xl py-4 mx-auto sm:py-32 sm:px-24 lg:min-h-[80vh]">
            <h1 className="sm:text-2xl">
                Mi Lista de Deseos
            </h1>

            <div>
                <div>
                    {wishlistItems.length === 0 && (
                        <p className="mt-4 text-gray-500">Tu lista de deseos está vacía</p>
                    )}
                    <ul className="grid gap-4 mt-6 sm:grid-cols-2 lg:grid-cols-3">
                        {wishlistItems.map((item) => (
                            <WishlistItemProduct key={item.id} product={item} />
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
} 