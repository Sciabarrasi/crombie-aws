import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma/prisma.module";
import { ProductsModule } from "./products/products.module";
import { ItemsModule } from "./items/items.module";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { CognitoAuthController } from "./cognito-auth/cognitoAuth.controller";
import { CognitoAuthModule } from "./cognito-auth/cognitoAuth.module";

@Module({
  imports: [
    PrismaModule,
    ProductsModule,
    ItemsModule,
    UserModule,
    AuthModule,
    CognitoAuthModule,
    CognitoAuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}