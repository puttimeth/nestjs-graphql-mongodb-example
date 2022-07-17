import { Field, InputType, Int } from '@nestjs/graphql';
import { Types } from 'mongoose';

@InputType()
export class GetPostDto {
  @Field((type) => String, { nullable: true })
  _id?: Types.ObjectId;

  @Field({ nullable: true })
  title?: string;

  @Field((type) => Int, { nullable: true })
  minLikes?: number;

  @Field((type) => Int, { nullable: true })
  maxLikes?: number;

  @Field((type) => String, { nullable: true })
  ownerId?: Types.ObjectId;
}
