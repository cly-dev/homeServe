/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-10-27 23:16:26
 * @Description:
 */
import { AddressService } from './../../address/address.service';

import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import {
  CancelOrderDto,
  ComfirmOrderDto,
  CreateOrderDto,
  SearchOrderDto,
} from '../../../dto/order.dto';
import { OrderService } from '../../../modules/order/order.service';
import { generateOrderNumber } from '../../../untils/order';
import { ServiceService } from '../../../modules/service/service.service';
import { OrderStatusEnum, ServiceStatusEnum } from '../../../enum/column.enum';
@ApiTags('用户-订单')
@Controller('/buyer/order')
export class OrderController {
  constructor(
    protected readonly orderService: OrderService,
    protected readonly serviceService: ServiceService,
    protected readonly addressService: AddressService,
  ) {}
  @ApiOperation({ summary: '创建订单' }) //--待确认
  @ApiBearerAuth()
  @ApiHeader({ name: 'Authorization', required: true, description: 'token' })
  @UseGuards(AuthGuard('buyer'))
  @Post('/')
  async create(@Req() req, @Body() createOrderDto: CreateOrderDto) {
    const { user } = req;
    //订单Id --生成订单编号
    const orderId = generateOrderNumber(user.accountId);
    //服务Id
    const { serviceId } = createOrderDto;
    const serviceInfo = await this.serviceService.findOne(+serviceId);
    console.log(serviceInfo);
    if (!serviceInfo || serviceInfo.status != ServiceStatusEnum.ON) {
      throw new InternalServerErrorException('服务不存在或已下架');
    }

    const data = {
      orderId,
      serviceCache: JSON.stringify(serviceInfo) || '',
      account: {
        accountId: user.accountId,
      },
    };
    await this.orderService.create(data);
    return orderId;
  }

  @ApiOperation({ summary: '确认订单' }) //-待支付
  @ApiBearerAuth()
  @ApiHeader({ name: 'Authorization', required: true, description: 'token' })
  @UseGuards(AuthGuard('buyer'))
  @Post('/comfirm/:orderId')
  async comfirm(
    @Param('orderId') orderId: string,
    @Body() comfirmOrderDto: ComfirmOrderDto,
  ) {
    const { addressId } = comfirmOrderDto;
    const addressInfo = await this.addressService.findOne(+addressId);
    if (!addressInfo) {
      throw new InternalServerErrorException('该地址不存在');
    }
    delete comfirmOrderDto.addressId;
    await this.orderService.update(orderId, {
      addressCache: JSON.stringify(addressInfo),
      orderStatus: OrderStatusEnum.WAIT_PAY,
      totalPrice: comfirmOrderDto.totalPrice,
      remark: comfirmOrderDto.remark,
      serviceStartTime: comfirmOrderDto.serviceStartTime,
    });
  }

  @ApiOperation({ summary: '支付' }) //-待服务
  @ApiBearerAuth()
  @ApiHeader({ name: 'Authorization', required: true, description: 'token' })
  @UseGuards(AuthGuard('buyer'))
  @Post('/pay/:orderId')
  async pay(@Param('orderId') orderId: string) {
    await this.orderService.update(orderId, {
      orderStatus: OrderStatusEnum.WAIT_SERVICE,
      payTime: Date.now(),
    });
  }

  @ApiOperation({ summary: '取消订单' }) //-取消服务
  @ApiBearerAuth()
  @ApiHeader({ name: 'Authorization', required: true, description: 'token' })
  @UseGuards(AuthGuard('buyer'))
  @Put('/cancel/:orderId')
  async cancel(
    @Param('orderId') orderId: string,
    @Body() CancelOrderDto: CancelOrderDto,
  ) {
    await this.orderService.update(orderId, {
      orderStatus: OrderStatusEnum.CANCEL,
      ...CancelOrderDto,
    });
  }

  @ApiOperation({ summary: '完成订单' }) //-完成
  @ApiBearerAuth()
  @ApiHeader({ name: 'Authorization', required: true, description: 'token' })
  @UseGuards(AuthGuard('buyer'))
  @Put('/finish/:orderId')
  async finish(@Param('orderId') orderId: string) {
    await this.orderService.update(orderId, {
      orderStatus: OrderStatusEnum.FINISH,
    });
  }

  @ApiOperation({ summary: '查询订单信息' })
  @ApiBearerAuth()
  @ApiHeader({ name: 'Authorization', required: true, description: 'token' })
  @UseGuards(AuthGuard('buyer'))
  @Get('/:orderId')
  async findOne(@Param('orderId') orderId) {
    const data = await this.orderService.findOne(orderId);
    if (data) {
      console.log(data);
      const isReviewed = data.review ? true : false;
      delete data.review;
      return { ...data, isReviewed };
    } else {
      throw new NotFoundException('未找到改订单');
    }
  }

  @ApiOperation({ summary: '查询所有订单信息' })
  @ApiBearerAuth()
  @ApiHeader({ name: 'Authorization', required: true, description: 'token' })
  @UseGuards(AuthGuard('buyer'))
  @Get('/')
  async findAll(@Req() req, @Query() searchOrderDto: SearchOrderDto) {
    try {
      const { accountId } = req.user;
      console.log(searchOrderDto);
      return await this.orderService.findAll({ ...searchOrderDto, accountId });
    } catch (err) {
      console.log(err);
    }
  }
}
