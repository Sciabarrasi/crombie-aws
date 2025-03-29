import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<Role[]>(
      ROLES_KEY,
      context.getHandler(),
    );
    if (!requiredRoles) return true; // Si no hay roles requeridos, permite el acceso

    const request = context.switchToHttp().getRequest();
    const user = request.user; // asume que el usuario está adjunto en la request (necesitas autenticación JWT previamente)

    if (!user?.role) throw new ForbiddenException('Usuario no autorizado');

    // verifica si el usuario tiene uno de los roles requeridos
    const hasRole = requiredRoles.some((role) => user.role === role);
    if (!hasRole) {
      throw new ForbiddenException(
        'No tienes permisos para acceder a este recurso',
      );
    }
    return true;
  }
}