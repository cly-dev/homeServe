/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-10-27 23:16:26
 * @Description:
 */
import { AuthService } from '../../auth/auth.service';
import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  InternalServerErrorException,
  Param,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateAccountDto, AccountLoginDto } from '../../../dto/account.dto';
import { AccountService } from '../../../modules/account/account.service';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { AppEnum } from '../../../enum/config.enum';
import { JwtService } from '@nestjs/jwt';
import { AccountStatusEnum } from '../../../enum/column.enum';
@ApiTags('公共-用户注册登陆')
@Controller('/public/auth')
export class AuthController {
  constructor(
    protected readonly authService: AuthService,
    protected readonly accountService: AccountService,
    protected readonly configService: ConfigService,
    protected readonly jwtService: JwtService,
  ) {}
  @ApiOperation({ summary: '用户注册-微信用户' })
  @Post('/signUp')
  async signUp(@Body() CreateAccountDto: CreateAccountDto) {
    const code = CreateAccountDto.code;
    const data = (
      await axios.get(
        `https://api.weixin.qq.com/sns/jscode2session?appid=${this.configService.get(
          AppEnum.APP_ID,
        )}&secret=${this.configService.get(
          AppEnum.APP_SECRET,
        )}&js_code=${code}&grant_type=authorization_code`,
      )
    )['data'];
    const userData = await this.accountService.findOne(data.openid);
    if (userData) {
      if (userData.status !== AccountStatusEnum.ACTIVED) {
        throw new ForbiddenException('用户状态异常,无法登录');
      }
      return await this.authService.signToken({ accountId: data.openid });
    } else {
      return await this.accountService.create({
        ...CreateAccountDto,
        code: data.openid,
      });
    }
  }

  @ApiOperation({ summary: '用户登陆' })
  @Post('/login')
  async login(@Body() AccountLoginDto: AccountLoginDto) {
    return await this.authService.accountLogin(AccountLoginDto);
  }
}
