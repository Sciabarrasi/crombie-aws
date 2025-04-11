import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    try {
      return await this.prisma.product.create({
        data: {
          ...createProductDto,
          stock: createProductDto.stock || 0,
        },
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          stock: true,
          category: true,
          createdAt: true,
        }
      });
    } catch (error) {
      throw new BadRequestException('Error al crear el producto');
    }
  }

  async bulkCreate(products: CreateProductDto[]) {
    if (!products || products.length === 0) {
      throw new BadRequestException('La lista de productos no puede estar vacía');
    }

    try {
      return await this.prisma.$transaction(
        products.map(product => 
          this.prisma.product.create({
            data: {
              ...product,
              stock: product.stock || 0,
            },
            select: {
              id: true,
              name: true,
              price: true,
              category: true,
              createdAt: true
            }
          })
        )
      );
    } catch (error) {
      throw new BadRequestException(`Error al crear productos en lote: ${error.message}`);
    }
  }

  async findAll() {
    return this.prisma.product.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        category: true,
        createdAt: true,
      }
    });
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id, deletedAt: null },
      include: { 
        cartItems: false,
        WishlistItem: false,
      }
    });

    if (!product) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.findOne(id);

    try {
      return await this.prisma.product.update({
        where: { id },
        data: updateProductDto,
      });
    } catch (error) {
      throw new BadRequestException('Error al actualizar el producto');
    }
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.product.update({
      where: { id },
      data: { deletedAt: new Date() },
      select: { id: true, name: true, deletedAt: true }
    });
  }

  async updateStock(id: number, quantity: number) {
    if (quantity <= 0) {
      throw new BadRequestException('La cantidad debe ser mayor a 0');
    }

    return this.prisma.$transaction(async (tx) => {
      const product = await tx.product.findUnique({
        where: { id, deletedAt: null },
      });

      if (!product) {
        throw new NotFoundException('Producto no encontrado');
      }
      if (product.stock < quantity) {
        throw new BadRequestException('Stock insuficiente');
      }

      return tx.product.update({
        where: { id },
        data: { stock: { decrement: quantity } },
      });
    });
  }

  async restore(id: number) {
    return this.prisma.product.update({
      where: { id },
      data: { deletedAt: null },
    });
  }
}