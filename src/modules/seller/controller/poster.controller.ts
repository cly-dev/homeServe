/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-10-28 21:28:00
 * @Description:
 */
import { UpdatePosterDto } from '../../../dto/poster.dto';
import { PosterService } from '../../poster/poster.service';
import { CreatePosterDto } from '../../../dto/poster.dto';
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

@ApiTags('管理员-广告管理')
@Controller('/seller/poster')
export class PosterController {
  constructor(private readonly posterService: PosterService) {}
  @UseGuards(AuthGuard('seller'))
  @ApiBearerAuth()
  @ApiHeader({ name: 'Authorization', required: true, description: 'token' })
  @ApiOperation({ summary: '新增广告' })
  @Post('/')
  async create(@Body() CreatePosterDto: CreatePosterDto) {
    await this.posterService.create(CreatePosterDto);
  }

  @UseGuards(AuthGuard('seller'))
  @ApiBearerAuth()
  @ApiHeader({ name: 'Authorization', required: true, description: 'token' })
  @ApiOperation({ summary: '修改广告' })
  @ApiParam({ name: 'pId', description: '广告Id' })
  @Put('/:pId')
  async update(
    @Param('pId') pId: string,
    @Body() UpdatePosterDto: UpdatePosterDto,
  ) {
    await this.posterService.update(+pId, UpdatePosterDto);
  }

  @UseGuards(AuthGuard('seller'))
  @ApiBearerAuth()
  @ApiHeader({ name: 'Authorization', required: true, description: 'token' })
  @ApiParam({ name: 'pId', description: '广告Id' })
  @ApiOperation({ summary: '删除广告' })
  @Delete('/:pId')
  async delete(@Param('pId') pId) {
    return await this.posterService.remove(+pId);
  }
}
