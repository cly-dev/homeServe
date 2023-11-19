/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-11-03 21:53:16
 * @Description:
 */
import { CreateServiceDto, UpdateServiceDto } from '../../../dto/service.dto';
import { ServiceService } from '../../../modules/service/service.service';
import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('管理员-家政服务')
@Controller('/seller/service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @UseGuards(AuthGuard('seller'))
  @ApiOperation({ summary: '创建新的家政服务' })
  @ApiBearerAuth()
  @ApiHeader({ name: 'Authorization', required: true, description: 'token' })
  @Post('/')
  create(@Body() createServiceDto: CreateServiceDto) {
    this.serviceService.create(createServiceDto);
  }

  @UseGuards(AuthGuard('seller'))
  @ApiOperation({ summary: '更新家政服务' })
  @ApiBearerAuth()
  @ApiHeader({ name: 'Authorization', required: true, description: 'token' })
  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() updateServiceDto: UpdateServiceDto,
  ) {
    await this.serviceService.update(+id, updateServiceDto);
  }

  @UseGuards(AuthGuard('seller'))
  @ApiOperation({ summary: '删除家政服务' })
  @ApiBearerAuth()
  @ApiHeader({ name: 'Authorization', required: true, description: 'token' })
  @Delete('/:id')
  async remove(@Param('id') id: string) {
    await this.serviceService.remove(+id);
  }
}
