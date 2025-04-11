/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/use-wishlist";
import { formatPrice } from "@/lib/formatPrice";
import { ProductType } from "@/types/product";
import { X } from "lucide-react";
import Image from "next/image";

interface WishlistItemProductProps {
    product: ProductType
}

const WishlistItemProduct = (props: WishlistItemProductProps) => {
    const { product } = props
    const { removeFromWishlist } = useWishlist()
    const { addItem } = useCart()

    const addToCheckout = () => {
        addItem(product)
        removeFromWishlist(product.id)
    }

    return (
        <li className="flex flex-col p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
                <div className="relative w-24 h-24">
                    <Image
                        src={product.attributes.images.data[0].attributes.url}
                        alt={product.attributes.productName}
                        fill
                        className="object-cover rounded-lg"
                    />
                </div>
                <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => removeFromWishlist(product.id)}
                >
                    <X className="h-4 w-4" />
                </Button>
            </div>

            <div className="mt-4">
                <h2 className="text-lg font-bold">{product.attributes.productName}</h2>
                <p className="font-bold text-primary">{formatPrice(product.attributes.price)}</p>
                <div className="flex gap-2 mt-2">
                    <span className="px-2 py-1 text-sm text-white bg-black rounded-full dark:bg-white dark:text-black">
                        {product.attributes.size}
                    </span>
                    <span className="px-2 py-1 text-sm text-white bg-gray-600 rounded-full">
                        {product.attributes.color}
                    </span>
                </div>
                <Button className="w-full mt-4" onClick={addToCheckout}>
                    Añadir al carrito
                </Button>
            </div>
        </li>
    );
}

export default WishlistItemProduct; 