import { Query } from '@nestjs/common';
/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-10-28 21:50:53
 * @Description:
 */
import { SearchiInfoDto } from '../../../dto/info.dto';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { InfoService } from '../../info/info.service';

@ApiTags('公共-资讯')
@Controller('/public/info')
export class InfoController {
  constructor(private readonly infoService: InfoService) {}

  @ApiOperation({ summary: '获取资讯列表' })
  @Get('/')
  async findAll(@Query() SearchInfoDto: SearchiInfoDto) {
    return await this.infoService.findAll(SearchInfoDto);
  }

  @ApiOperation({ summary: '获取资讯详情' })
  @ApiParam({ name: 'id', description: '资讯Id' })
  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return await this.infoService.findOne(+id);
  }
}
