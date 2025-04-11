//corresponderia a la ruta dashboard para el admin
import { Controller, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from 'src/cognito-auth/cognito-auth.guard';
import { RolesGuard } from 'src/custom-decorators/roles.guard';
import { AcceptedRoles } from 'src/custom-decorators/roles.decorator';
import { Roles } from '@prisma/client';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Products - Admin Dashboard')
@Controller('dashboard/products')
@UseGuards(JwtAuthGuard, RolesGuard)
@AcceptedRoles(Roles.ADMIN)
@ApiBearerAuth()
export class AdminProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post('upload')
    @ApiOperation({
        summary: '[ADMIN] Carga MASIVA de productos',
        description: 'Endpoint protegido para crear múltiples productos. Requiere rol ADMIN',
    })
    @ApiResponse({ status: 201, description: 'Productos creados correctamente' })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    bulkUpload(@Body() products: CreateProductDto[]) {
        return this.productsService.bulkCreate(products);
    }

    @Post()
    @ApiOperation({ summary: '[ADMIN] Crear un producto' })
    @ApiResponse({ status: 201, description: 'Producto creado correctamente' })
    create(@Body() createProductDto: CreateProductDto) {
        return this.productsService.create(createProductDto);
    }

    @Patch(':id')
    @ApiOperation({ summary: '[ADMIN] Actualizar un producto' })
    @ApiResponse({ status: 200, description: 'Producto actualizado correctamente' })
    @ApiResponse({ status: 404, description: 'Producto no encontrado' })
    update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
        return this.productsService.update(+id, updateProductDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: '[ADMIN] Eliminar un producto (soft delete)' })
    @ApiResponse({ status: 200, description: 'Producto marcado como eliminado' })
    remove(@Param('id') id: string) {
        return this.productsService.remove(+id);
    }
}