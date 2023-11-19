/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-11-19 23:39:26
 * @Description:
 */
import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from '../../entities/review.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Review])],
  providers: [ReviewService],
})
export class ReviewModule {}
