/* eslint-disable @next/next/no-img-element */
"use client";

import { useFeaturedProducts } from "@/hooks/use-featured-products";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { ProductType } from "@/types/product";
import { Card, CardContent } from "./ui/card";
import { Expand, ShoppingCart } from "lucide-react";
import IconButton from "./icon-button";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/use-wishlist";
import Image from "next/image";
import { formatPrice } from "@/lib/formatPrice";

const FeaturedProducts = () => {
  const { featuredProducts } = useFeaturedProducts();
  const router = useRouter();
  const { addItem } = useCart();
  const { addToWishlist } = useWishlist();

  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
      <h3 className="px-6 text-3xl sm:pb-8 text-center">Nuestros Productos Destacados</h3>
      <Carousel>
        <CarouselContent className="-ml-2 md:-ml-4">
          {featuredProducts.map((product: ProductType) => {
            const { attributes, id } = product;
            const { slug, images, productName, price, size, color } = attributes;

            return (
              <CarouselItem
                key={id}
                className="md:basis-1/2 lg:basis-1/3 group"
              >
                <div className="p-1">
                  <Card className="py-4 border border-gray-200 shadow-none">
                    <CardContent className="relative flex items-center justify-center px-6 py-2">
                      <div className="relative w-full h-64">
                        <Image
                          src={images.data[0].attributes.url}
                          alt={productName}
                          fill
                          className="object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                        <div className="absolute w-full px-6 transition duration-200 opacity-0 group-hover:opacity-100 bottom-5">
                          <div className="flex justify-center gap-x-6">
                            <IconButton
                              onClick={() => router.push(`product/${slug}`)}
                              icon={<Expand size={20} />}
                              className="text-gray-600"
                            />
                            <IconButton
                              onClick={() => addItem(product)}
                              icon={<ShoppingCart size={20} />}
                              className="text-gray-600"
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <div className="flex flex-col gap-2 px-8">
                      <h3 className="text-lg font-bold">{productName}</h3>
                      <p className="text-xl font-bold text-primary">{formatPrice(price)}</p>
                      <div className="flex gap-2">
                        <span className="px-2 py-1 text-sm text-white bg-black rounded-full dark:bg-white dark:text-black">
                          {size}
                        </span>
                        <span className="px-2 py-1 text-sm text-white bg-gray-600 rounded-full">
                          {color}
                        </span>
                      </div>
                      <button 
                        className="mt-2 text-sm text-primary hover:underline"
                        onClick={() => addToWishlist(product)}
                      >
                        Añadir a lista de deseos
                      </button>
                    </div>
                  </Card>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </div>
  );
};

export default FeaturedProducts;
