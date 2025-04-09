import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { CognitoIdentityProviderClient, GetUserCommand, AdminGetUserCommand } from '@aws-sdk/client-cognito-identity-provider';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  private cognitoClient: CognitoIdentityProviderClient;

  constructor() {
    this.cognitoClient = new CognitoIdentityProviderClient({
      region: process.env.AWS_REGION,
    });
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);

    if (!token) {
      throw new UnauthorizedException('Token no proporcionado');
    }

    try {
      const response = await this.cognitoClient.send(
        new GetUserCommand({ AccessToken: token })
      );

      if (!response.Username) {
        throw new UnauthorizedException('No se pudo identificar al usuario');
      }

      const roles = await this.getUserRoles(response.Username);

      request.user = {
        id: response.Username,
        email: response.UserAttributes?.find(attr => attr.Name === 'email')?.Value,
        roles: roles
      };

      return true;
    } catch (error) {
      console.error('Error de Cognito:', error);
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }

  private async getUserRoles(username: string): Promise<string[]> {
    try {
      const response = await this.cognitoClient.send(
        new AdminGetUserCommand({
          UserPoolId: process.env.COGNITO_USER_POOL_ID,
          Username: username
        })
      );

      const roles = response.UserAttributes
        ?.filter(attr => attr.Name === 'cognito:groups' || attr.Name === 'custom:roles')
        .flatMap(attr => attr.Value?.split(',') || []);

      return roles || [];
    } catch (error) {
      console.error('Error al obtener roles:', error);
      return [];
    }
  }

  private extractToken(request: any): string | null {
    const authHeader = request.headers.authorization;
    return authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
  }
}