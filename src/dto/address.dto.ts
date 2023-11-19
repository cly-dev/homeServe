import { PartialType } from '@nestjs/mapped-types';
/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-11-09 21:45:34
 * @Description:
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAddressDto {
  @ApiProperty({ required: true, description: '地区' })
  @IsNotEmpty()
  city: string;

  @ApiProperty({ required: true, description: '街道' })
  @IsNotEmpty()
  street: string;

  @ApiProperty({ required: true, description: '手机号' })
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ required: true, description: '联系人姓名' })
  @IsNotEmpty()
  userName: string;

  @ApiProperty({ required: true, description: '是否是默认地址' })
  @IsBoolean()
  isDefault: boolean;
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
