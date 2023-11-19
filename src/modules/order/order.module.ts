/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-11-10 21:52:12
 * @Description:
 */
import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../../entities/order.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
