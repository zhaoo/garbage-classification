import { Test, TestingModule } from '@nestjs/testing';
import { GarbageResolver } from './garbage.resolver';

describe('GarbageResolver', () => {
  let resolver: GarbageResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GarbageResolver],
    }).compile();

    resolver = module.get<GarbageResolver>(GarbageResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
