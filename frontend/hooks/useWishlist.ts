'use client';

import { useState } from 'react';

export function useWishlist() {
  const [loading, setLoading] = useState(false);
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  async function addToWishlist(productId: string) {
    if (!token) throw new Error('Usuario no autenticado');

    setLoading(true);
    try {
      const res = await fetch(`/api/wishlist/${productId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Error al agregar a favoritos');
      }

      return await res.json();
    } finally {
      setLoading(false);
    }
  }

  return { addToWishlist, loading };
}
