import { PartialType } from '@nestjs/mapped-types';
/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-11-09 21:45:34
 * @Description:
 */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  isNumber,
} from 'class-validator';

export class CreateReviewsDto {
  @ApiProperty({ required: true, description: '评分' })
  @IsNotEmpty()
  @IsEnum([1, 2, 3, 4, 5])
  rate: 1 | 2 | 3 | 4 | 5;

  @ApiProperty({ required: false, description: '描述' })
  @IsOptional()
  content?: string;
}

export class UpdateAddrssDto {
  @ApiProperty({ required: true, description: '街道' })
  @IsOptional()
  @IsNotEmpty()
  street: string;

  @ApiProperty({ required: true, description: '手机号' })
  @IsOptional()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ required: true, description: '联系人姓名' })
  @IsOptional()
  @IsNotEmpty()
  userName: string;

  @ApiProperty({ required: true, description: '是否是默认地址' })
  @IsOptional()
  @IsBoolean()
  isDefault: boolean;
}
