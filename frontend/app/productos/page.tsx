// app/productos/page.tsx
'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';

const productos = [
  {
    id: 1,
    title: 'Remera Negra',
    price: 3999,
    image: '/images/remera-negra.jpg',
  },
  {
    id: 2,
    title: 'Pantalón Beige',
    price: 5599,
    image: '/images/pantalon-beige.jpg',
  },
  {
    id: 3,
    title: 'Campera de Jean',
    price: 8999,
    image: '/images/campera-jean.jpg',
  },
  {
    id: 4,
    title: 'Accesorio de Cuero',
    price: 2499,
    image: '/images/cinturon-cuero.jpg',
  },
  {
    id: 5,
    title: 'Remera Blanca',
    price: 3999,
    image: '/images/remera-blanca.jpg',
  },
  {
    id: 6,
    title: 'Pantalón Azul',
    price: 5599,
    image: '/images/pantalon-azul.jpg',
  },
];

export default function Catalogo() {
  const [carritoCantidad, setCarritoCantidad] = useState(0);
  const [animarCarrito, setAnimarCarrito] = useState(false);

  useEffect(() => {
    const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    const total = carrito.reduce((acc: number, item: any) => acc + item.cantidad, 0);
    setCarritoCantidad(total);
  }, []);

  const agregarAlCarrito = (producto: any) => {
    let carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    const index = carrito.findIndex((item: any) => item.id === producto.id);

    if (index >= 0) {
      carrito[index].cantidad += 1;
    } else {
      carrito.push({ ...producto, cantidad: 1 });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));

    const total = carrito.reduce((acc: number, item: any) => acc + item.cantidad, 0);
    setCarritoCantidad(total);
    setAnimarCarrito(true);
    setTimeout(() => setAnimarCarrito(false), 300);

    toast.success(`${producto.title} agregado al carrito!`);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
        {productos.map((producto) => (
          <motion.div
            key={producto.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="border rounded-2xl p-4 shadow hover:shadow-lg transition"
          >
            <Link href={`/producto/${producto.id}`}>
              <img
                src={producto.image}
                alt={producto.title}
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              <h2 className="text-xl font-semibold mb-1">{producto.title}</h2>
            </Link>
            <p className="text-gray-700 mb-3">${producto.price}</p>
            <Button onClick={() => agregarAlCarrito(producto)} className="w-full">
              Agregar al carrito 🛒
            </Button>
          </motion.div>
        ))}
      </div>

      <Link href="/carrito">
        <motion.div
          animate={{ scale: animarCarrito ? 1.15 : 1 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="fixed top-4 right-4 z-50 bg-black text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 hover:scale-105 transition-transform"
        >
          <ShoppingCart className="w-5 h-5" />
          <span>Carrito</span>
          {carritoCantidad > 0 && (
            <span className="ml-1 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {carritoCantidad}
            </span>
          )}
        </motion.div>
      </Link>
    </>
  );
}
