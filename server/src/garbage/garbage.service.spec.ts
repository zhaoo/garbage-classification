import { Test, TestingModule } from '@nestjs/testing';
import { GarbageService } from './garbage.service';

describe('GarbageService', () => {
  let service: GarbageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GarbageService],
    }).compile();

    service = module.get<GarbageService>(GarbageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
