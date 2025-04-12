import {
  Controller,
  Post,
  Body,
  HttpStatus,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { CognitoAuthService } from './cognitoAuth.service';
import { LoginAuthDto } from './dto/login.dto';
import { RegisterAuthDto } from './dto/register.dto';
import { ConfirmAuthDto } from './dto/confirm.dto';
import { RefreshDto } from './dto/refresh.dto';
import { AssignRoleDto } from './dto/assign-role.dto';
import { JwtAuthGuard } from './cognito-auth.guard';
import { RolesGuard } from '../custom-decorators/roles.guard';
import { AcceptedRoles } from '../custom-decorators/roles.decorator';
import { Roles } from '@prisma/client';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('cognito-auth')
@ApiBearerAuth()
export class CognitoAuthController {
  constructor(private readonly authService: CognitoAuthService) {}

  @Post('register')
  @ApiOperation({ 
    summary: 'Registrar nuevo usuario',
    description: 'Crea una nueva cuenta de usuario con rol USER por defecto. Requiere confirmación por email'
  })
  @ApiResponse({ 
    status: HttpStatus.CREATED, 
    description: 'Usuario registrado exitosamente. Se envió código de confirmación al email',
    schema: {
      example: {
        statusCode: 201,
        message: 'Registro exitoso. Por favor verifica tu email',
        data: {
          email: 'usuario@ejemplo.com',
          userConfirmed: false,
          role: 'USER'
        }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST, 
    description: 'Error en los datos de registro (email inválido, contraseña débil, etc.)' 
  })
  async register(@Body() registerDto: RegisterAuthDto) {
    const result = await this.authService.signUp(registerDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: result.message,
      data: {
        email: result.email,
        userConfirmed: result.userConfirmed,
        role: result.role
      }
    };
  }

  @Post('login')
  @ApiOperation({ 
    summary: 'Iniciar sesión',
    description: 'Autentica a un usuario y devuelve tokens JWT con su rol'
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Inicio de sesión exitoso. Devuelve accessToken, refreshToken y rol del usuario',
    schema: {
      example: {
        statusCode: 200,
        message: 'Inicio de sesión exitoso',
        data: {
          accessToken: 'token_jwt',
          refreshToken: 'token_refresh',
          expiresIn: 3600,
          idToken: 'token_id',
          role: 'USER'
        }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.UNAUTHORIZED, 
    description: 'Credenciales inválidas o usuario no confirmado' 
  })
  async login(@Body() loginDto: LoginAuthDto) {
    const authResult = await this.authService.signIn(loginDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Inicio de sesión exitoso',
      data: {
        accessToken: authResult.AccessToken,
        refreshToken: authResult.RefreshToken,
        expiresIn: authResult.ExpiresIn,
        idToken: authResult.IdToken,
        role: authResult.role
      }
    };
  }

  @Post('confirm')
  @ApiOperation({ 
    summary: 'Confirmar registro',
    description: 'Valida el código de confirmación enviado por email'
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Usuario confirmado exitosamente. Ya puede iniciar sesión',
    schema: {
      example: {
        statusCode: 200,
        message: 'Usuario confirmado exitosamente',
        data: {
          userConfirmed: true
        }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST, 
    description: 'Código inválido o expirado' 
  })
  async confirm(@Body() confirmDto: ConfirmAuthDto) {
    const result = await this.authService.confirmSignUp(confirmDto);
    return {
      statusCode: HttpStatus.OK,
      message: result.message,
      data: {
        userConfirmed: result.userConfirmed
      }
    };
  }

  @Post('refresh')
  @ApiOperation({ 
    summary: 'Refrescar token de acceso',
    description: 'Obtiene un nuevo accessToken usando el refreshToken'
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Nuevo accessToken generado exitosamente',
    schema: {
      example: {
        statusCode: 200,
        message: 'Token refrescado exitosamente',
        data: {
          accessToken: 'nuevo_token_jwt',
          idToken: 'nuevo_token_id',
          expiresIn: 3600
        }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.UNAUTHORIZED, 
    description: 'RefreshToken inválido o expirado' 
  })
  async refresh(@Body() refreshDto: RefreshDto) {
    const tokens = await this.authService.refreshToken(refreshDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Token refrescado exitosamente',
      data: tokens
    };
  }

  @Post('assign-role')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AcceptedRoles(Roles.ADMIN)
  @ApiOperation({ 
    summary: '[ADMIN] Asignar rol a usuario',
    description: 'Endpoint protegido para asignar roles. Requiere rol ADMIN'
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Rol asignado correctamente al usuario',
    schema: {
      example: {
        statusCode: 200,
        message: 'Rol ADMIN asignado correctamente al usuario usuario@ejemplo.com',
        data: {
          email: 'usuario@ejemplo.com',
          role: 'ADMIN'
        }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST, 
    description: 'Error en la solicitud (email inválido, rol no existente)' 
  })
  @ApiResponse({ 
    status: HttpStatus.UNAUTHORIZED, 
    description: 'No autenticado' 
  })
  @ApiResponse({ 
    status: HttpStatus.FORBIDDEN, 
    description: 'No autorizado (requiere rol ADMIN)' 
  })
  async assignRole(@Body() assignRoleDto: AssignRoleDto) {
    const result = await this.authService.assignUserRole(assignRoleDto.email, assignRoleDto.role);
    return {
      statusCode: HttpStatus.OK,
      message: result.message,
      data: {
        email: assignRoleDto.email,
        role: assignRoleDto.role
      }
    };
  }

  @Get('check-email/:email')
  @ApiOperation({ 
    summary: 'Verificar disponibilidad de email',
    description: 'Comprueba si un email ya está registrado en el sistema'
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Disponibilidad del email',
    schema: {
      example: {
        statusCode: 200,
        available: true,
        message: 'El email está disponible'
      }
    }
  })
  async checkEmail(@Param('email') email: string) {
    const isAvailable = await this.authService.checkEmailAvailability(email);
    return {
      statusCode: HttpStatus.OK,
      available: isAvailable,
      message: isAvailable ? 'El email está disponible' : 'El email ya está registrado'
    };
  }
}