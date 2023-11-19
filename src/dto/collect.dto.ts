/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-10-28 20:46:57
 * @Description:
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateCollectDto {
  @ApiProperty({ required: true, description: '服务Id' })
  @IsNotEmpty()
  serviceId: string;
}
