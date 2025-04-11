import BannerDiscount from "@/components/banner-discount";
import BannerProduct from "@/components/banner-product";
import CarouselTextBanner from "@/components/carousel-text-banner";
import ChooseCategory from "@/components/choose-category";
import FeaturedProducts from "@/components/featured-products";

export default function Home() {
  return (
    <main className="min-h-screen">
      <CarouselTextBanner />
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Nueva Colección</h2>
        <FeaturedProducts />
      </section>
      <BannerDiscount />
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Categorías</h2>
        <ChooseCategory />
      </section>
      <BannerProduct />
    </main>
  );
}
