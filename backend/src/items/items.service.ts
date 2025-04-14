import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ItemsService { 
  constructor(private prisma: PrismaService) {}

  async addToCart(userId: string, productId: string, quantity: number = 1) {
    return this.prisma.$transaction(async (tx) => {
      const product = await tx.product.findUnique({
        where: { id: productId, deletedAt: null },
      });
      
      if (!product) throw new NotFoundException('Producto no encontrado');
      if (product.stock < quantity) throw new BadRequestException('Stock insuficiente');
    
      const existingItem = await tx.cartItem.findFirst({
        where: { userId, productId },
      });

      if (existingItem) {
        if (product.stock < existingItem.quantity + quantity) {
          throw new BadRequestException('Stock insuficiente para la cantidad solicitada');
        }

        // Actualizar el stock del producto
        await tx.product.update({
          where: { id: productId },
          data: { stock: { decrement: quantity } }
        });

        return tx.cartItem.update({
          where: { id: existingItem.id },
          data: { quantity: { increment: quantity } },
          include: { product: true }
        });
      }

      // Actualizar el stock del producto
      await tx.product.update({
        where: { id: productId },
        data: { stock: { decrement: quantity } }
      });

      return tx.cartItem.create({
        data: { userId, productId, quantity },
        include: { product: true }
      });
    });
  }

  async getCart(userId: string) {
    return this.prisma.cartItem.findMany({
      where: { userId },
      include: { product: true }
    });
  }

  async updateCartItem(itemId: string, quantity: number) {
    if (quantity <= 0) {
      return this.removeCartItem(itemId);
    }

    return this.prisma.$transaction(async (tx) => {
      const cartItem = await tx.cartItem.findUnique({
        where: { id: itemId },
        include: { product: true }
      });

      if (!cartItem) {
        throw new NotFoundException('Item no encontrado en el carrito');
      }

      const product = await tx.product.findUnique({
        where: { id: cartItem.productId, deletedAt: null }
      });

      if (!product) {
        throw new NotFoundException('Producto no encontrado');
      }

      const stockDifference = quantity - cartItem.quantity;
      if (product.stock < stockDifference) {
        throw new BadRequestException('Stock insuficiente para la cantidad solicitada');
      }

      // Actualizar el stock del producto
      await tx.product.update({
        where: { id: cartItem.productId },
        data: { stock: { decrement: stockDifference } }
      });

      return tx.cartItem.update({
        where: { id: itemId },
        data: { quantity },
        include: { product: true }
      });
    });
  }

  async removeCartItem(itemId: string) {
    return this.prisma.$transaction(async (tx) => {
      const cartItem = await tx.cartItem.findUnique({
        where: { id: itemId },
        include: { product: true }
      });

      if (!cartItem) {
        throw new NotFoundException('Item no encontrado en el carrito');
      }

      // Restaurar el stock del producto
      await tx.product.update({
        where: { id: cartItem.productId },
        data: { stock: { increment: cartItem.quantity } }
      });

      return tx.cartItem.delete({
        where: { id: itemId }
      });
    });
  }

  //parte de la wishlist
  async addToWishlist(userId: string, productId: string) {
    return this.prisma.wishlistItem.create({
      data: { userId, productId },
      include: { product: true }
    });
  }

  async getWishlist(userId: string) {
    return this.prisma.wishlistItem.findMany({
      where: { userId },
      include: { product: true}
    });
  }

  async removeFromWishlist(itemId: string) {
    return this.prisma.wishlistItem.delete({
      where: { id: itemId }
    });
  }
}