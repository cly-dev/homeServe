/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-10-27 23:16:26
 * @Description:
 */
import { AuthService } from '../../auth/auth.service';
import { Body, Controller, Get, Put, Req, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import * as argon2 from 'argon2';
import {
  UpdateAccountDto,
  UpdateAccountInfoDto,
  UpdateAccountLoginInformationDto,
  UpdateAccountPasswordDto,
} from '../../../dto/account.dto';
import { AccountService } from '../../../modules/account/account.service';
import { AuthGuard } from '@nestjs/passport';
@ApiTags('用户-注册登陆')
@Controller('/buyer/account')
export class AccountController {
  constructor(
    protected readonly authService: AuthService,
    protected readonly accountService: AccountService,
  ) {}
  @ApiOperation({ summary: '绑定用户手机和密码' })
  @ApiBearerAuth()
  @ApiHeader({ name: 'Authorization', required: true, description: 'token' })
  @UseGuards(AuthGuard('buyer'))
  @Put('/loginInfomation')
  async updateLoginInformation(
    @Req() req,
    @Body() UpdateAccountLoginInformationDto: UpdateAccountLoginInformationDto,
  ) {
    const { user } = req;
    await this.accountService.updateLoginInformation(
      user.accountId,
      UpdateAccountLoginInformationDto,
    );
  }

  @ApiOperation({ summary: '根据toekn查询用户信息' })
  @ApiBearerAuth()
  @ApiHeader({ name: 'Authorization', required: true, description: 'token' })
  @UseGuards(AuthGuard('buyer'))
  @Get('/')
  async findOne(@Req() req) {
    return req.user;
  }

  @ApiOperation({ summary: '更新用户信息' })
  @ApiBearerAuth()
  @ApiHeader({ name: 'Authorization', required: true, description: 'token' })
  @UseGuards(AuthGuard('buyer'))
  @Put('/')
  async update(@Req() req, @Body() UpdateAccountDto: UpdateAccountInfoDto) {
    const { accountId } = req.user;
    await this.accountService.update(accountId, UpdateAccountDto);
  }

  @ApiOperation({ summary: '更新用户密码' })
  @ApiBearerAuth()
  @ApiHeader({ name: 'Authorization', required: true, description: 'token' })
  @UseGuards(AuthGuard('buyer'))
  @Put('/password')
  async updatePassword(
    @Req() req,
    @Body() updateAccountPasswordDto: UpdateAccountPasswordDto,
  ) {
    const { accountId } = req.user;
    try {
      await this.accountService.updatePassword(
        accountId,
        updateAccountPasswordDto,
      );
    } catch (err) {
      console.log(err);
      console.log('----------------aa');
    }
  }
}
