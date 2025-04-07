import { useEffect, useState } from 'react';
import { Product, WishlistItem } from '@/types';
import { productService } from '@/lib/services/api';
import { useAuth } from '@/lib/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, HeartIcon } from 'lucide-react';

export function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    loadProducts();
    if (isAuthenticated) {
      loadWishlist();
    }
  }, [isAuthenticated]);

  const loadProducts = async () => {
    try {
      const data = await productService.getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
    }
  };

  const loadWishlist = async () => {
    try {
      const data = await productService.getWishlist();
      setWishlist(data);
    } catch (error) {
      console.error('Error loading wishlist:', error);
    }
  };

  const toggleWishlist = async (productId: number) => {
    try {
      const isInWishlist = wishlist.some(item => item.productId === productId);
      if (isInWishlist) {
        await productService.removeFromWishlist(productId);
        setWishlist(wishlist.filter(item => item.productId !== productId));
      } else {
        const newItem = await productService.addToWishlist(productId);
        setWishlist([...wishlist, newItem]);
      }
    } catch (error) {
      console.error('Error toggling wishlist:', error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {products.map((product) => (
        <Card key={product.id}>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              {product.name}
              {isAuthenticated && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleWishlist(product.id)}
                >
                  {wishlist.some(item => item.productId === product.id) ? (
                    <HeartIcon className="h-4 w-4 text-red-500 fill-current" />
                  ) : (
                    <HeartIcon className="h-4 w-4" />
                  )}
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <img
              src={product.image || 'https://via.placeholder.com/150'}
              alt={product.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <p className="text-lg font-semibold">${product.price}</p>
            <p className="text-sm text-gray-500">Stock: {product.stock}</p>
            <p className="text-sm text-gray-500">Categoría: {product.category}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 