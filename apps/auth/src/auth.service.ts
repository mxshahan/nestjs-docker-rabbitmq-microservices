import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user/user.service';
import { Auth0Respose } from './auth.interface';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}
  async login(payload: Auth0Respose, response: Response, headers) {
    const user = await this.userService.getUser({ auth0uid: payload.sub });
    if (user) {
      const expires = new Date();
      expires.setHours(
        expires.getHours() + this.configService.get('JWT_EXPIRES_IN') * 24,
      );

      const token = headers['authorization'];

      response.cookie('authorization', token, {
        httpOnly: true,
        expires,
      });

      return user;
    } else {
      throw new UnauthorizedException('Authentication failed!');
    }
  }

  async register(payload: Auth0Respose) {
    return this.userService.createUser({ auth0uid: payload.sub });
  }
}
