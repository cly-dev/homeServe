/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-10-27 23:24:46
 * @Description:
 */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { KEYMAP } from '../../enum/config.enum';
import { SellerStategy } from './seller.strategy';
import { BuyerStategy } from './buyer.strategy';
import { AdminerModule } from '../adminer/adminer.module';
import { AccountModule } from '../account/account.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get(KEYMAP.SECRETKEY),
        signOptions: {
          // 一周过期时间
          expiresIn: '1w',
        },
      }),
    }),
    AdminerModule,
    AccountModule,
  ],
  providers: [AuthService, SellerStategy, BuyerStategy],
  exports: [AuthService],
})
export class AuthModule {}
