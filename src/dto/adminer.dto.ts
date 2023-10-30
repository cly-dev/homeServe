/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-10-27 19:40:16
 * @Description:
 */
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiParam, ApiProperty } from '@nestjs/swagger';

export class CreateAdminerDto {
  @IsString()
  @IsNotEmpty()
  @Length(6, 13)
  @ApiProperty({ required: true, description: '用户账号' })
  adminId: string;

  @IsOptional()
  @IsString()
  @Length(2, 20)
  @ApiProperty({ required: false, description: '用户昵称' })
  nickName: string;
}

export class UpdateAdminerDto extends PartialType(CreateAdminerDto) {
  @IsString()
  @IsOptional()
  avatar: string;
}
export class UpdateAdminerPasswordDto {
  @IsString()
  password: string;

  @IsString()
  oldPassword: string;
}

export class LoginDto {
  @ApiProperty({ required: true, description: '管理员账号' })
  @IsString()
  @IsNotEmpty()
  adminId: string;

  @ApiProperty({ required: true, description: '密码' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
