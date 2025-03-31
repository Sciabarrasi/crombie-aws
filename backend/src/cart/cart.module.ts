import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { ProductsModule } from '../products/products.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, ProductsModule, AuthModule], 
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}