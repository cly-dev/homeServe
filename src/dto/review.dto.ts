/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-11-09 21:45:34
 * @Description:
 */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateReviewsDto {
  @ApiProperty({ required: true, description: '评分' })
  @IsNotEmpty()
  @IsEnum([1, 2, 3, 4, 5])
  rate: 1 | 2 | 3 | 4 | 5;

  @ApiProperty({ required: false, description: '描述' })
  @IsOptional()
  content?: string;

  @ApiProperty({ required: true, description: '订单id' })
  @IsString()
  orderId: string;

  @ApiProperty({ required: true, description: '服务Id' })
  @IsNumber()
  serviceId: number;
}
