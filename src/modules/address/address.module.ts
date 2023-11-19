/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-11-09 21:41:35
 * @Description:
 */
import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from '../../entities/address.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Address])],
  providers: [AddressService],
  exports: [AddressService],
})
export class AddressModule {}
