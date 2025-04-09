// app/page.tsx
'use client';

import { motion } from 'framer-motion';
import ProductCard from '@/components/ProductCard';

const productos = [
  {
    id: 1,
    title: 'Remera Oversize',
    price: 3499,
    image: 'https://picsum.photos/seed/ropa1/400/300',
  },
  {
    id: 2,
    title: 'Buzo Urbano',
    price: 5999,
    image: 'https://picsum.photos/seed/ropa2/400/300',
  },
  {
    id: 3,
    title: 'Jean Slim Fit',
    price: 7899,
    image: 'https://picsum.photos/seed/ropa3/400/300',
  },
  {
    id: 4,
    title: 'Campera Bomber',
    price: 9999,
    image: 'https://picsum.photos/seed/ropa4/400/300',
  },
  {
    id: 5,
    title: 'Zapatillas Chunky',
    price: 8999,
    image: 'https://picsum.photos/seed/ropa5/400/300',
  },
  {
    id: 6,
    title: 'Gorra Street',
    price: 2499,
    image: 'https://picsum.photos/seed/ropa6/400/300',
  },
];

export default function Home() {
  return (
    <main className="p-6 space-y-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-center"
      >
        Bienvenido a Crombie Store
      </motion.h1>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {productos.map((producto, index) => (
          <motion.div
            key={producto.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <ProductCard {...producto} />
          </motion.div>
        ))}
      </section>
    </main>
  );
}
