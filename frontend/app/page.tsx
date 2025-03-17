import ProductList from "@/components/productList"
import { Navbar } from "@/components/navbar"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Bienvenido a MiTienda</h1>
        <ProductList />
      </main>
    </div>
  )
}

