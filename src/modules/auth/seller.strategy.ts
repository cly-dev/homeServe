/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-10-11 22:15:22
 * @Description:
 */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { KEYMAP } from '../../enum/config.enum';
import { AdminerService } from '../adminer/adminer.service';

@Injectable()
export class SellerStategy extends PassportStrategy(Strategy, 'seller') {
  constructor(
    protected readonly adminerServe: AdminerService,
    protected readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get(KEYMAP.SECRETKEY),
    });
  }

  async validate(payload: { adminId: string }) {
    const adminerInfo = await this.adminerServe.findOne(payload.adminId);
    if (!adminerInfo) {
      throw new UnauthorizedException();
    }
    return adminerInfo;
    // const user;
  }
}
