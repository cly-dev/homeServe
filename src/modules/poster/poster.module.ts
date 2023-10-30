/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-10-28 20:40:08
 * @Description:
 */
import { Module } from '@nestjs/common';
import { PosterService } from './poster.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Poster } from '../../entities/poster.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Poster])],
  providers: [PosterService],
  exports: [PosterService],
})
export class PosterModule {}
