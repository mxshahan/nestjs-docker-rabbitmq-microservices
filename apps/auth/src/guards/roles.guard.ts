import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    console.log(user);

    return matchRoles(roles, user.role);
  }
}

const matchRoles = (roles: string[], role: string): any => {
  console.log(roles, role);
  if (roles.includes(role)) {
    return true;
  } else {
    throw new UnauthorizedException('Permissionn denied');
  }
};
