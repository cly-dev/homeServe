/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-10-28 20:40:08
 * @Description: 
 */
import { Test, TestingModule } from '@nestjs/testing';
import { PosterService } from './poster.service';

describe('PosterController', () => {
  let controller: PosterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PosterController],
      providers: [PosterService],
    }).compile();

    controller = module.get<PosterController>(PosterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
