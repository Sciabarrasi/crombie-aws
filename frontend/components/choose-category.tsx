/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { useCategories } from "@/hooks/use-categories";
import { CategoryType } from "@/types/category";

const ChooseCategory = () => {
  const { categories } = useCategories();

  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
      <h3 className="px-6 pb-4 text-3xl sm:pb-8 text-center">
        Explora nuestras categorías
      </h3>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category: CategoryType) => (
          <Link
            key={category.id}
            href={`/category/${category.attributes.slug}`}
            className="relative max-w-xs mx-auto overflow-hidden bg-no-repeat bg-cover rounded-lg group"
          >
            <img
              src={`${category.attributes.mainImage.data.attributes.url}`}
              alt={category.attributes.categoryName}
              className="w-full h-64 object-cover transition duration-300 ease-in-out rounded-lg group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
            <p className="absolute w-full py-2 text-lg font-bold text-center text-white bottom-5">
              {category.attributes.categoryName}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ChooseCategory;
