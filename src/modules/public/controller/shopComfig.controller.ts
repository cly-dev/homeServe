/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-10-28 21:50:53
 * @Description:
 */
import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Query } from '@nestjs/common';
import { ShopConfigEnum } from '../../../enum/column.enum';
import { ShopConfigService } from '../../shop-config/shop-config.service';

@ApiTags('公共-配置')
@Controller('/public/shopConfig')
export class ShopConfigController {
  constructor(private readonly shopConfigService: ShopConfigService) {}

  @ApiOperation({ summary: '获取配置' })
  @ApiQuery({ enum: ShopConfigEnum, name: 'type', description: '类型' })
  @Get('/')
  async findAll(@Query('type') type: ShopConfigEnum) {
    return await this.shopConfigService.findByType(type);
  }

  @ApiOperation({ summary: '获取配置详情' })
  @ApiParam({ name: 'id', description: '配置Id' })
  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return await this.shopConfigService.findOne(+id);
  }
}
