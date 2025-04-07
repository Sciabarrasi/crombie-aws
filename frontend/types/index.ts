export interface User {
  id: number;
  email: string;
  role: 'ADMIN' | 'USER';
}

export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  image?: string;
  isActive: boolean;
}

export interface WishlistItem {
  id: number;
  userId: number;
  productId: number;
  product: Product;
  createdAt: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface CreateProductDto {
  name: string;
  price: number;
  stock: number;
  category: string;
  image?: string;
}

export interface UpdateProductDto {
  name?: string;
  price?: number;
  stock?: number;
  category?: string;
  image?: string;
}