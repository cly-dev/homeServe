/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-10-27 21:45:47
 * @Description:
 */
import { Controller } from '@nestjs/common';
import { SellerService } from './seller.service';

@Controller('seller')
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}
}
