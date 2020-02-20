import { ObjectType, Field, ID } from 'type-graphql';
import { IsString, IsNotEmpty } from 'class-validator';

@ObjectType()
export class GarbageType {
  @Field(() => ID)
  @IsString()
  readonly id?: string;
  @Field()
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @Field({ nullable: true })
  @IsString()
  readonly image: string;
  @Field({ nullable: true })
  @IsString()
  readonly description: string;
  @Field()
  @IsString()
  readonly categoryId: string;
  @Field({ nullable: true })
  readonly updateTime?: Date;
}
