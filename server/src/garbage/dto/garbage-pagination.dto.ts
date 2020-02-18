import { ObjectType, Field } from 'type-graphql';
import { GarbageType } from './garbage.dto';

@ObjectType()
export class GarbagePaginationType {
  @Field(() => [GarbageType])
  list: GarbageType[];
  @Field()
  total: number;
}
