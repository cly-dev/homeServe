/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-11-06 20:02:31
 * @Description:
 */
import { CreateAddressDto, UpdateAddrssDto } from '../../../dto/address.dto';
import { AddressService } from '../../address/address.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
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

@ApiTags('用户-地址')
@Controller('/buyer/address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  // 新增收藏
  @ApiOperation({ summary: '新增地址' })
  @ApiBearerAuth()
  @ApiHeader({ name: 'Authorization', required: true, description: 'token' })
  @UseGuards(AuthGuard('buyer'))
  @Post('/')
  async create(@Req() req, @Body() createAddressDto: CreateAddressDto) {
    const { accountId } = req.user;
    console.log(accountId);
    await this.addressService.create(accountId, createAddressDto);
  }

  //删除
  @ApiOperation({ summary: '删除地址' })
  @ApiBearerAuth()
  @ApiHeader({ name: 'Authorization', required: true, description: 'token' })
  @UseGuards(AuthGuard('buyer'))
  @Delete('/:id')
  async delete(@Param('id') id: string) {
    await this.addressService.remove(+id);
  }

  //查询用户的所有地址
  @ApiOperation({ summary: '查询用户的所有地址' })
  @ApiBearerAuth()
  @ApiHeader({ name: 'Authorization', required: true, description: 'token' })
  @UseGuards(AuthGuard('buyer'))
  @Get('/')
  async findAll(@Req() req) {
    const { accountId } = req.user;
    return await this.addressService.findAll(accountId);
  }

  //查询用户地址详情
  @ApiOperation({ summary: '查询用户地址详情' })
  @ApiBearerAuth()
  @ApiHeader({ name: 'Authorization', required: true, description: 'token' })
  @UseGuards(AuthGuard('buyer'))
  @Get('/:id')
  async findOne(@Req() req, @Param('id') id: string) {
    return await this.addressService.findOne(+id);
  }
  // 编辑地址
  @ApiOperation({ summary: '编辑地址' })
  @ApiBearerAuth()
  @ApiHeader({ name: 'Authorization', required: true, description: 'token' })
  @UseGuards(AuthGuard('buyer'))
  @Put('/:id')
  async check(
    @Param('id') id: string,
    @Body() updateAddrssDto: UpdateAddrssDto,
  ) {
    console.log(updateAddrssDto);
    await this.addressService.update(+id, updateAddrssDto);
  }
}
