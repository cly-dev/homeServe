/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-10-29 20:35:58
 * @Description:内容配置
 */
import { Module } from '@nestjs/common';
import { ShopConfigService } from './shop-config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopConfig } from '../../entities/shopConfig.entities';

@Module({
  imports: [TypeOrmModule.forFeature([ShopConfig])],
  providers: [ShopConfigService],
  exports: [ShopConfigService],
})
export class ShopConfigModule {}
