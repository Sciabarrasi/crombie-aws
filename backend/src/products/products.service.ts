import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  /// LOGICA PARA EL ROLE ADMIN
  async create(adminId: number, createProductDto: CreateProductDto) {
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
    await this.validateAdmin(adminId);

    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async remove(adminId: number, id: number) {
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

  // VALIDACIONES
  private async validateAdmin(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    if (user?.role !== 'ADMIN') {
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
}
