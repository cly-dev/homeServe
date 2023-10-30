/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-10-27 19:40:16
 * @Description:
 */
import { Global, Module } from '@nestjs/common';
import { AdminerService } from './adminer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Adminer } from '../../entities/adminer.entities';
import { AdminerController } from '../seller/controller/adminer.controller';
@Module({
  imports: [TypeOrmModule.forFeature([Adminer])],
  controllers: [AdminerController],
  providers: [AdminerService],
  exports: [AdminerService],
})
export class AdminerModule {}
