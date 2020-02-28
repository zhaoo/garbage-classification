import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class DashboardType {
  @Field()
  readonly garbageCount: number;
}
