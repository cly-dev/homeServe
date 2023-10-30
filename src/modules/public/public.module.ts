/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-10-27 21:44:52
 * @Description:
 */
import { Module } from '@nestjs/common';
import { PublicService } from './public.service';
import { PublicController } from './public.controller';
import { PosterModule } from '../poster/poster.module';
import { PosterController } from './controller/poster.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { InfoModule } from '../info/info.module';
import { InfoController } from './controller/info.controller';
import { ShopConfigModule } from '../shop-config/shop-config.module';
import { ShopConfigController } from './controller/shopComfig.controller';

@Module({
  imports: [
    PosterModule,
    ConfigModule,
    InfoModule,
    ShopConfigModule,
    MulterModule.register({
      storage: diskStorage({
        destination: join(__dirname, '../../static/'),
        filename: (_, file, callback) => {
          const fileName = `${Date.now()}${extname(file.originalname)}`;
          callback(null, fileName);
        },
      }),
    }),
  ],
  controllers: [
    PublicController,
    PosterController,
    InfoController,
    ShopConfigController,
  ],
  providers: [PublicService],
})
export class PublicModule {}
