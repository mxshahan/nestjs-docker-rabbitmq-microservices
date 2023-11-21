import { Controller, Headers, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt.guard';
import { CurrentUser } from './user/user.decorator';
import { Auth0Respose } from './auth.interface';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(JwtAuthGuard)
  async login(
    @CurrentUser() user: Auth0Respose,
    @Res() response: Response,
    @Headers() headers,
  ) {
    const loggedInUser = await this.authService.login(user, response, headers);
    return response.json({
      message: 'Login successful',
      success: true,
      user: loggedInUser,
    });
  }

  @Post('register')
  @UseGuards(JwtAuthGuard)
  register(@CurrentUser() user: Auth0Respose) {
    return this.authService.register(user);
  }
}
