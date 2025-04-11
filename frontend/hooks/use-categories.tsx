import { create } from "zustand";
import { sampleCategories } from "@/lib/categories";
import { CategoryType } from "@/types/category";

interface UseCategoriesType {
    categories: CategoryType[];
    getCategoryBySlug: (slug: string) => CategoryType | undefined;
}

export const useCategories = create<UseCategoriesType>((set, get) => ({
    categories: sampleCategories,
    getCategoryBySlug: (slug: string) => {
        return get().categories.find(category => category.attributes.slug === slug);
    }
})); 