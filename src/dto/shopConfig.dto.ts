/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-10-28 20:46:57
 * @Description:
 */
import { ShopConfigEnum } from '../enum/column.enum';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateShopConfigDto {
  @ApiProperty({ required: true, description: '标题' })
  @IsString()
  @Length(2, 50)
  title: string;

  @ApiProperty({ enum: ShopConfigEnum, required: true, description: '类型' })
  @IsEnum(ShopConfigEnum)
  @IsNotEmpty()
  type: ShopConfigEnum;

  @ApiProperty({ required: true, description: '内容-富文本' })
  @IsNotEmpty()
  content: string;
}

export class UpdateShopConfigDto {
  @ApiProperty({ required: false, description: '标题' })
  @IsString()
  @Length(2, 50)
  @IsOptional()
  title?: string;

  @ApiProperty({ required: false, description: '广告图片' })
  @IsString()
  @IsOptional()
  content?: string;
}
