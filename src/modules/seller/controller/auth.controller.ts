/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-10-27 23:16:26
 * @Description:
 */
import { AuthService } from '../../auth/auth.service';
import { LoginDto } from '../../../dto/adminer.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('管理员-登陆')
@Controller('/seller/auth')
export class AuthController {
  constructor(protected readonly authService: AuthService) {}
  @Post('/login')
  async login(@Body() LoginDto: LoginDto) {
    return await this.authService.adminerLogin(LoginDto);
  }
}
