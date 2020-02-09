import { InputType, Field } from 'type-graphql';

@InputType()
export class GarbageInput {
  @Field()
  readonly name: string;
  @Field({ nullable: true })
  readonly image: string;
  @Field({ nullable: true })
  readonly description: string;
  @Field()
  readonly categoryId: string;
}
