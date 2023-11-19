/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-11-06 19:38:58
 * @Description:
 */
import { Module } from '@nestjs/common';
import { CollectService } from './collect.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Collect } from '../../entities/collect.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Collect])],
  providers: [CollectService],
  exports: [CollectService],
})
export class CollectModule {}
