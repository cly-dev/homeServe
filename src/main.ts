/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-10-27 18:09:19
 * @Description:
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResInterceptor } from './interceptor/res.interceptor';
import { HttpExceptionFilter } from './exception/http.exception';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const swaggerOptions = new DocumentBuilder()
    .setTitle('家政服务系统')
    .setDescription('家政服务')
    .setVersion('1')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('/api-doc', app, document);
  app.useGlobalInterceptors(new ResInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useStaticAssets(join(__dirname, './static'), {
    prefix: '/static',
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.listen(3000); //localhost: 3000/  127.0.0.1:3000
}
bootstrap();
