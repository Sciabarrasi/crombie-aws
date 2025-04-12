import { 
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { 
  CognitoIdentityProviderClient, 
  InitiateAuthCommand, 
  SignUpCommand, 
  ConfirmSignUpCommand,
  AdminAddUserToGroupCommand,
  AdminGetUserCommand
} from '@aws-sdk/client-cognito-identity-provider';
import { ConfigService } from '@nestjs/config';
import { LoginAuthDto } from './dto/login.dto';
import { RegisterAuthDto } from './dto/register.dto';
import { ConfirmAuthDto } from './dto/confirm.dto';
import { RefreshDto } from './dto/refresh.dto';
import { Roles } from '@prisma/client';

@Injectable()
export class CognitoAuthService {
  private cognitoClient: CognitoIdentityProviderClient;
  private userPoolId: string;
  private clientId: string;

  constructor(private configService: ConfigService) {
    this.cognitoClient = new CognitoIdentityProviderClient({
      region: this.configService.get<string>('AWS_REGION'),
    });
    this.userPoolId = this.configService.get<string>('COGNITO_USER_POOL_ID') ?? '';
    this.clientId = this.configService.get<string>('COGNITO_CLIENT_ID') ?? '';
  }

  async signUp(registerDto: RegisterAuthDto): Promise<any> {
    try {
      const username = this.generateRandomUsername();

      const userAttributes = [
        { Name: 'email', Value: registerDto.email }
      ];

      // 1. Registrar el usuario en Cognito
      const signUpCommand = new SignUpCommand({
        ClientId: this.clientId,
        Username: username,
        Password: registerDto.password,
        UserAttributes: userAttributes,
      });

      const result = await this.cognitoClient.send(signUpCommand);
      
      // 2. Asignar automáticamente al grupo USER en Cognito
      await this.addUserToGroup(registerDto.email, Roles.USER);

      return {
        ...result,
        generatedUsername: username,
        email: registerDto.email,
        role: Roles.USER, // Rol por defecto
        userConfirmed: false,
        message: 'Registro exitoso. Por favor verifica tu email con el código de confirmación.'
      };
    } catch (error) {
      if (error.name === 'UsernameExistsException') {
        throw new BadRequestException('El usuario ya existe');
      }
      if (error.name === 'InvalidPasswordException') {
        throw new BadRequestException('La contraseña no cumple los requisitos');
      }
      throw new BadRequestException(error.message || 'Error en el registro');
    }
  }

  private async addUserToGroup(email: string, groupName: string): Promise<void> {
    try {
      const command = new AdminAddUserToGroupCommand({
        UserPoolId: this.userPoolId,
        Username: email,
        GroupName: groupName
      });
      await this.cognitoClient.send(command);
    } catch (error) {
      console.error('Error al asignar grupo al usuario:', error);
      throw new InternalServerErrorException('Error al asignar rol al usuario');
    }
  }

  async assignUserRole(email: string, role: Roles): Promise<{ message: string }> {
    try {
      // Verificar si el usuario existe
      await this.getUser(email);
      
      // Asignar el nuevo rol
      await this.addUserToGroup(email, role);
      
      return { 
        message: `Rol ${role} asignado correctamente al usuario ${email}`,
      };
    } catch (error) {
      if (error.name === 'UserNotFoundException') {
        throw new BadRequestException('Usuario no encontrado');
      }
      throw new InternalServerErrorException('Error al asignar el rol');
    }
  }

  private async getUser(email: string): Promise<any> {
    const command = new AdminGetUserCommand({
      UserPoolId: this.userPoolId,
      Username: email
    });
    return await this.cognitoClient.send(command);
  }

  async checkEmailAvailability(email: string): Promise<boolean> {
    try {
      await this.getUser(email);
      return false; // El usuario existe
    } catch (error) {
      if (error.name === 'UserNotFoundException') {
        return true; // El usuario no existe (email disponible)
      }
      throw new InternalServerErrorException('Error al verificar el email');
    }
  }

  async confirmSignUp(confirmDto: ConfirmAuthDto): Promise<any> {
    try {
      const command = new ConfirmSignUpCommand({
        ClientId: this.clientId,
        Username: confirmDto.email,
        ConfirmationCode: confirmDto.pin,
      });
      
      const result = await this.cognitoClient.send(command);
      
      return {
        ...result,
        message: 'Usuario confirmado exitosamente',
        userConfirmed: true
      };
    } catch (error) {
      if (error.name === 'CodeMismatchException') {
        throw new BadRequestException('Código de verificación incorrecto');
      }
      if (error.name === 'ExpiredCodeException') {
        throw new BadRequestException('Código de verificación expirado');
      }
      throw new BadRequestException(error.message || 'Error al confirmar el registro');
    }
  }

  async signIn(loginDto: LoginAuthDto): Promise<any> {
    try {
      const command = new InitiateAuthCommand({
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: this.clientId,
        AuthParameters: {
          USERNAME: loginDto.email,
          PASSWORD: loginDto.password,
        },
      });
      
      const response = await this.cognitoClient.send(command);
      
      // Obtener el rol del usuario
      const userGroups = await this.getUserGroups(loginDto.email);
      const role = userGroups.length > 0 ? userGroups[0] : Roles.USER;
      
      return {
        ...response.AuthenticationResult,
        role: role
      };
    } catch (error) {
      if (error.name === 'NotAuthorizedException') {
        throw new UnauthorizedException('Credenciales inválidas');
      } 
      if (error.name === 'UserNotFoundException') {
        throw new UnauthorizedException('Usuario no encontrado');
      }
      if (error.name === 'UserNotConfirmedException') {
        throw new UnauthorizedException('Usuario no confirmado');
      }
      throw new InternalServerErrorException('Error en la autenticación');
    }
  }

  private async getUserGroups(email: string): Promise<string[]> {
    // Implementación para obtener los grupos del usuario
    // Esto puede requerir una llamada adicional a Cognito
    // Por simplicidad, asumimos que el usuario está en un solo grupo (su rol)
    try {
      const user = await this.getUser(email);
      return [Roles.USER]; // Implementación básica
    } catch (error) {
      return [Roles.USER]; // Por defecto
    }
  }

  async refreshToken(refreshTokenDto: RefreshDto): Promise<any> {
    try {
      const command = new InitiateAuthCommand({
        AuthFlow: 'REFRESH_TOKEN_AUTH',
        ClientId: this.clientId,
        AuthParameters: {
          REFRESH_TOKEN: refreshTokenDto.refreshToken,
        },
      });

      const response = await this.cognitoClient.send(command);
      return {
        accessToken: response.AuthenticationResult?.AccessToken,
        idToken: response.AuthenticationResult?.IdToken,
        expiresIn: response.AuthenticationResult?.ExpiresIn,
      };
    } catch (error) {
      if (error.name === 'NotAuthorizedException') {
        throw new UnauthorizedException('Token de refresco inválido o expirado');
      }
      throw new InternalServerErrorException('Error al refrescar el token');
    }
  }

  private generateRandomUsername(): string {
    const randomString = Math.random().toString(36).substring(2, 10);
    return `user_${randomString}`;
  }

  private isEmail(value: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  }
}