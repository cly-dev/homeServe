/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-11-03 21:30:30
 * @Description:
 */
import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { PageSizeDto } from './common.dto';
import { ServiceStatusEnum, PriceTypeEnum } from '../enum/column.enum';

/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-11-03 21:30:30
 * @Description:
 */
export class CreateServiceDto {
  @ApiProperty({ required: true, description: '服务名称' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ required: true, description: '简易描述' })
  @IsString()
  @IsNotEmpty()
  @Length(1, 50, { message: '简易描述长度不能超过50' })
  desc: string;

  @ApiProperty({ required: true, description: '服务价格' })
  @IsNotEmpty()
  discountPrice: number;

  @ApiProperty({ required: false, description: '服务原价' })
  @IsOptional()
  originPrice: number;

  @ApiProperty({ required: true, description: '服务图标' })
  @IsString()
  @IsNotEmpty()
  iconUrl: string;

  @ApiProperty({ required: false, description: 'icon背景颜色' })
  @IsString()
  @IsOptional()
  iconBgColor: string;

  @ApiProperty({ required: false, description: '服务视频' })
  @IsString()
  @IsOptional()
  videoUrl: string;

  @ApiProperty({ required: true, description: '服务图片' })
  @IsString()
  @IsNotEmpty()
  imagesUrl: string;

  @ApiProperty({ enum: PriceTypeEnum, required: true, description: '收费类型' })
  @IsEnum(PriceTypeEnum)
  priceType: PriceTypeEnum;

  @ApiProperty({ required: true, description: '最小服务天数' })
  @IsNotEmpty()
  minServiceTime: number;

  @ApiProperty({ required: false, description: '服务图文描述' })
  @IsOptional()
  @IsString()
  content: string;
}
export class UpdateServiceDto extends PartialType(CreateServiceDto) {
  @ApiProperty({
    enum: ServiceStatusEnum,
    required: false,
    description: '服务状态',
  })
  @IsOptional()
  @IsEnum(ServiceStatusEnum)
  status: ServiceStatusEnum;
}

export class SearchServiceDto extends PageSizeDto {
  @ApiProperty({ required: false, description: '服务标题' })
  @IsOptional()
  title: string;

  @ApiProperty({ required: false, description: '服务标题' })
  @IsOptional()
  @IsEnum(ServiceStatusEnum)
  status: ServiceStatusEnum;
}
