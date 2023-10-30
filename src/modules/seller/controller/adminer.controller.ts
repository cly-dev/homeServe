/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-10-27 21:48:53
 * @Description:
 */
import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateAdminerDto } from '../../../dto/adminer.dto';
import { AdminerService } from '../../adminer/adminer.service';
import { PageSizeDto } from '../../../dto/common.dto';

@ApiTags('管理员-账号')
@Controller('/seller/adminer')
export class AdminerController {
  constructor(private readonly adminerService: AdminerService) {}
  @ApiOperation({ summary: '新增管理员' })
  @Post('/')
  async create(@Body() CreateAdminerDto: CreateAdminerDto) {
    await this.adminerService.create(CreateAdminerDto);
  }

  @ApiOperation({ summary: '查询所有管理员' })
  @Get('/')
  async findAll(@Query() data: PageSizeDto) {
    return await this.adminerService.findAll(data);
  }
}
