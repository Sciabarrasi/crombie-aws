// components/ProductCard.tsx
'use client';

import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { useRef } from 'react';

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  image: string;
}

export default function ProductCard({ id, title, price, image }: ProductCardProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleAgregar = () => {
    const stored = JSON.parse(localStorage.getItem('carrito') || '[]');

    const index = stored.findIndex((item: any) => item.id === id);

    let cantidadTotal = 1;

    if (index !== -1) {
      stored[index].cantidad += 1;
      cantidadTotal = stored[index].cantidad;
    } else {
      stored.push({ id, title, price, image, cantidad: 1 });
    }

    localStorage.setItem('carrito', JSON.stringify(stored));
    toast.success(`${title} agregado al carrito (x${cantidadTotal})`);
    window.dispatchEvent(new Event('actualizar-carrito'));

    // 🔥 Agregar animación del ícono que vuela al carrito
    const carritoIcon = document.querySelector('#carrito-icon');
    const button = buttonRef.current;

    if (carritoIcon && button) {
      const clone = button.cloneNode(true) as HTMLElement;
      const rect = button.getBoundingClientRect();
      const carritoRect = carritoIcon.getBoundingClientRect();

      clone.style.position = 'fixed';
      clone.style.left = `${rect.left}px`;
      clone.style.top = `${rect.top}px`;
      clone.style.zIndex = '1000';
      clone.style.transition = 'transform 0.8s ease, opacity 0.8s ease';
      clone.style.transform = `scale(1)`;

      document.body.appendChild(clone);

      requestAnimationFrame(() => {
        clone.style.transform = `translate(${carritoRect.left - rect.left}px, ${carritoRect.top - rect.top}px) scale(0.1)`;
        clone.style.opacity = '0';
      });

      setTimeout(() => {
        document.body.removeChild(clone);
      }, 800);
    }
  };

  return (
    <div className="border p-4 rounded-xl shadow-sm hover:shadow-md transition-all">
      <img src={image} alt={title} className="w-full h-48 object-cover rounded-md mb-2" />
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-600">${price}</p>
      <Button ref={buttonRef} onClick={handleAgregar} className="mt-2 w-full">
        Agregar al carrito
      </Button>
    </div>
  );
}
