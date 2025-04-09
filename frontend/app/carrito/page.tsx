'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type Producto = {
  id: number;
  title: string;
  price: number;
  image: string;
  cantidad: number;
};

export default function CarritoPage() {
  const [carrito, setCarrito] = useState<Producto[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('carrito') || '[]');
    setCarrito(stored);
  }, []);

  const vaciarCarrito = () => {
    localStorage.removeItem('carrito');
    setCarrito([]);
  
    // Disparar evento personalizado para que Navbar se entere
    window.dispatchEvent(new Event('actualizar-carrito'));
  };
  

  const calcularTotal = () =>
    carrito.reduce((total, item) => total + item.price * item.cantidad, 0);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Tu carrito 🛒</h1>

      {carrito.length === 0 ? (
        <p className="text-gray-600">No hay productos en el carrito.</p>
      ) : (
        <div className="space-y-6">
          {carrito.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b pb-4"
            >
              <div className="flex gap-4 items-center">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h2 className="font-semibold">{item.title}</h2>
                  <p className="text-sm text-gray-500">
                    ${item.price} x {item.cantidad}
                  </p>
                </div>
              </div>
              <div className="text-right font-medium">
                ${item.price * item.cantidad}
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center text-lg font-semibold pt-4 border-t">
            <span>Total:</span>
            <span>${calcularTotal()}</span>
          </div>

          <div className="flex gap-4">
            <Button variant="destructive" onClick={vaciarCarrito}>
              Vaciar carrito
            </Button>
            <Link href="/productos">
              <Button variant="outline">Seguir comprando</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
