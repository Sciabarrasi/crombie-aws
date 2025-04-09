import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ItemsService } from './items.service';
import { JwtAuthGuard } from '../cognito-auth/cognito-auth.guard';
import { RolesGuard } from '../custom-decorators/roles.guard';
import { AcceptedRoles } from '../custom-decorators/roles.decorator';
import { Roles } from '@prisma/client';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('User Items')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@AcceptedRoles(Roles.USER, Roles.ADMIN)
@Controller('items')
export class ItemsController { 
  constructor(private readonly itemsService: ItemsService) {}
  
  @Post('cart')
  async addToCart(
    @Request() req,
    @Body() body: { productId: number, quantity?: number }
  ) {
    if (!req.user?.id) {
      throw new Error('Usuario no autenticado correctamente');
    }
    return this.itemsService.addToCart(req.user.id, body.productId, body.quantity);
  }

  @Get('cart')
  async getCart(@Request() req) {
    if (!req.user?.id) {
      throw new Error('Usuario no autenticado correctamente');
    }
    return this.itemsService.getCart(req.user.id);
  }

  @Delete('cart/:id')
  async removeFromCart(@Param('id') id: string) {
    return this.itemsService.removeCartItem(+id);
  }

  @Post('wishlist')
  async addToWishlist(@Request() req, @Body() body: { productId: number }) {
    if (!req.user?.id) {
      throw new Error('Usuario no autenticado correctamente');
    }
    return this.itemsService.addToWishlist(req.user.id, body.productId);
  }

  @Get('wishlist')
  async getWishlist(@Request() req) {
    if (!req.user?.id) {
      throw new Error('Usuario no autenticado correctamente');
    }
    return this.itemsService.getWishlist(req.user.id);
  }

  @Delete('wishlist/:id')
  async removeFromWishlist(@Param('id') id: string) {
    return this.itemsService.removeFromWishlist(+id);
  }
}