/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-10-11 22:15:22
 * @Description:
 */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { KEYMAP } from '../../enum/config.enum';

@Injectable()
export class BuyerStategy extends PassportStrategy(Strategy, 'buyer') {
  constructor(
    private readonly authService: AuthService,
    protected readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get(KEYMAP.SECRETKEY),
    });
  }

  async validate(payload: { password: string; email: string }) {
    const user = {};
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
    // const user;
  }
}
