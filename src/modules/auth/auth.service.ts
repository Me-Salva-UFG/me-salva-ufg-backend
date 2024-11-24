import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { jwtConstants } from './constants';
import { UserService } from '../user/services/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(name: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(name);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      name: user.name,
      sub: user.id,
    };
    return {
      acess_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, {
        secret: jwtConstants.secret,
        expiresIn: '1d',
      }),
    };
  }
  async verifyRefreshToken(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      return payload;
    } catch (e) {
      throw new Error('Token de refresh inválido');
    }
  }
  generateAcessToken(payload: any) {
    return this.jwtService.sign(
      { name: payload.name, sub: payload.sub },
      { expiresIn: '10m' },
    );
  }
}
