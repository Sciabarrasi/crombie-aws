'use client';

import { useState } from 'react';

export function useCart() {
  const [loading, setLoading] = useState(false);
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  async function addToCart(productId: string, quantity: number = 1) {
    if (!token) throw new Error('Usuario no autenticado');

    setLoading(true);
    try {
      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Error al agregar al carrito');
      }

      return await res.json();
    } finally {
      setLoading(false);
    }
  }

  return { addToCart, loading };
}
