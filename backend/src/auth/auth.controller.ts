import { 
    Controller, 
    Post, 
    Body, 
    HttpCode, 
    UnauthorizedException,
    ConflictException 
  } from '@nestjs/common';
  import { AuthService } from './auth.service';
  import { RegisterDto } from './dto/register.dto';
  import { LoginDto } from './dto/login.dto';
  import { JwtService } from '@nestjs/jwt';
  import { Role } from '@prisma/client';
  
  @Controller('auth')
  export class AuthController {
    constructor(
      private readonly authService: AuthService,
      private readonly jwtService: JwtService 
    ) {}
  
    @Post('register')
    async register(@Body() dto: RegisterDto) {
      try {
        return await this.authService.register(
          dto.email, 
          dto.password, 
          dto.role || Role.USER // Valor por defecto USER si no se especifica
        );
      } catch (error) {
        if (error instanceof ConflictException) {
          throw new ConflictException('El email ya está registrado');
        }
        throw error;
      }
    }
  
    @Post('login')
    @HttpCode(200)
    async login(@Body() dto: LoginDto) {
      const user = await this.authService.validateUser(dto.email, dto.password);
      if (!user) {
        throw new UnauthorizedException('Credenciales inválidas');
      }
      
      const payload = { 
        sub: user.id, 
        email: user.email, 
        role: user.role 
      };
  
      return {
        access_token: this.jwtService.sign(payload),
        user: {
          id: user.id,
          email: user.email,
          role: user.role
        }
      };
    }
  }