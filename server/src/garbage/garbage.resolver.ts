import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { GarbageService } from './garbage.service';
import { GarbageType } from './dto/create-garbage.dto';
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

  @Query(() => [GarbageType])
  async garbage(): Promise<GarbageType[]> {
    return this.garbageService.findAll();
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
    return this.garbageService.update(id, input);
  }

  @Mutation(() => GarbageType)
  async deleteGarbage(@Args('id') id: string): Promise<GarbageInput> {
    return this.garbageService.delete(id);
  }
}
