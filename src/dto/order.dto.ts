import { OrderStatusEnum } from './../enum/column.enum';
/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-11-10 22:20:33
 * @Description:
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { CreateServiceDto } from './service.dto';
import { PageSizeDto } from './common.dto';

export class CreateOrderDto {
  @ApiProperty({ required: true, description: '服务Id' })
  @IsNotEmpty()
  serviceId: number;
}

export class ComfirmOrderDto {
  //地址
  @ApiProperty({ required: true, description: '地址Id' })
  @IsNotEmpty()
  addressId: number;

  @ApiProperty({ required: false, description: '其他要求' })
  @IsOptional()
  remark?: string;

  @ApiProperty({ required: true, description: '数量' })
  @IsNotEmpty()
  count: number;

  @ApiProperty({ required: true, description: '总价' })
  @IsNotEmpty()
  totalPrice: number;

  @ApiProperty({ required: true, description: '服务开始时间' })
  @IsNotEmpty()
  serviceStartTime: string;
}

export class CancelOrderDto {
  //取消留言
  @ApiProperty({ required: false, description: '留言' })
  @IsNotEmpty()
  returnReason: string;
}

export class SearchOrderDto extends PageSizeDto {
  @ApiProperty({
    enum: OrderStatusEnum,
    required: false,
    description: '订单状态',
  })
  @IsOptional()
  @IsEnum(OrderStatusEnum)
  orderStatus?: OrderStatusEnum;

  @ApiProperty({
    required: false,
    description: '订单id',
  })
  @IsOptional()
  orderId?: string;
}
