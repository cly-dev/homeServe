/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-10-27 18:09:19
 * @Description:
 */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MySqlEnum } from './enum/config.enum';
import { Adminer } from './entities/adminer.entities';
import { PublicModule } from './modules/public/public.module';
import { SellerModule } from './modules/seller/seller.module';
import { Poster } from './entities/poster.entities';
import { Info } from './entities/info.entities';
import { ShopConfig } from './entities/shopConfig.entities';
import { Account } from './entities/account.entities';
import { Comment } from './entities/comment.entities';
import { BuyerModule } from './modules/buyer/buyer.module';
import { Service } from './entities/service.entities';
import { Collect } from './entities/collect.entities';
import { Address } from './entities/address.entities';
import { Order } from './entities/order.entities';
import { Review } from './entities/review.entities';
const envFilePath = !process.env.NODE_ENV
  ? `.env`
  : `.env.${process.env.NODE_ENV}`;
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('HOST'),
        port: configService.get(MySqlEnum.PART),
        database: configService.get(MySqlEnum.DBBASE),
        username: configService.get(MySqlEnum.DBNAME),
        password: configService.get(MySqlEnum.PASSWORD),
        entities: [
          Adminer,
          Poster,
          Info,
          ShopConfig,
          Account,
          Service,
          Collect,
          Address,
          Order,
          Comment,
          Review,
        ],
        synchronize: true,
        logging: ['error'],
      }),
    }),
    PublicModule,
    SellerModule,
    BuyerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
