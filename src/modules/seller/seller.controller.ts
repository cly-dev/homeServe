/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-10-27 21:45:47
 * @Description:
 */
import { Controller, Get } from '@nestjs/common';
import { SellerService } from './seller.service';
import { AdminerService } from '../adminer/adminer.service';

@Controller('seller')
export class SellerController {
  constructor(private readonly adminService: AdminerService) {}

  @Get('/')
  init() {
    this.adminService.create({ nickName: '主管', adminId: '123456' });
  }
}
