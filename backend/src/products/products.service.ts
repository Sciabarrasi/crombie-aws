import {
  Injectable,
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  /// LOGICA PARA EL ROLE ADMIN
  async create(adminId: number, createProductDto: CreateProductDto) {
    if (!adminId) {
      throw new UnauthorizedException('Usuario no autenticado');
    }
    await this.validateAdmin(adminId);

    return this.prisma.product.create({
      data: { ...createProductDto, isActive: true },
    });
  }

  async update(
    adminId: number,
    id: number,
    updateProductDto: UpdateProductDto,
  ) {
    if (!adminId) {
      throw new UnauthorizedException('Usuario no autenticado');
    }
    await this.validateAdmin(adminId);

    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async remove(adminId: number, id: number) {
    if (!adminId) {
      throw new UnauthorizedException('Usuario no autenticado');
    }
    await this.validateAdmin(adminId);

    return this.prisma.product.update({
      where: { id },
      data: { isActive: false },
    });
  }

  ///LOGICA PARA EL ROLE USER
  async findAll() {
    return this.prisma.product.findMany({
      where: { isActive: true },
      select: {
        id: true,
        name: true,
        price: true,
        category: true,
        image: true,
      },
    });
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id, isActive: true },
    });

    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }

    return product;
  }

  // VALIDACIONES
  private async validateAdmin(userId: number) {
    if (!userId) {
      throw new UnauthorizedException('Usuario no autenticado');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    if (user.role !== 'ADMIN') {
      throw new ForbiddenException('Solo ADMIN puede realizar esta acción');
    }
  }

  async validateProductStock(productId: number): Promise<boolean> {
    const product = await this.prisma.product.findUnique({
      where: { id: productId, isActive: true },
      select: { stock: true },
    });

    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }

    return product?.stock > 0;
  }

  async addToWishlist(userId: number, productId: number) {
    // Verificar si el producto existe
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }

    // Verificar si el producto ya está en la wishlist
    const existingWishlistItem = await this.prisma.wishlist.findUnique({
      where: {
        userId_productId: {
          userId: userId,
          productId: productId,
        },
      },
    });

    if (existingWishlistItem) {
      throw new BadRequestException('El producto ya está en tu wishlist');
    }

    // Agregar el producto a la wishlist
    return this.prisma.wishlist.create({
      data: {
        userId: userId,
        productId: productId,
      },
      include: {
        product: true,
      },
    });
  }

  async removeFromWishlist(userId: number, productId: number) {
    const wishlistItem = await this.prisma.wishlist.findUnique({
      where: {
        userId_productId: {
          userId: userId,
          productId: productId,
        },
      },
    });

    if (!wishlistItem) {
      throw new NotFoundException('El producto no está en tu wishlist');
    }

    return this.prisma.wishlist.delete({
      where: {
        userId_productId: {
          userId: userId,
          productId: productId,
        },
      },
    });
  }

  async getWishlist(userId: number) {
    return this.prisma.wishlist.findMany({
      where: {
        userId: userId,
      },
      include: {
        product: true,
      },
    });
  }
}
