/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-11-19 00:03:36
 * @Description:
 */
import { OrderStatusEnum } from '../../../enum/column.enum';
import { SearchOrderDto, CancelOrderDto } from '../../../dto/order.dto';
import { OrderService } from '../../../modules/order/order.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('管理员订单管理')
@Controller('/seller/order')
export class OrderController {
  constructor(private readonly OrderService: OrderService) {}

  @UseGuards(AuthGuard('seller'))
  @ApiOperation({ summary: '查询所有订单' })
  @ApiBearerAuth()
  @ApiHeader({ name: 'Authorization', required: true, description: 'token' })
  @Get('/')
  async findAll(@Query() SearchOrderDto: SearchOrderDto) {
    return await this.OrderService.findAll(SearchOrderDto);
  }

  @ApiOperation({ summary: '取消订单' })
  @ApiBearerAuth()
  @ApiHeader({ name: 'Authorization', required: true, description: 'token' })
  @UseGuards(AuthGuard('seller'))
  @Put('/cancel/:orderId')
  async cancel(
    @Param('orderId') orderId: string,
    @Body() CancelOrderDto: CancelOrderDto,
  ) {
    try {
      await this.OrderService.update(orderId, {
        orderStatus: OrderStatusEnum.ADMIN_CANCEL,
        ...CancelOrderDto,
      });
    } catch (err) {
      console.log(err);
    }
  }

  @UseGuards(AuthGuard('seller'))
  @ApiOperation({ summary: '修改订单状态' })
  @ApiBearerAuth()
  @ApiHeader({ name: 'Authorization', required: true, description: 'token' })
  @Put('/:orderId')
  async update(
    @Param('orderId') orderId: string,
    @Body() updateAccountDto: SearchOrderDto['orderStatus'],
  ) {
    return await this.OrderService.update(orderId, updateAccountDto);
  }
}
