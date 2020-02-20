import { ObjectType, Field, ID  } from 'type-graphql';
import { IsString, IsNotEmpty, IsArray } from 'class-validator';

@ObjectType()
export class CategoryType {
  @Field(() => ID)
  @IsString()
  readonly id?: string;
  @Field()
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @Field({ nullable: true })
  @IsString()
  readonly image?: string;
  @Field({ nullable: true })
  @IsString()
  readonly description?: string;
  @Field({ nullable: true })
  @IsString()
  readonly type?: string;
  @Field(() => [String, { nullable: true }], { nullable: true })
  @IsArray()
  readonly tips?: string[];
}
