import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { GarbageService } from './garbage.service';
import { GarbageType } from './dto/garbage.dto';
import { GarbagePaginationType } from './dto/garbage-pagination.dto';
import { GarbageInput } from './input-garbage.input';

@Resolver()
export class GarbageResolver {
  constructor(private readonly garbageService: GarbageService) { }

  @Query(() => [GarbageType])
  async garbageByCategoryId(@Args('categoryId') categoryId: string): Promise<GarbageType[]> {
    return this.garbageService.findByCategoryId(categoryId);
  }

  @Query(() => [GarbageType])
  async searchGarbage(@Args('keyword') keyword: string): Promise<GarbageType[]> {
    return this.garbageService.findBySearch(keyword);
  }

  @Query(() => GarbagePaginationType)
  async garbage(
    @Args('current') current?: number,
    @Args('limit') limit?: number,
    @Args({ name: 'keyword', type: () => String, nullable: true }) keyword?: string,
    @Args({ name: 'categoryId', type: () => String, nullable: true }) categoryId?: string,
  ): Promise<GarbagePaginationType> {
    return this.garbageService.findByCondition(current, limit, keyword, categoryId);
  }

  @Mutation(() => GarbageType)
  async createGarbage(@Args('input') input: GarbageInput): Promise<GarbageInput> {
    return this.garbageService.create(input);
  }

  @Mutation(() => GarbageType)
  async updateGarbage(
    @Args('id') id: string,
    @Args('input') input: GarbageInput,
  ): Promise<GarbageInput> {
    input.updateTime = new Date();
    return this.garbageService.update(id, input);
  }

  @Mutation(() => GarbageType)
  async deleteGarbage(@Args('id') id: string): Promise<GarbageInput> {
    return this.garbageService.delete(id);
  }
}
