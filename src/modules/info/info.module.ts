/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-10-29 15:24:26
 * @Description:资讯
 */
import { Module } from '@nestjs/common';
import { InfoService } from './info.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Info } from '../../entities/info.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Info])],
  providers: [InfoService],
  exports: [InfoService],
})
export class InfoModule {}
