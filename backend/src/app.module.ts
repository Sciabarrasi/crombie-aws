import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma/prisma.module";
import { ProductsModule } from "./products/products.module";
import { ItemsModule } from "./items/items.module";
import { UserModule } from "./user/user.module";
import { ConfigModule } from "@nestjs/config";
import { CognitoAuthModule } from "./cognito-auth/cognitoAuth.module";
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    ProductsModule,
    ItemsModule,
    UserModule,
    CognitoAuthModule,
    CloudinaryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}