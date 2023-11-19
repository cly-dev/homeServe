/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-11-03 22:02:46
 * @Description:
 */
import { SearchServiceDto } from '../../../dto/service.dto';
import { ServiceService } from '../../../modules/service/service.service';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('公共-家政服务')
@Controller('/public/service')
export class ServiceController {
  constructor(protected readonly serviceService: ServiceService) {}
  @ApiOperation({ summary: '获取家政服务列表' })
  @Get('/')
  async findAll(@Query() searchServiceDto: SearchServiceDto) {
    return await this.serviceService.findAll(searchServiceDto);
  }

  @ApiOperation({ summary: '获取家政服务详情' })
  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return await this.serviceService.findOne(+id);
  }
}
