/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-10-28 20:46:57
 * @Description:
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreatePosterDto {
  @ApiProperty({ required: true, description: '广告标题' })
  @IsString()
  @Length(2, 50)
  title: string;

  @ApiProperty({ required: true, description: '广告图片' })
  @IsString()
  imageUrl: string;

  @ApiProperty({ required: false, description: '链接' })
  @IsOptional()
  @IsString()
  link: string;
}

export class SearchPosterDto {
  @ApiProperty({ required: false, description: '广告标题' })
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

export class UpdatePosterDto {
  @ApiProperty({ required: false, description: '广告标题' })
  @IsString()
  @Length(2, 50)
  @IsOptional()
  title?: string;

  @ApiProperty({ required: false, description: '广告图片' })
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({ required: false, description: '链接' })
  @IsOptional()
  @IsString()
  link?: string;
}
