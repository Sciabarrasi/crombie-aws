// components/Navbar.tsx
'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [cantidadTotal, setCantidadTotal] = useState(0);
  const [animar, setAnimar] = useState(false);

  const actualizarCantidad = () => {
    const stored = JSON.parse(localStorage.getItem('carrito') || '[]');
    const total = stored.reduce((sum: number, item: any) => sum + item.cantidad, 0);
    setCantidadTotal(total);
    if (total > 0) {
      setAnimar(true);
      setTimeout(() => setAnimar(false), 500);
    }
  };

  useEffect(() => {
    actualizarCantidad();

    const handler = () => actualizarCantidad();

    window.addEventListener('actualizar-carrito', handler);
    return () => window.removeEventListener('actualizar-carrito', handler);
  }, []);

  return (
    <nav className="bg-white border-b p-4 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/">
          <span className="text-xl font-bold">Crombie Store</span>
        </Link>

        <Link href="/carrito" className="relative">
          <motion.div
            id="carrito-icon"
            animate={animar ? { scale: [1, 1.4, 1] } : { scale: 1 }}
            transition={{ duration: 0.4 }}
            className="relative"
          >
            <ShoppingCart className="w-6 h-6" />
            <AnimatePresence mode="wait">
              {cantidadTotal > 0 && (
                <motion.span
                  key="badge"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                >
                  {cantidadTotal}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        </Link>
      </div>
    </nav>
  );
}
