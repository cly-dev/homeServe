/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-11-19 23:39:26
 * @Description:
 */
import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from '../../entities/review.entities';
import { OrderModule } from '../order/order.module';

@Module({
  imports: [TypeOrmModule.forFeature([Review]), OrderModule],
  providers: [ReviewService],
  exports: [ReviewService],
})
export class ReviewModule {}
