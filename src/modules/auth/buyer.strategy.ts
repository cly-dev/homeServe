/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-10-11 22:15:22
 * @Description:
 */
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { KEYMAP } from '../../enum/config.enum';
import { AccountService } from './../account/account.service';

@Injectable()
export class BuyerStategy extends PassportStrategy(Strategy, 'buyer') {
  constructor(
    private readonly AccountService: AccountService,
    protected readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get(KEYMAP.SECRETKEY),
    });
  }

  async validate(payload: { phone: string }) {
    const user = await this.AccountService.findOne(payload.phone);
    if (!user) {
      throw new NotFoundException('该用户不存在');
    }
    if (user.status !== '1') {
      throw new ForbiddenException('用户账号异常,无法登录');
    }
    return user;
  }
}
