/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-10-28 21:28:00
 * @Description:
 */
import { CreateInfoDto, UpdateInfoDto } from '../../../dto/info.dto';
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
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { InfoService } from '../../info/info.service';

@ApiTags('管理员-资讯管理')
@Controller('/seller/info')
export class InfoController {
  constructor(private readonly infoService: InfoService) {}
  @UseGuards(AuthGuard('seller'))
  @ApiBearerAuth()
  @ApiHeader({ name: 'Authorization', required: true, description: 'token' })
  @ApiOperation({ summary: '新增资讯' })
  @Post('/')
  async create(@Body() CreateInfoDto: CreateInfoDto) {
    await this.infoService.create(CreateInfoDto);
  }

  @UseGuards(AuthGuard('seller'))
  @ApiBearerAuth()
  @ApiHeader({ name: 'Authorization', required: true, description: 'token' })
  @ApiOperation({ summary: '修改资讯' })
  @ApiParam({ name: 'id', description: 'id' })
  @Put('/:id')
  async update(@Param('id') id: string, @Body() UpdateInfoDto: UpdateInfoDto) {
    await this.infoService.update(+id, UpdateInfoDto);
  }

  @UseGuards(AuthGuard('seller'))
  @ApiBearerAuth()
  @ApiHeader({ name: 'Authorization', required: true, description: 'token' })
  @ApiParam({ name: 'pId', description: '广告Id' })
  @ApiOperation({ summary: '删除资讯' })
  @Delete('/:pId')
  async delete(@Param('pId') pId) {
    return await this.infoService.remove(+pId);
  }
}
