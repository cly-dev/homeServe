/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-10-27 18:09:19
 * @Description:
 */
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
