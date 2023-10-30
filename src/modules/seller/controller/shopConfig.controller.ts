/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-10-27 23:16:26
 * @Description:
 */
import { ShopConfigService } from '../../shop-config/shop-config.service';

import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateShopConfigDto,
  UpdateShopConfigDto,
} from '../../../dto/shopConfig.dto';
import { AuthGuard } from '@nestjs/passport';
@ApiTags('管理员-内容配置')
@Controller('/seller/shopConfig')
export class ShopConfigController {
  constructor(protected readonly ShopConfigService: ShopConfigService) {}
  @ApiOperation({ summary: '新增配置' })
  @ApiBearerAuth()
  @ApiHeader({ name: 'Authorization', required: true, description: 'token' })
  @UseGuards(AuthGuard('seller'))
  @Post('/')
  async create(@Body() CreateShopConfigDto: CreateShopConfigDto) {
    return await this.ShopConfigService.create(CreateShopConfigDto);
  }

  @ApiOperation({ summary: '修改配置' })
  @ApiBearerAuth()
  @ApiHeader({ name: 'Authorization', required: true, description: 'token' })
  @UseGuards(AuthGuard('seller'))
  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() UpdateShopConfigDto: UpdateShopConfigDto,
  ) {
    return await this.ShopConfigService.update(+id, UpdateShopConfigDto);
  }

  @ApiOperation({ summary: '删除配置' })
  @ApiBearerAuth()
  @ApiHeader({ name: 'Authorization', required: true, description: 'token' })
  @UseGuards(AuthGuard('seller'))
  @Delete('/:id')
  async remove(@Param('id') id: string) {
    return await this.ShopConfigService.remove(+id);
  }
}
