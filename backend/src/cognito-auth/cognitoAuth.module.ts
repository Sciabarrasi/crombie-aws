import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { CognitoAuthService } from "./cognitoAuth.service";
import { CognitoAuthController } from "./cognitoAuth.controller";
import { JwtAuthGuard } from "./cognito-auth.guard";
import { UserService } from "src/user/user.service";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
    imports: [
        ConfigModule.forRoot(),
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'supersecret',
            signOptions: { expiresIn: '1h' }
        }),
    ],
    controllers: [CognitoAuthController],
    providers: [
        CognitoAuthService,
        UserService,
        PrismaService,
        JwtAuthGuard,
    ],
    exports: [
        JwtAuthGuard,
        CognitoAuthService,
    ],
})
export class CognitoAuthModule {}