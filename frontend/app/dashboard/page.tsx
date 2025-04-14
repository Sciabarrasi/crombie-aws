import Navbar from '@/components/Navbar'
import ProductCard from '@/components/ProductCard'

interface Product {
  id: string
  name: string
  price: number
  imageUrl: string
  description?: string
  createdAt?: string
}

async function getProducts(): Promise<Product[]> {
  const res = await fetch('http://localhost:3001/api/products', {
    next: { revalidate: 0 },
  })
  const data = await res.json()
  return data
}

export default async function DashboardPage() {
  const products = await getProducts()

  return (
    <>
      <Navbar />
      <main className="p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Productos Disponibles</h1>

        {products.length === 0 ? (
          <p className="text-gray-500">No hay productos aún.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </>
  )
}
