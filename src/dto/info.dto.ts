/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-10-28 20:46:57
 * @Description:
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateInfoDto {
  @ApiProperty({ required: true, description: '标题' })
  @IsString()
  @Length(2, 50)
  title: string;

  @ApiProperty({ required: true, description: '内容-富文本' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ required: true, description: '排序' })
  @IsOptional()
  sortValue: number;
}

export class SearchiInfoDto {
  @ApiProperty({ required: false, description: '标题' })
  @IsString()
  @Length(2, 50)
  @IsOptional()
  title: string;

  @ApiProperty({ required: true, description: '页码' })
  @IsString()
  @IsNotEmpty()
  page: string;

  @ApiProperty({ required: true, description: '条数' })
  @IsString()
  @IsOptional()
  size: string;
}

export class UpdateInfoDto {
  @ApiProperty({ required: false, description: '标题' })
  @IsString()
  @Length(2, 50)
  @IsOptional()
  title?: string;

  @ApiProperty({ required: false, description: '广告图片' })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiProperty({ required: true, description: '排序' })
  @IsOptional()
  sortValue: number;
}
