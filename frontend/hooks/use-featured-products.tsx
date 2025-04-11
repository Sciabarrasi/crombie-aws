import { create } from "zustand";
import { sampleProducts } from "@/lib/products";
import { ProductType } from "@/types/product";

interface UseFeaturedProductsType {
    featuredProducts: ProductType[];
    getProductBySlug: (slug: string) => ProductType | undefined;
}

export const useFeaturedProducts = create<UseFeaturedProductsType>((set, get) => ({
    featuredProducts: sampleProducts.filter(product => product.attributes.isFeatured),
    getProductBySlug: (slug: string) => {
        return get().featuredProducts.find(product => product.attributes.slug === slug);
    }
})); 