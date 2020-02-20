import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { CategoryType } from './dto/category.dto';
import { CategoryInput } from './input-category.input';

@Resolver()
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) { }

  @Query(() => [CategoryType])
  async category(): Promise<CategoryType[]> {
    return this.categoryService.findAll();
  }

  @Query(() => CategoryType)
  async categoryById(@Args('id') id: string): Promise<CategoryType> {
    return this.categoryService.findOne(id);
  }

  @Mutation(() => CategoryType)
  async createCategory(@Args('input') input: CategoryInput): Promise<CategoryInput> {
    return this.categoryService.create(input);
  }

  @Mutation(() => CategoryType)
  async updateCategory(
    @Args('id') id: string,
    @Args('input') input: CategoryInput,
  ): Promise<CategoryInput> {
    return this.categoryService.update(id, input);
  }

  @Mutation(() => CategoryType)
  async deleteCategory(@Args('id') id: string): Promise<CategoryInput> {
    return this.categoryService.delete(id);
  }
}
