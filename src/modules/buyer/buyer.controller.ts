/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-11-01 12:22:14
 * @Description:
 */

import { Controller } from '@nestjs/common';
import { BuyerService } from './buyer.service';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('用户端')
@Controller('buyer')
export class BuyerController {
  constructor(private readonly buyerService: BuyerService) {}
}
