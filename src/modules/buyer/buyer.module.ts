/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-11-01 12:22:14
 * @Description:
 */
import { Module } from '@nestjs/common';
import { BuyerService } from './buyer.service';
import { BuyerController } from './buyer.controller';
import { AccountModule } from '../account/account.module';
import { AuthModule } from '../auth/auth.module';
import { AccountController } from './controllers/account.controller';
import { CollectModule } from '../collect/collect.module';
import { CollectController } from './controllers/collect.controller';
import { AddressModule } from '../address/address.module';
import { AddressController } from './controllers/address.controller';
import { OrderModule } from '../order/order.module';
import { OrderController } from './controllers/order.controller';
import { ServiceModule } from '../service/service.module';
import { PosterModule } from '../poster/poster.module';
import { ReviewModule } from '../review/review.module';
import { ReviewController } from './controllers/review.controller';

@Module({
  imports: [
    AccountModule,
    AuthModule,
    CollectModule,
    AddressModule,
    OrderModule,
    ServiceModule,
    PosterModule,
    ReviewModule,
  ],
  controllers: [
    BuyerController,
    AccountController,
    CollectController,
    AddressController,
    OrderController,
    ReviewController,
  ],
  providers: [BuyerService],
})
export class BuyerModule {}
