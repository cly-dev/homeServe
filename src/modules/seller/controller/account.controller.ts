/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-10-27 21:48:53
 * @Description:
 */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AccountService } from '../../account/account.service';
import { SearchAccountDto, UpdateAccountDto } from '../../../dto/account.dto';
import { AccountStatusEnum } from '../../../enum/column.enum';

@ApiTags('管理员-用户管理')
@Controller('/seller/account')
export class AccountController {
  constructor(private readonly AccountService: AccountService) {}
  @UseGuards(AuthGuard('seller'))
  @ApiBearerAuth()
  @ApiHeader({ name: 'Authorization', required: true, description: 'token' })
  @ApiOperation({ summary: '删除用户' })
  @Delete('/:accountId')
  async remove(@Param('accountId') accountId: string) {
    await this.AccountService.remove(accountId);
  }

  @UseGuards(AuthGuard('seller'))
  @ApiBearerAuth()
  @ApiHeader({ name: 'Authorization', required: true, description: 'token' })
  @ApiOperation({ summary: '修改用户账号状态' })
  @ApiBody({
    enum: AccountStatusEnum,
  })
  @Put('/:accountId')
  async update(
    @Param('accountId') accountId,
    @Body() UpdateAccountDto: UpdateAccountDto,
  ) {
    return await this.AccountService.update(accountId, UpdateAccountDto);
  }

  @UseGuards(AuthGuard('seller'))
  @ApiBearerAuth()
  @ApiHeader({ name: 'Authorization', required: true, description: 'token' })
  @ApiOperation({ summary: '查询所有的用户' })
  @Get('/')
  async findAll(@Query() SearchAccountDto: SearchAccountDto) {
    return await this.AccountService.findAll(SearchAccountDto);
  }
}
