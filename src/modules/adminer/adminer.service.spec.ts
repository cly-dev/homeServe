import { Test, TestingModule } from '@nestjs/testing';
import { AdminerService } from './adminer.service';

describe('AdminerService', () => {
  let service: AdminerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminerService],
    }).compile();

    service = module.get<AdminerService>(AdminerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
