// app/producto/[id]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

const productos = [
  {
    id: 1,
    title: 'Remera Negra',
    price: 3999,
    description: 'Remera básica de algodón color negro.',
    image: '/images/remera-negra.jpg',
  },
  {
    id: 2,
    title: 'Pantalón Beige',
    price: 5599,
    description: 'Pantalón cómodo de lino color beige.',
    image: '/images/pantalon-beige.jpg',
  },
  {
    id: 3,
    title: 'Campera de Jean',
    price: 8999,
    description: 'Campera clásica de jean azul.',
    image: '/images/campera-jean.jpg',
  },
  {
    id: 4,
    title: 'Accesorio de Cuero',
    price: 2499,
    description: 'Cinturón de cuero genuino.',
    image: '/images/cinturon-cuero.jpg',
  },
  {
    id: 5,
    title: 'Remera Blanca',
    price: 3999,
    description: 'Remera básica de algodón color blanco.',
    image: '/images/remera-blanca.jpg',
  },
  {
    id: 6,
    title: 'Pantalón Azul',
    price: 5599,
    description: 'Pantalón de vestir azul marino.',
    image: '/images/pantalon-azul.jpg',
  },
];

export default function DetalleProducto() {
  const params = useParams();
  const id = Number(params.id);
  const producto = productos.find((p) => p.id === id);

  const agregarAlCarrito = () => {
    const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    const existe = carrito.find((item: any) => item.id === producto?.id);

    if (!existe && producto) {
      localStorage.setItem('carrito', JSON.stringify([...carrito, producto]));
    }
  };

  if (!producto) {
    return (
      <div className="p-6 text-center text-gray-500">
        <p>Producto no encontrado</p>
        <Link href="/productos" className="text-blue-500 underline">Volver al catálogo</Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6 max-w-xl mx-auto"
    >
      <img
        src={producto.image}
        alt={producto.title}
        className="w-full h-64 object-cover rounded-xl mb-4 shadow"
      />
      <h1 className="text-3xl font-bold mb-2">{producto.title}</h1>
      <p className="text-xl text-gray-700 mb-4">${producto.price}</p>
      <p className="text-gray-600 mb-6">{producto.description}</p>
      <Button
        className="mb-4 w-full text-lg"
        onClick={agregarAlCarrito}
      >
        Agregar al carrito 🛒
      </Button>
      <Link href="/productos" className="text-blue-600 underline block text-center">← Volver al catálogo</Link>
    </motion.div>
  );
}
