import { Controller, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Request() req) {
    const user = await this.authService.validateUser(
      req.body.name,
      req.body.password,
    );
    if (!user) {
      return { message: 'User or Password incorrect' };
    }
    return this.authService.login(user);
  }

  @Post('refresh-token')
  async refreshToken(@Request() req) {
    const refreshToken = req.body.refresh_token;
    try {
      const payload = await this.authService.verifyRefreshToken(refreshToken);
      const newAcessToken = this.authService.generateAcessToken(payload);
      return {
        acess_token: newAcessToken,
      };
    } catch (e) {
      return {
        message: 'Invalid refresh token',
      };
    }
  }
}
