/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-10-28 00:29:01
 * @Description:
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PageSizeDto {
  @ApiProperty({ required: true, description: '页码' })
  @IsString()
  @IsNotEmpty()
  page: number;

  @ApiProperty({ required: false, description: '条数' })
  @IsString()
  size: number;
}

export class UploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}
