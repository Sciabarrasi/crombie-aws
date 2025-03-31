import { Controller, Get, Post, Body, Param, Delete, Patch, UseGuards, Request, Req } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from 'src/decorators/get-user.decorator';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findaAll() {
    return this.productsService.findAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@GetUser() user: any, @Body() createProductDto: CreateProductDto) {
    return this.productsService.create(user.id, createProductDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @GetUser() user: any,
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(user.id, +id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@GetUser() user: any, @Param('id') id: string) {
    return this.productsService.remove(user.id, +id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/wishlist')
  addToWishlist(@GetUser('id') userId: number, @Param('id') id: string) {
    return this.productsService.addToWishlist(userId, +id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id/wishlist')
  removeFromWishlist(@GetUser('id') userId: number, @Param('id') id: string) {
    return this.productsService.removeFromWishlist(userId, +id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('wishlist')
  getWishlist(@GetUser('id') userId: number) {
    return this.productsService.getWishlist(userId);
  }
}