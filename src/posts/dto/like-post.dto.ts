import { Field, InputType } from '@nestjs/graphql';
import { Types } from 'mongoose';

@InputType()
export class LikePostDto {
  @Field((type) => String, { nullable: true })
  _id?: Types.ObjectId;
}
