import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/use-wishlist";
import { formatPrice } from "@/lib/formatPrice";
import { ProductType } from "@/types/product";
import { Heart } from "lucide-react";

export type InfoProductProps = {
  product: ProductType;
};

const InfoProduct = (props: InfoProductProps) => {
  const { product } = props;
  const { addItem } = useCart();
  const { addToWishlist, wishlistItems } = useWishlist();
  const isInWishlist = wishlistItems.some(item => item.id === product.id);

  return (
    <div className="px-6">
      <div className="flex flex-col gap-2 mb-4">
        <h1 className="text-3xl font-bold">{product.attributes.productName}</h1>
        <div className="flex gap-2">
          <span className="px-2 py-1 text-sm text-white bg-black rounded-full dark:bg-white dark:text-black">
            {product.attributes.size}
          </span>
          <span className="px-2 py-1 text-sm text-white bg-gray-600 rounded-full">
            {product.attributes.color}
          </span>
        </div>
      </div>

      <Separator className="my-4" />
      
      <div className="prose prose-sm dark:prose-invert">
        <p>{product.attributes.description}</p>
      </div>

      <Separator className="my-4" />

      <div className="flex items-center justify-between mb-6">
        <p className="text-3xl font-bold text-primary">
          {formatPrice(product.attributes.price)}
        </p>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          onClick={() => addToWishlist(product)}
        >
          <Heart 
            className={`h-6 w-6 transition-colors ${isInWishlist ? 'fill-primary text-primary' : 'hover:fill-primary/20'}`}
          />
        </Button>
      </div>

      <Button 
        className="w-full" 
        size="lg"
        onClick={() => addItem(product)}
      >
        Añadir al carrito
      </Button>
    </div>
  );
};

export default InfoProduct;
