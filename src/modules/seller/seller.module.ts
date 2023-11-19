/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-10-27 21:45:47
 * @Description:
 */
import { Module } from '@nestjs/common';
import { SellerService } from './seller.service';
import { SellerController } from './seller.controller';
import { AdminerModule } from '../adminer/adminer.module';
import { AdminerController } from './controller/adminer.controller';
import { AuthController } from './controller/auth.controller';
import { AuthModule } from '../auth/auth.module';
import { PosterModule } from '../poster/poster.module';
import { PosterController } from './controller/poster.controller';
import { SellerStategy } from '../auth/seller.strategy';
import { InfoModule } from '../info/info.module';
import { InfoController } from './controller/info.controller';
import { ShopConfigModule } from '../shop-config/shop-config.module';
import { ShopConfigController } from './controller/shopConfig.controller';
import { AccountModule } from '../account/account.module';
import { AccountController } from './controller/account.controller';
import { ServiceModule } from '../service/service.module';
import { ServiceController } from './controller/service.controller';
import { OrderModule } from '../order/order.module';
import { OrderController } from './controller/order.controller';

@Module({
  imports: [
    AdminerModule,
    AuthModule,
    PosterModule,
    InfoModule,
    ShopConfigModule,
    AccountModule,
    ServiceModule,
    OrderModule,
  ],
  controllers: [
    SellerController,
    AdminerController,
    AuthController,
    PosterController,
    InfoController,
    ShopConfigController,
    AccountController,
    ServiceController,
    OrderController,
  ],
  providers: [SellerService, SellerStategy],
})
export class SellerModule {}
