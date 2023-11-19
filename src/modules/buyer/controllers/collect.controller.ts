/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-11-06 20:02:31
 * @Description:
 */
import { CreateCollectDto } from '../../../dto/collect.dto';
import { CollectService } from '../../../modules/collect/collect.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('用户-收藏服务')
@Controller('/buyer/collect')
export class CollectController {
  constructor(private readonly collectService: CollectService) {}

  // 新增收藏
  @ApiOperation({ summary: '新增收藏' })
  @ApiBearerAuth()
  @ApiHeader({ name: 'Authorization', required: true, description: 'token' })
  @UseGuards(AuthGuard('buyer'))
  @Post('/')
  async create(@Req() req, @Body() createCollecDto: CreateCollectDto) {
    const { accountId } = req.user;
    await this.collectService.create(accountId, createCollecDto);
  }

  //删除
  @ApiOperation({ summary: '删除收藏' })
  @ApiBearerAuth()
  @ApiHeader({ name: 'Authorization', required: true, description: 'token' })
  @UseGuards(AuthGuard('buyer'))
  @Delete('/:serviceId')
  async delete(@Req() req, @Param('serviceId') serviceId: string) {
    const { accountId } = req.user;
    
    await this.collectService.remove(+serviceId, accountId);
  }

  //查询用户的所有收藏
  @ApiOperation({ summary: '查询用户的所有收藏' })
  @ApiBearerAuth()
  @ApiHeader({ name: 'Authorization', required: true, description: 'token' })
  @UseGuards(AuthGuard('buyer'))
  @Get('/')
  async findAll(@Req() req) {
    const { accountId } = req.user;
    return await this.collectService.findAll(accountId);
  }

  // 验证用户是否已经收藏
  @ApiOperation({ summary: '验证用户是否已经收藏' })
  @ApiBearerAuth()
  @ApiHeader({ name: 'Authorization', required: true, description: 'token' })
  @UseGuards(AuthGuard('buyer'))
  @Get('/check/:serviceId')
  async check(@Req() req, @Param('serviceId') serviceId: string) {
    const { accountId } = req.user;
    const data = await this.collectService.check(+serviceId, accountId);
    {
      return {
        collected: data ? true : false,
      };
    }
  }
}
