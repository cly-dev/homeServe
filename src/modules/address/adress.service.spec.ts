/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-11-09 21:41:35
 * @Description:
 */
import { Test, TestingModule } from '@nestjs/testing';
import { AddressService } from './address.service';

describe('AdressService', () => {
  let service: AddressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddressService],
    }).compile();

    service = module.get<AddressService>(AddressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
