import { Query } from '@nestjs/common';
/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-10-28 21:50:53
 * @Description:
 */
import { SearchPosterDto } from '../../../dto/poster.dto';
import { PosterService } from '../../poster/poster.service';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('公共-广告')
@Controller('/public/poster')
export class PosterController {
  constructor(private readonly posterService: PosterService) {}

  @ApiOperation({ summary: '获取广告列表' })
  @Get('/')
  async findAll(@Query() SearchPosterDto: SearchPosterDto) {
    return await this.posterService.findAll(SearchPosterDto);
  }

  @ApiOperation({ summary: '获取广告详情' })
  @ApiParam({ name: 'pId', description: '广告Id' })
  @Get('/:pId')
  async findOne(@Param('pId') pId: string) {
    return await this.posterService.findOne(+pId);
  }
}
