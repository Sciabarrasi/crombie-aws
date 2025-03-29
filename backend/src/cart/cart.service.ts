import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ProductsService } from '../products/products.service';

@Injectable()
export class CartService {
  constructor(
    private prisma: PrismaService,
    private productsService: ProductsService,
  ) {}

  async addToCart(userId: number, productId: number) {
    const hasStock = await this.productsService.validateProductStock(productId);
    if (!hasStock) throw new ConflictException('Producto sin stock disponible');

    return this.prisma.cart.upsert({
      where: { userId_productId: { userId, productId } },
      create: { userId, productId, quantity: 1 },
      update: {},
    });
  }

  async removeFromCart(userId: number, productId: number) {
    return this.prisma.cart.delete({
      where: { userId_productId: { userId, productId } },
    });
  }

  async getCart(userId: number) {
    return this.prisma.cart.findMany({
      where: { userId },
      include: { product: true },
    });
  }
}