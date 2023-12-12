/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-10-27 23:24:46
 * @Description:认证服务
 */
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LoginDto as AdminerLoginDto } from './../../dto/adminer.dto';
import { AccountLoginDto, CreateAccountDto } from '../../dto/account.dto';
import { AdminerService } from '../adminer/adminer.service';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { AccountService } from '../account/account.service';
import { AccountStatusEnum } from '../../enum/column.enum';
@Injectable()
export class AuthService {
  constructor(
    protected readonly adminerServe: AdminerService,
    protected readonly jwtService: JwtService,
    protected readonly accountServe: AccountService,
  ) {}
  //管理员登陆
  async adminerLogin(data: AdminerLoginDto) {
    const { password, adminId } = data;
    const adminInfo = await this.adminerServe.findOne(adminId, true);
    if (adminInfo) {
      const isPasswordValid = await argon.verify(adminInfo.password, password);
      if (isPasswordValid) {
        delete adminInfo.password;
        return await this.jwtService.signAsync({
          adminId,
        });
      } else {
        throw new ForbiddenException('密码错误');
      }
    } else {
      throw new NotFoundException('该用户不存在');
    }
  }

  //用户登陆
  async accountLogin(data: AccountLoginDto) {
    const { password, phone } = data;
    const accountInfo = await this.accountServe.findByPhone(phone);
    if (!accountInfo) {
      throw new NotFoundException('该用户不存在');
    }
    if (accountInfo.status !== AccountStatusEnum.ACTIVED) {
      throw new ForbiddenException('用户账号状态异常');
    }
    const isPasswordValid = await argon.verify(
      (
        await accountInfo
      ).password,
      password,
    );

    if (isPasswordValid) {
      return await this.jwtService.signAsync({
        accountId: accountInfo.accountId,
      });
    } else {
      throw new ForbiddenException('密码错误');
    }
  }

  //对字段进行加密
  async signToken(params: any) {
    return await this.jwtService.signAsync(params);
  }
}
