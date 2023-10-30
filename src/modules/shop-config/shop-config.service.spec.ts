import { Test, TestingModule } from '@nestjs/testing';
import { ShopConfigService } from './shop-config.service';

describe('ShopConfigService', () => {
  let service: ShopConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShopConfigService],
    }).compile();

    service = module.get<ShopConfigService>(ShopConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
