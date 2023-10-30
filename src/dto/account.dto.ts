/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-10-27 19:40:16
 * @Description:
 */
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PageSizeDto } from './common.dto';
import { AccountStatusEnum } from '../enum/column.enum';

export class CreateAccountDto {
  @IsPhoneNumber()
  @IsNotEmpty()
  @Length(11, 11)
  @ApiProperty({ required: true, description: '用户账号' })
  accountId: string;

  @IsOptional()
  @IsString()
  @Length(2, 50)
  @ApiProperty({ required: false, description: '用户昵称' })
  nickName: string;
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
  static: AccountStatusEnum;
}
export class UpdateAccountPasswordDto {
  @IsString()
  password: string;

  @IsString()
  oldPassword: string;
}

export class AccountLoginDto {
  @ApiProperty({ required: true, description: '管理员账号' })
  @IsPhoneNumber()
  @IsNotEmpty()
  @Length(11, 11)
  accountId: string;

  @ApiProperty({ required: true, description: '密码' })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class SearchAccountDto extends PageSizeDto {
  @ApiProperty({ required: false, description: '用户id' })
  @IsOptional()
  accountId: string;

  @ApiProperty({ required: false, description: '用户昵称' })
  @IsOptional()
  @IsString()
  nickName: string;
}
