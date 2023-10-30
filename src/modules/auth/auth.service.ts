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
import { AdminerService } from '../adminer/adminer.service';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    protected readonly adminerServe: AdminerService,
    protected readonly jwtService: JwtService,
  ) {}
  //管理员登陆
  async adminerLogin(data: AdminerLoginDto) {
    const { password, adminId } = data;
    const adminInfo = await this.adminerServe.findOne(adminId);
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
}
