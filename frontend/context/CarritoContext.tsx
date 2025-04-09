// context/CarritoContext.tsx
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Producto {
  id: number;
  title: string;
  price: number;
  image: string;
  cantidad: number;
}

interface CarritoContextType {
  carritoCantidad: number;
  agregarAlCarrito: (producto: Omit<Producto, 'cantidad'>) => void;
}

const CarritoContext = createContext<CarritoContextType | undefined>(undefined);

export function CarritoProvider({ children }: { children: ReactNode }) {
  const [carritoCantidad, setCarritoCantidad] = useState(0);

  useEffect(() => {
    const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    const total = carrito.reduce((acc: number, item: Producto) => acc + item.cantidad, 0);
    setCarritoCantidad(total);
  }, []);

  const agregarAlCarrito = (producto: Omit<Producto, 'cantidad'>) => {
    let carrito: Producto[] = JSON.parse(localStorage.getItem('carrito') || '[]');
    const index = carrito.findIndex((item) => item.id === producto.id);

    if (index >= 0) {
      carrito[index].cantidad += 1;
    } else {
      carrito.push({ ...producto, cantidad: 1 });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    const total = carrito.reduce((acc: number, item: Producto) => acc + item.cantidad, 0);
    setCarritoCantidad(total);
  };

  return (
    <CarritoContext.Provider value={{ carritoCantidad, agregarAlCarrito }}>
      {children}
    </CarritoContext.Provider>
  );
}

export function useCarrito() {
  const context = useContext(CarritoContext);
  if (!context) throw new Error('useCarrito debe usarse dentro de un CarritoProvider');
  return context;
}
