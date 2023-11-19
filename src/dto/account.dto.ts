/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-10-27 19:40:16
 * @Description:
 */
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PageSizeDto } from './common.dto';
import { AccountStatusEnum } from '../enum/column.enum';

export class CreateAccountDto {
  @IsNotEmpty()
  @ApiProperty({ required: true, description: '用户授权的code' })
  code: string;

  @IsOptional()
  @IsString()
  @Length(2, 50)
  @ApiProperty({ required: false, description: '用户昵称' })
  nickName: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, description: '用户头像' })
  avatar: string;
}

export class UpdateAccountDto {
  @IsOptional()
  @IsString()
  @Length(2, 50)
  @ApiProperty({ required: false, description: '用户昵称' })
  nickName: string;

  @IsString()
  @ApiProperty({ required: false, description: '用户头像' })
  @IsOptional()
  avatar: string;

  @ApiProperty({
    enum: AccountStatusEnum,
    required: false,
    description: '用户状态',
  })
  @IsEnum(AccountStatusEnum)
  @IsOptional()
  status?: AccountStatusEnum;
}

export class UpdateAccountInfoDto {
  @IsOptional()
  @IsString()
  @Length(2, 50)
  @ApiProperty({ required: false, description: '用户昵称' })
  nickName: string;

  @IsString()
  @ApiProperty({ required: false, description: '用户头像' })
  @IsOptional()
  avatar: string;
}
export class UpdateAccountPasswordDto {
  @IsString()
  password: string;

  @IsString()
  oldPassword: string;
}

export class AccountLoginDto {
  @ApiProperty({ required: true, description: '管理员账号' })
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ required: true, description: '密码' })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UpdateAccountLoginInformationDto {
  @ApiProperty({ required: true, description: '用户密码' })
  @IsNotEmpty()
  @Length(8, 16)
  password: string;

  @ApiProperty({ required: true, description: '用户手机' })
  @IsNotEmpty()
  @Matches(/^(?:\+?1\s*)?\d{10}$/, { message: '手机号码有误' })
  phone: string;
}

export class SearchAccountDto extends PageSizeDto {
  @ApiProperty({ required: false, description: '用户联系方式' })
  @IsOptional()
  phone: string;

  @ApiProperty({ required: false, description: '用户昵称' })
  @IsOptional()
  @IsString()
  nickName: string;
}
