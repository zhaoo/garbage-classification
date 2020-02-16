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
  @Field()
  @IsString()
  readonly image: string;
  @Field()
  @IsString()
  readonly description: string;
  @Field()
  @IsString()
  readonly type: string;
  @Field(() => [String])
  @IsArray()
  readonly tips: string[];
}
