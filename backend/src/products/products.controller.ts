import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from 'src/cognito-auth/cognito-auth.guard';
import { RolesGuard } from 'src/custom-decorators/roles.guard';
import { AcceptedRoles } from 'src/custom-decorators/roles.decorator';
import { Roles } from '@prisma/client';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductsController { 
  constructor(private readonly productsService: ProductsService) {}

  //endpoint público
  @Get()
  @ApiOperation({
    summary: 'Listar todos los productos (Público)',
    description: 'Endpoint accesible para cualquier usuario, sin necesidad de autenticación.'
  })
  @ApiResponse({ status: 200, description: 'Lista de productos retornada' })
  findAll() {
    return this.productsService.findAll();
  }

  //endpoint público
  @Get(':id')
  @ApiOperation({ summary: 'Obtener un producto por un ID (Público)' })
  @ApiResponse({ status: 200, description: 'Producto encontrado' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  findOne(@Param(':id') id: string) {
    return this.productsService.findOne(+id);
  }

  //método exlusivo de ADMIN
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AcceptedRoles(Roles.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Crear un producto (Admin)',
    description: 'Requiere rol ADMIN.'
  })
  @ApiResponse({ status: 201, description: 'Producto creado' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AcceptedRoles(Roles.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Actualizar un producto (Admin)',
    description: 'Requiere rol ADMIN.' })
  @ApiResponse({ status: 200, description: 'Producto actualizado' })
  @ApiResponse({ status: 404, description: 'El producto no existe' })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AcceptedRoles(Roles.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Eliminar un producto (ADMIN)',
    description: 'Soft delete. Requiere rol ADMIN.'
  })
  @ApiResponse({ status: 200, description: 'Producto marcado como eliminado' })
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}