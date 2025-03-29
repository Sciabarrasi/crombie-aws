import { Controller, Get, Post, Delete, UseGuards, Param } from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from '../decorators/get-user.decorator';

@Controller('cart')
@UseGuards(JwtAuthGuard) 
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  getCart(@GetUser('id') userId: number) {
    return this.cartService.getCart(userId);
  }

  @Post(':productId')
  addToCart(
    @GetUser('id') userId: number,
    @Param('productId') productId: string,
  ) {
    return this.cartService.addToCart(userId, +productId);
  }

  @Delete(':productId')
  removeFromCart(
    @GetUser('id') userId: number,
    @Param('productId') productId: string,
  ) {
    return this.cartService.removeFromCart(userId, +productId);
  }
}