/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-11-03 21:23:25
 * @Description:
 */
import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from '../../entities/service.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Service])],
  providers: [ServiceService],
  exports: [ServiceService],
})
export class ServiceModule {}
